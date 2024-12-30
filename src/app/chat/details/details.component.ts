import { Component } from '@angular/core';
import { ConversationDetailsComponent } from '../conversation-details/conversation-details.component';

@Component({
    selector: 'app-details',
    imports: [ConversationDetailsComponent],
    templateUrl: './details.component.html',
    styleUrl: './details.component.css'
})
export class DetailsComponent {

}
