import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../../../service/modal.service'; // Adjust the import path as needed
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <form (ngSubmit)="submitSignup()" class="space-y-4">
    <input 
      [(ngModel)]="email" 
      name="email" 
      placeholder="Your e-mail address" 
      type="email" 
      class="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
      required 
    />

    <input 
      [(ngModel)]="password1" 
      name="password1" 
      placeholder="Your password" 
      type="password" 
      class="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
      required 
    />

    <input 
      [(ngModel)]="password2" 
      name="password2" 
      placeholder="Repeat password" 
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
  styleUrls: ['./signup-modal.component.css'],
})
export class SignupModalComponent {
  email: string = '';
  password1: string = '';
  password2: string = '';
  errors: string[] = [];

  constructor(private modalService: ModalService, private http: HttpClient, private router: Router) {}

  submitSignup() {
    const formData = {
      email: this.email,
      password1: this.password1,
      password2: this.password2,
    };

    this.http.post<any>('/api/auth/register/', formData).subscribe(
      (response) => {
        if (response.access) {
          // Assuming handleLogin is a service method to store user info
          // this.authService.handleLogin(response.user.pk, response.access, response.refresh);
          this.modalService.close(); // Close the modal
          this.router.navigate(['/']); // Redirect to home
        } else {
          const tmpErrors: string[] = Object.values(response).map((error: any) => error);
          this.errors = tmpErrors;
        }
      },
      (error) => {
        this.errors = error.error.non_field_errors || ['An error occurred'];
      }
    );
  }
}