import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Keep the HttpClient import
import { ModalService } from '../../../service/modal.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, CommonModule], // Remove HttpClientModule here
  template: `
  <form (ngSubmit)="submitLogin()" class="space-y-4">
    <input 
      [(ngModel)]="email" 
      name="email" 
      placeholder="Your e-mail address" 
      type="email" 
      class="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
      required 
    />

    <input 
      [(ngModel)]="password" 
      name="password" 
      placeholder="Your password" 
      type="password" 
      class="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
      required 
    />
    
    <div *ngFor="let error of errors; let i = index" class="p-5 bg-airbnb text-white rounded-xl opacity-80">
      {{ error }}
    </div>

    <button type="submit" class="w-full h-[54px] bg-blue-600 text-white rounded-xl">Submit</button>
  </form>
  
  `,
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  email: string = '';
  password: string = '';
  errors: string[] = [];

  constructor(private modalService: ModalService, private http: HttpClient, private router: Router) {}

  submitLogin() {
    const formData = {
      email: this.email,
      password: this.password,
    };

    this.http.post<any>('/api/auth/login/', formData).subscribe(
      (response) => {
        if (response.access) {
          // Handle successful login
          // Assuming handleLogin is a service method to store user info
          // this.authService.handleLogin(response.user.pk, response.access, response.refresh);
          this.modalService.close(); // Close the modal
          this.router.navigate(['/']); // Redirect to home
        } else {
          this.errors = response.non_field_errors || ['An error occurred'];
        }
      },
      (error) => {
        this.errors = error.error.non_field_errors || ['An error occurred'];
      }
    );
  }
}