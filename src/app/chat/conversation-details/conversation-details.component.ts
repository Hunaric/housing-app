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
export class ConversationDetailsComponent implements OnChanges, OnDestroy, OnInit {
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

      // Charger les anciens messages au début
      this.loadMessages();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversation'] && this.conversation) {
      this.otherUser = this.conversation.users.find(user => user.id !== this.userId);
      this.myUser = this.conversation.users.find(user => user.id === this.userId);
      this.loadMessages(); // Recharger les messages lors de la réception d'une nouvelle conversation


      // Connecter le WebSocket pour les messages en temps réel
      if (this.conversation.id) {
        this.websocketService.connect(this.conversation.id);

        // Souscrire aux messages en temps réel
        this.subscription = this.websocketService.messages$.subscribe(messages => {
          this.realtimeMessages = messages;
          this.scrollToBottom(); // Faire défiler vers le bas lorsqu'un nouveau message arrive
        });
      }
    }
  }

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
    console.log('mess1', messageBody);
    
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
      console.log('new mess:', newMessage);
      
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
