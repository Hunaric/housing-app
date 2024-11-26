import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../../../service/modal.service'; // Adjust the import path as needed
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { CookieService } from '../../../service/cookie.service';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <form (submit)="submitSignup()" class="space-y-4" [formGroup]="signinForm">
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
        formControlName="password1" 
        name="password1" 
        placeholder="Your password" 
        type="{{ passwordVisible ? 'text' : 'password' }}" 
        class="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
        required #passwordInput
      />
      <button class="absolute top-0 right-0 bottom-0 px-3 py-3 text-sm font-semibold text-gray-700"
        type="button" (click)="togglePassword1Visibility(passwordInput)">
        <i class="fas" [ngClass]="{
            'fa-eye': passwordVisible,
            'fa-eye-slash': !passwordVisible
          }"></i>
      </button>
    </div>

    <div class="relative">
      <input 
        formControlName="password2" 
        name="password2" 
        placeholder="Repeat password" 
        type="password" 
        class="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
        required #password2Input
      />
      <button class="absolute top-0 right-0 bottom-0 px-3 py-3 text-sm font-semibold text-gray-700"
        type="button" (click)="togglePassword2Visibility(password2Input)">
        <i class="fas" [ngClass]="{
            'fa-eye': passwordVisible1,
            'fa-eye-slash': !passwordVisible1
          }"></i>
      </button>
    </div>
    
    <div *ngFor="let error of errors; let i = index" class="p-5 bg-airbnb text-white rounded-xl opacity-80">
      {{ error }}
    </div>
    
    <div *ngIf="success" class="p-5 bg-green-400 text-white rounded-xl opacity-80">
      {{ success }}
    </div>

    <button type="submit" class="w-full h-[54px] bg-airbnb-dark text-white rounded-xl">Submit</button>
  </form>
`,
  styleUrls: ['./signup-modal.component.css'],
})
export class SignupModalComponent {
  success: string | null = null;
  errors: string[] = [];
  passwordVisible: boolean = false;
  passwordVisible1: boolean = false;

  togglePassword1Visibility(passwordInput: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  togglePassword2Visibility(passwordInput: HTMLInputElement): void {
    this.passwordVisible1 = !this.passwordVisible1;
    passwordInput.type = this.passwordVisible1 ? 'text' : 'password';
  }

  constructor(private modalService: ModalService, private http: HttpClient, private router: Router, private apiService: ApiService, private cookieService: CookieService) {}

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required]),
  }
// { validators: this.matchPasswords(password1, password2) }
)

  // matchPasswords(password1Key: string, password2Key: string) {
  //   return (formGroup: FormGroup) => {
  //     const password1 = formGroup.get(password1Key);
  //     const password2 = formGroup.get(password2Key);

  //     if (password1?.value !== password2?.value) {
  //       password2?.setErrors({ passwordMismatch: true})
  //     } else {
  //       password2?.setErrors(null)
  //     }
  //   }
  // }


  async submitSignup() {
    this.errors = [];

    const { email, password1, password2 } = this.signinForm.value;

    if(!email) {
      this.errors.push("Email required");
    } else if(!this.signinForm.get('email')?.valid) {
      this.errors.push("Email invalid");
    }

    if(!password1) {
      this.errors.push("Password required");
    } else if (password1.length < 8) {
      this.errors.push("Password min lenght is 8");
    }

    if(!password2) {
      this.errors.push("You must confirme password");
    } else if (password1 !== password2) {
      this.errors.push("Passwords not the same");
    }

    if(this.errors.length === 0) {
      try {
        const res = await this.apiService.onSignedIn(email!, password1!, password2!);
        console.log(res);
        // window.location.reload();
        // this.cookieService.handleLogin(res.user.pk, res.access, res.refresh);
        // this.success = 'Account created successfully';
        this.modalService.close(); // Close the modal
      } catch(error) {
        console.error('Error during sign in:', error);
      }
    } else {
      console.error('Error during sign in:', this.errors);
      
    };
  }
}