import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalService, SuccessMessageService } from '../../service/modal.service';
import { AddPropertyModalComponent } from '../../part/modal-content/add-property-modal/add-property-modal.component';
import { SuccessMessageComponent } from '../../part/notification/success-message/success-message.component';

@Component({
  selector: 'app-add-propertie-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-propertie-button.component.html',
  styleUrl: './add-propertie-button.component.css'
})
export class AddPropertieButtonComponent {

  constructor(private modalService: ModalService, private successMessageService: SuccessMessageService) {}
  
  openAddPropertyModal() {
    this.modalService.open('Add Property', AddPropertyModalComponent);
  }

}
