import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { LoginModalComponent } from '../../part/modal-content/login-modal/login-modal.component';
import { SignupModalComponent } from '../../part/modal-content/signup-modal/signup-modal.component';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
    selector: 'app-user-nav',
    imports: [CommonModule],
    templateUrl: './user-nav.component.html',
    styleUrl: './user-nav.component.css'
})
export class UserNavComponent {
  userNavIsOpen: boolean = false;
  userId: string | null = localStorage.getItem('userId');

  toogleUserNavIsOpen() {
    this.userNavIsOpen = !this.userNavIsOpen;
  }

  constructor(private modalService: ModalService, private router: Router, private apiService: ApiService) {
    console.log('userId: ', this.userId);
    
  }

  openLoginModal() { 
    this.modalService.open('Log in', LoginModalComponent);  // Passez le composant ici
  }
  
  openSignupModal() { 
    this.modalService.open('Sign up', SignupModalComponent);  // Passez le composant ici
  }

  async logout() {
    try {
      const res = await this.apiService.onLogedOut();
      
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenAccess');
      localStorage.removeItem('tokenRefresh');
      window.location.reload();
    } catch(error) {
      console.error('Error during sign in:', error);
    }
  }
  
}
