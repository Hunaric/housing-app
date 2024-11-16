import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversation-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './conversation-details.component.html',
  styleUrl: './conversation-details.component.css'
})
export class ConversationDetailsComponent {
  clickButton() {
    console.log('click');
  }
}
