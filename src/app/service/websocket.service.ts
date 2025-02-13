import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from '../interfaces/chat';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private wsUrl = environment.WS_HOST;
  private accessToken = localStorage.getItem('tokenAccess');
  private socket$: WebSocketSubject<any> | null = null;
  private messageSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messageSubject.asObservable();
  
  // Store old messages
  private oldMessages: Message[] = [];

  connect(conversationId: string) {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(`${this.wsUrl}/ws/${conversationId}/?token=${this.accessToken}`);

      this.socket$.subscribe({
        next: (message) => {
          console.log("Message received:", message);
          this.oldMessages.push(message); // Store the received message
          this.messageSubject.next([...this.messageSubject.value, message]);          
        },
        error: (err) => console.error("WebSocket error:", err),
        complete: () => console.log("WebSocket closed")
      });
    }
  }

  sendMessage(message: Message) {
    if (this.socket$) {
      this.socket$.next({ event: 'chat_message', data: message });
      return this.oldMessages; // Return the old messages
    }
    return [];
  }

  close() {
    this.socket$?.complete();
  }
}