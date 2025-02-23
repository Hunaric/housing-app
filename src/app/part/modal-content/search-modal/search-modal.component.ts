import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocationService, ModalService } from '../../../service/modal.service';
import { Departement } from '../../../interfaces/locations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-search-modal',
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css'
})
export class SearchModalComponent implements OnInit{
  @Input() currentStep!: string;  
  isDepartementSelected = false;
  data: Departement[] = [];
  selectedDepartement: Departement | null = null;
  errors: string[] = [];
  

  locationForm = new FormGroup({
    departement: new FormControl(''),
  })

  constructor(private modalService: ModalService, locationService: LocationService) {
    locationService.getLocations().subscribe(data => {
      this.data = data;
    })
  }

  ngOnInit(): void {
    this.modalService.modalState$.subscribe(state => {
      if(state.data?.currentStep) {
        this.currentStep = state.data.currentStep;
      }
    })
  }

    // #Méthodes pour gérer la sélection 
    onDepartementChange(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const departementId = Number(selectElement.value);
      this.selectedDepartement = this.data.find((d: Departement) => d.id_departement === departementId) || null;
      this.locationForm.get('departement')?.setValue(this.selectedDepartement?.libelle_departement || '');
      this.isDepartementSelected = true;
      console.log('Dep', this.locationForm.value);
      
    }
  
    changeStep(value: string) {
      this.currentStep = value;
    }
}
