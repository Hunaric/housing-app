import { Component, Input } from '@angular/core';
import { Conversation } from '../../interfaces/chat';
import { CommonModule } from '@angular/common';
import { UserType } from '../../interfaces/user';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-conversation',
    imports: [CommonModule, RouterModule],
    templateUrl: './conversation.component.html',
    styleUrl: './conversation.component.css'
})
export class ConversationComponent {
    @Input() key!: string;
    @Input() userId!: string;
    @Input() conversation!: Conversation;

    getOtherUser(): UserType | undefined {
        return this.conversation.users.find(user => user.id !== this.userId);
    }


}
