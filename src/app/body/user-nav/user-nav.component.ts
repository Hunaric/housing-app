import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {
  isOpen: boolean = true;
  userId: string | null = '123';

  toogleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
