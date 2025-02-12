import { Component } from '@angular/core';
import { ConversationComponent } from '../conversation/conversation.component';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-inbox',
    imports: [ConversationComponent, CommonModule],
    templateUrl: './inbox.component.html',
    styleUrl: './inbox.component.css'
})
export class InboxComponent {
    userId: string | null = localStorage.getItem('userId');
    

    constructor(private apiService: ApiService) {
        
    }
    
    loadProperties() {
    this.apiService.getConversations()
        .catch((error) => {
        console.error('Error fetching properties:', error);
        });
    }
    
}
