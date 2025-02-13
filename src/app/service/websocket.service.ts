import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from '../interfaces/chat';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  private socket$: WebSocketSubject<any> | null = null;
  private messageSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messageSubject.asObservable();

  connect(conversationId: string, token: string) {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(`${process.env['NEXT_PUBLIC_WS_HOST']}/ws/${conversationId}/?token=${token}`);

      this.socket$.subscribe({
        next: (message) => {
          console.log("Message received:", message);
          this.messageSubject.next([...this.messageSubject.value, message]);          
        },
        error: (err) => console.error("WebSocket error:", err),
        complete: () => console.log("WebSocket closed")
      });
    }
  }

  sendMessage(message: Message) {
    if (this.socket$) {
      this.socket$.next({ event: 'chat_message', data: message});
    }
  }

  close() {
    this.socket$?.complete();
  }
  
}
