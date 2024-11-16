import { Component, Type } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  isOpen = false;
  content: Type<any> | null = null;
  label: string = '';

  constructor(private modalService: ModalService) {
    this.modalService.modalState$.subscribe((state) => {
      this.isOpen = state.isOpen;
      this.content = state.content;
      this.label = state.label;
    });
  }

  closeModal() {
    console.log('Closing Modal');
    
    this.modalService.close();
  }


  openModal(label: string = 'My Title', content: any = `<p>Hello World</p>`) {
    this.modalService.open(label, content);
  }
} 
