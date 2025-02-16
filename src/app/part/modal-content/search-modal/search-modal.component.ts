import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../../service/modal.service';

@Component({
  selector: 'app-search-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css'
})
export class SearchModalComponent implements OnInit{
  @Input() currentStep!: string;  

  locationForm = new FormGroup({
    departement: new FormControl(''),
    commune: new FormControl(''),
    arrondissement: new FormControl(''),
    quartier: new FormControl(''),
  })

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.modalState$.subscribe(state => {
      if(state.data?.currentStep) {
        this.currentStep = state.data.currentStep;
      }
    })
  }
  
}
