import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorySercive, LocationService, ModalService } from '../../../service/modal.service';
import { CategoriesComponent } from '../../../form/categories/categories.component';
import { Arrondissement, Commune, Departement, Quartier } from '../../../interfaces/locations';

@Component({
  selector: 'app-add-property-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CategoriesComponent],
  templateUrl: './add-property-modal.component.html',
  styleUrl: './add-property-modal.component.css'
})
export class AddPropertyModalComponent {
  data: Departement[] = [];
  selectedDepartement: Departement | null = null;
  isDepartementSelected = false;
  selectedCommune: Commune | null = null;
  isCommuneSelected = false;
  selectedArrondissement: Arrondissement | null = null;
  isArrondissementSelected = false;
  selectedQuartier: Quartier | null = null;
  isQuartierSelected = false;
  zoneSelected: string | null = '';
  currentStep = 4;
  errors: string[] = [];

  constructor(private modalService: ModalService, private categoryService: CategorySercive, locationService: LocationService) {
    // this.synchronizeCategory();
    locationService.getLocations().subscribe(data => {
      this.data = data;
    })
  }

  minPrice = 1000;
  minValue = 1
  // Forms
  locationForm = new FormGroup({
    departement: new FormControl('', [Validators.required]),
    commune: new FormControl('', [Validators.required]),
    arrondissement: new FormControl('', [Validators.required]),
    quarter: new FormControl('', [Validators.required]),
  })
  
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

  
  // #Méthodes pour gérer la sélection 
  onDepartementChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const departementId = Number(selectElement.value);
    this.selectedDepartement = this.data.find((d: Departement) => d.id_departement === departementId) || null;
    this.locationForm.get('departement')?.setValue(this.selectedDepartement?.libelle_departement || '');
    this.selectedCommune = null;
    this.selectedArrondissement = null;
    this.isDepartementSelected = true;
  }

  onCommuneChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const communeId = Number(selectElement.value);
    this.selectedCommune = this.selectedDepartement?.communes.find((c: Commune) => c.id_commune === communeId) || null;
    this.locationForm.get('commune')?.setValue(this.selectedCommune?.libelle_commune || '');
    this.selectedArrondissement = null;
    this.isCommuneSelected = true;
  }

  onArrondissementChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const arrondissementId = Number(selectElement.value);
    this.selectedArrondissement = this.selectedCommune?.arrondissements.find((a: Arrondissement) => a.id_arrondissement === arrondissementId) || null;
    this.locationForm.get('arrondissement')?.setValue(this.selectedArrondissement?.libelle_arrondissement || '');
    this.isArrondissementSelected = true;
  }

  onQuartierChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const quartierId = Number(selectElement.value);
  
    // Récupérer le quartier sélectionné
    this.selectedQuartier = this.selectedArrondissement?.quartiers.find(
      (q: Quartier) => q.id_quartier === quartierId
    ) ?? null;

    console.log(this.selectedQuartier?.libelle_quartier);
  
    // Si le quartier est trouvé, mettre à jour le champ country avec son libelle
    if (this.selectedQuartier) {
    quarter: new FormControl('', [Validators.required]),
      this.locationForm.get('quarter')?.setValue(this.selectedQuartier.libelle_quartier); // <-- Affecte uniquement le libellé
    } else {
      this.locationForm.get('quarter')?.setValue(''); // Vide si aucun quartier sélectionné
    }
    this.isQuartierSelected = true;
    this.zoneSelected = `${this.selectedDepartement?.libelle_departement ?? ''}/${this.selectedCommune?.libelle_commune ?? ''}/${this.selectedArrondissement?.libelle_arrondissement ?? ''}/${this.selectedQuartier?.libelle_quartier ?? ''}`;
    this.propertyForm.get('country')?.setValue(this.zoneSelected);
  }
  
  
  // Category Signal
  synchronizeCategory() {
    const selectCategory = this.categoryService.getCategory();

    if (selectCategory) {
      this.propertyForm.get('category')?.setValue(selectCategory());
    }
    // console.log(selectCategory);
    
  }


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
      case 4: // Vérification à l'étape 4
        if (!this.propertyForm.get('country')?.value) {
          this.errors.push('Please select a country');
          valid = false;
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

