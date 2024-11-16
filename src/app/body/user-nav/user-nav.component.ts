import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { LoginModalComponent } from '../../part/modal-content/login-modal/login-modal.component';
import { SignupModalComponent } from '../../part/modal-content/signup-modal/signup-modal.component';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {
  userNavIsOpen: boolean = false;
  userId: string | null = '';

  toogleUserNavIsOpen() {
    this.userNavIsOpen = !this.userNavIsOpen;
  }

  constructor(private modalService: ModalService) {}

  openLoginModal() { 
    this.modalService.open('Log in', LoginModalComponent);  // Passez le composant ici
  }
  
  openSignupModal() { 
    this.modalService.open('Sign up', SignupModalComponent);  // Passez le composant ici
  }
  
}
