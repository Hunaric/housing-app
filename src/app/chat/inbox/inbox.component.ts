import { Component } from '@angular/core';
import { ConversationComponent } from '../conversation/conversation.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [ConversationComponent],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent {

}
