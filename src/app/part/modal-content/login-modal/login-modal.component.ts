import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Keep the HttpClient import
import { ModalService } from '../../../service/modal.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  template: `
  <form (ngSubmit)="submitLogin()" class="space-y-4" [formGroup]="loginForm">
    <input 
      formControlName="email"
      name="email" 
      placeholder="Your e-mail address" 
      type="email" 
      class="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
      required 
    />

    <div class="relative">
      <input 
        formControlName="password" 
        name="password1" 
        placeholder="Your password" 
        type="{{ passwordVisible ? 'text' : 'password' }}" 
        class="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
        required #passwordInput
      />
      <button class="absolute top-0 right-0 bottom-0 px-3 py-3 text-sm font-semibold text-gray-700"
        type="button" (click)="togglePasswordVisibility(passwordInput)">
        <i class="fas" [ngClass]="{
            'fa-eye': passwordVisible,
            'fa-eye-slash': !passwordVisible
          }"></i>
      </button>
    </div>
    
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
  passwordVisible: boolean = false;


  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  constructor(private modalService: ModalService, private http: HttpClient, private router: Router, private apiService: ApiService) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  
  async submitLogin() {
    this.errors = [];

    const { email, password } = this.loginForm.value;

    if(!email) {
      this.errors.push("Email required");
    } else if(!this.loginForm.get('email')?.valid) {
      this.errors.push("Email invalid");
    }

    if(!password) {
      this.errors.push("Password required");
    } else if (password.length < 8) {
      this.errors.push("Password min lenght is 8");
    }

    if(this.errors.length === 0) {
      try {
        const res = await this.apiService.onLogedIn(email!, password!);
        // console.log(res);
        localStorage.setItem('tokenAccess', res.access);
        localStorage.setItem('tokenRefresh', res.refresh);
        localStorage.setItem('userId', res.user.pk);
        this.modalService.close(); // Close the modal
        window.location.reload();
        // this.router.navigate(['/']); // Redirect to home
      } catch(error) {
        console.error('Error during sign in:', error);
      }
    } 
  }
}