import { Component } from '@angular/core';
import { ConversationComponent } from '../conversation/conversation.component';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { Conversation, Conversations } from '../../interfaces/chat';

@Component({
    selector: 'app-inbox',
    imports: [ConversationComponent, CommonModule],
    templateUrl: './inbox.component.html',
    styleUrl: './inbox.component.css'
})
export class InboxComponent {
    userId: string | null = localStorage.getItem('userId');
    conversation: Conversation[] = [];

    constructor(private apiService: ApiService) {
        this.loadConversations();
    }
    
    loadConversations() {
    this.apiService.getConversations()
        .then((conversations: Conversations) => {
            console.log('conv:', conversations);
            this.conversation = conversations.data.map(conversation => ({
                ...conversation
            })
        );
        })
        .catch((error) => {
        console.error('Error fetching properties:', error);
        });
    }
    
}
