import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from '../../part/modal/modal.component';
import { SearchModalComponent } from '../../part/modal-content/search-modal/search-modal.component';
import { ModalService } from '../../service/modal.service';

@Component({
    selector: 'app-search-filters',
    imports: [CommonModule],
    templateUrl: './search-filters.component.html',
    styleUrl: './search-filters.component.css'
})
export class SearchFiltersComponent {


  constructor(private modalService: ModalService) {}

  openSearchModal() {
    this.modalService.open('Search', SearchModalComponent);
  }

}
