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

  minPrice = 1000;
  minValue = 1
  // Form 
  propertyForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    price: new FormControl(this.minPrice, [
      Validators.required, 
      Validators.min(this.minPrice),
      Validators.pattern('^[0-9]+$'),
    ]),
    bedroom: new FormControl(this.minValue, [
      Validators.required, 
      Validators.min(this.minValue),
      Validators.pattern('^[0-9]+$'),
    ]),
    bathroom: new FormControl(this.minValue, [
      Validators.required, 
      Validators.min(this.minValue),
      Validators.pattern('^[0-9]+$'),
    ]),
    guests: new FormControl(this.minValue, [
      Validators.required, 
      Validators.min(this.minValue),
      Validators.pattern('^[0-9]+$'),
    ]),
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

      case 2:
        if(!this.propertyForm.get('title')?.value) {
          this.errors.push('Please enter a title');
          valid = false;
        }
        if(!this.propertyForm.get('description')?.value) {
          this.errors.push('Please enter a description');
          valid = false;
        }
        break;

      case 3:
        if (
          !this.checkFieldErrors('price') || 
          !this.checkFieldErrors('bedroom') ||
          !this.checkFieldErrors('bathroom') ||
          !this.checkFieldErrors('guests')
        ) {
          valid = false; // Si une des validations échoue, l'ensemble devient invalide
        }
        break;
    }
    return valid;
  }

  checkFieldErrors(fieldName: string): boolean {
    const control = this.propertyForm.get(fieldName);
    if (control?.invalid && control.touched) {
      if (control.errors?.['required']) {
        this.errors.push(`${this.capitalize(fieldName)} is required`);
      }
      if (control.errors?.['min']) {
        const minValue = control.errors['min'].min;
        this.errors.push(`${this.capitalize(fieldName)} must be at least ${minValue}`);
      }
      return false; // Retourner false si des erreurs sont trouvées
    }
    return true; // Retourner true si aucun problème n'est trouvé
  }
  

  capitalize(fieldName: string): string {
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
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
