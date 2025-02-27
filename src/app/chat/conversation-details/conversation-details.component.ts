import { Component, ElementRef, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WebsocketService } from '../../service/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service'; // Ajoutez le service API pour charger les messages
import { Conversation } from '../../interfaces/chat';
import { UserType } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-conversation-details',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './conversation-details.component.html',
    styleUrls: ['./conversation-details.component.css']
})
export class ConversationDetailsComponent implements OnDestroy, OnInit {
  @Input() conversation!: Conversation;
  userId: string | null = localStorage.getItem('userId');
  
  myUser?: UserType;
  otherUser?: UserType;
  newMessage = new FormControl('');
  realtimeMessages: any[] = [];
  private subscription!: Subscription;

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  constructor(private websocketService: WebsocketService, private apiService: ApiService) {}

  ngOnInit() {
    if (this.conversation) {
      this.otherUser = this.conversation.users.find(user => user.id !== this.userId);
      this.myUser = this.conversation.users.find(user => user.id === this.userId);

      console.log('uuid:', this.otherUser);
      
      // Charger les anciens messages au début
      this.loadMessages();
      
      // Connect to WebSocket and subscribe to messages
      this.connectToWebSocket();
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['conversation'] && this.conversation) {
  //     this.otherUser = this.conversation.users.find(user => user.id !== this.userId);
  //     this.myUser = this.conversation.users.find(user => user.id === this.userId);
    
  //     // Connect to WebSocket only if not already connected
  //     if (!this.isWebSocketConnected) {
  //       this.loadMessages(); // Recharger les messages lors de la réception d'une nouvelle conversation
  //       this.connectToWebSocket();
  //     console.log('Chill');
        
  //     }
  //   }
  // }

  // Méthode pour charger les anciens messages
  loadMessages() {
    const conversationId = this.conversation.id;

    // Appelez l'API pour récupérer les messages (par exemple, les 10 derniers)
    this.apiService.getConversationBetweenTwoUsers(conversationId).then((response) => {
      this.realtimeMessages = response.messages; // Assume that the response contains the 'messages' data
      console.log('rel mess:', this.realtimeMessages);
      
      this.scrollToBottom();
    });
  }

  sendMessage() {
    const messageBody = this.newMessage.value?.trim();
    
    if (messageBody && this.otherUser) {
      const newMessage = {
        body: messageBody,
        name: this.myUser?.name || this.myUser?.email || "Moi",
        sent_to_id: this.otherUser.id,
        created_by: this.myUser as UserType,
        conversation_id: this.conversation.id,
      };
      
      console.log('user', newMessage.name);
      console.log('mess2', newMessage);
      // Envoie du message via WebSocket
      this.websocketService.sendMessage(newMessage);
    }
    this.newMessage.reset();
  }

  // Fonction pour défiler jusqu'en bas
  scrollToBottom() {
    setTimeout(() => {
      if (this.messageContainer.nativeElement) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }


  // Function to connect to WebSocket and subscribe to messages
  private connectToWebSocket() {
    if (this.conversation.id) {
      this.websocketService.connect(this.conversation.id);
  
      // Subscribe to real-time messages
      this.subscription = this.websocketService.messages$.subscribe(newMessage => {
        if (newMessage) {
          console.log('Here');
  
          // Check if newMessage is an array or a single object
          if (Array.isArray(newMessage)) {
            
          // If it's an array, push only the last message into the realtimeMessages
          const lastMessage = newMessage[newMessage.length - 1]; // Get the last message
          console.log('Array mess', lastMessage);
          if (lastMessage) {
            this.realtimeMessages.push(lastMessage); // Push the last message if it doesn't already exist
            console.log('Array');
          }
        } else {
            // If it's a single message, push it directly
            this.realtimeMessages.push(newMessage);
            console.log('Array');
          }
  
          console.log('Updated messages after receiving:', this.realtimeMessages);
          this.scrollToBottom(); // Scroll down when a new message arrives
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
