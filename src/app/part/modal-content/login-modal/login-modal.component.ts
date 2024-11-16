import { Component } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [ModalComponent],
  template: `
    <form action="">
      <input type="email" class="w-full h-[54px] px-4 border border-gray-300 rounded-xl" placeholder="Your email address">
      <input type="email" class="w-full h-[54px] px-4 border border-gray-300 rounded-xl" placeholder="Your dress">
    </form>
  `,
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {

  constructor() {}
}
