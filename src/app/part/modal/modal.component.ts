import { Component, Type } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  isOpen = false;
  content: Type<any> | null = null; // Change this to Type<any>
  label: string = '';

  constructor(private modalService: ModalService) {
    this.modalService.modalState$.subscribe((state) => {
      this.isOpen = state.isOpen;
      this.content = state.content; // This will now be a component type
      this.label = state.label;
    });
  }

  closeModal() {
    this.modalService.close();
  }
}