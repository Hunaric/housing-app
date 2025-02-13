import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { WebsocketService } from '../../service/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from '../../interfaces/chat';
import { UserType } from '../../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-conversation-details',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './conversation-details.component.html',
    styleUrl: './conversation-details.component.css'
})
export class ConversationDetailsComponent implements OnChanges{
  userId: string | null = localStorage.getItem('userId');
  @Input() conversation!: Conversation;

  myUser?: UserType;
  otherUser?: UserType;
  newMessage: string = "";
  realtimeMessages: any[] = [];
  private subscription!: Subscription;

  constructor(private websocketService: WebsocketService) {}
    
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversation'] && this.conversation) {
      console.log('conversation received:', this.conversation);
      
      this.otherUser = this.conversation.users.find(user => user.id !== this.userId);
      this.myUser = this.conversation.users.find(user => user.id === this.userId);

      if (this.conversation.id) {
        // this.websocketService.connect(this.conversation.id)
      }
    }
    
  }

  clickButton() {
    console.log('click');
  }
}
