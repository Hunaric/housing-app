import { Component, inject } from '@angular/core';
import { ConversationDetailsComponent } from '../conversation-details/conversation-details.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Conversation, Message } from '../../interfaces/chat';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-details',
    imports: [ConversationDetailsComponent, CommonModule],
    templateUrl: './details.component.html',
    styleUrl: './details.component.css'
})
export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    conversation: Conversation | undefined;
    
    userId: string | null = localStorage.getItem('userId');
  
    constructor(private apiService: ApiService) {
      const conversationId = String(this.route.snapshot.params['id']);


      apiService.getConversationBetweenTwoUsers(conversationId).then((conversation) => {
        this.conversation = conversation.conversation;
        console.log('conversation:', this.conversation);
    })
  
    }

}
