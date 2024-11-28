import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorySercive, ModalService } from '../../../service/modal.service';
import { CategoriesComponent } from '../../../form/categories/categories.component';

@Component({
  selector: 'app-add-property-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CategoriesComponent],
  templateUrl: './add-property-modal.component.html',
  styleUrl: './add-property-modal.component.css'
})
export class AddPropertyModalComponent {
  currentStep = 1;
  errors: string[] = [];

  constructor(private modalService: ModalService, private categoryService: CategorySercive) {
    // this.synchronizeCategory();
  }

  // Category Signal
  synchronizeCategory() {
    const selectCategory = this.categoryService.getCategory();

    if (selectCategory) {
      this.propertyForm.get('category')?.setValue(selectCategory());
    }
    // console.log(selectCategory);
    
  }

  propertyForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    price: new FormControl('', [Validators.required, Validators.min(1000)]),
    bedroom: new FormControl('', [Validators.required, Validators.min(1)]),
    bathroom: new FormControl('', [Validators.required, Validators.min(1)]),
    guests: new FormControl('', [Validators.required, Validators.min(1)]),
    country: new FormControl('', [Validators.required]),
    image: new FormControl(null, [Validators.required]),
  })

  previousStep() {
    this.errors = [];
    this.currentStep--; // Decrement current Step value;
  }

  nextStep() {
    if (this.currentStep === 1) {
      this.synchronizeCategory(); // Synchronisation de la catégorie à chaque étape
      console.log(this.propertyForm.get('category')?.value);
    }
    if (this.validateStep()) {
      this.errors = [];
      this.currentStep++; // Increment currentStep value;
    }
  }

  validateStep() {
    this.errors = [];
    let valid = true;

    switch(this.currentStep) {
      case 1:
        if(!this.propertyForm.get('category')?.value) {
          this.errors.push('Please select a category');
          valid = false
        }
        break;
    }
    return valid;
  }

  submitForm() {
    if (this.propertyForm.valid) {
      console.log('Form data:', this.propertyForm.value);
      
      this.modalService.close();
    } else {
      this.errors.push('Please complete all required fields.');
    }
  }
}
