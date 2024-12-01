import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorySercive, LocationService, ModalService } from '../../../service/modal.service';
import { CategoriesComponent } from '../../../form/categories/categories.component';
import { Arrondissement, Commune, Departement, Quartier } from '../../../interfaces/locations';
import { ApiService } from '../../../service/api.service';

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
  currentStep = 1;
  images: string[] = []
  maxImages: number = 5
  dataImage: string | null = null;
  errors: string[] = [];

  constructor(private modalService: ModalService, private categoryService: CategorySercive, locationService: LocationService, private apiService: ApiService) {
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
    price_per_night: new FormControl(this.minPrice, [
      Validators.required, 
      Validators.min(this.minPrice),
      Validators.pattern('^[0-9]+$'),
    ]),
    bedrooms: new FormControl(this.minValue, [
      Validators.required, 
      Validators.min(this.minValue),
      Validators.pattern('^[0-9]+$'),
    ]),
    bathrooms: new FormControl(this.minValue, [
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
    country_code: new FormControl('+229'),
    image: new FormControl(null as unknown as File, [Validators.required]),
    additionnal_images: new FormControl([] as File[]),
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
      this.locationForm.get('quarter')?.setValue(this.selectedQuartier.libelle_quartier); // <-- Affecte uniquement le libellé
    } else {
      this.locationForm.get('quarter')?.setValue(''); // Vide si aucun quartier sélectionné
    }
    this.isQuartierSelected = true;
    this.zoneSelected = `${this.selectedDepartement?.libelle_departement ?? ''}/${this.selectedCommune?.libelle_commune ?? ''}/${this.selectedArrondissement?.libelle_arrondissement ?? ''}/${this.selectedQuartier?.libelle_quartier ?? ''}`;
    this.propertyForm.get('country')?.setValue(this.zoneSelected);
  }
  
  // Image
  setImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.propertyForm.get('image')?.setValue(file);
      this.dataImage = URL.createObjectURL(file);
    }
  }
  
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  addImages(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files) {
      const files = Array.from(input.files); // Convertit FileList en tableau
      console.log('Fichiers sélectionnés:', files);
  
      const existingImages = this.propertyForm.get('additionnal_images')?.value || [];
      console.log('Images existantes:', existingImages);
  
      if (existingImages.length + files.length > this.maxImages) {
        this.errors.push(`You can upload a maximum of ${this.maxImages} images.`);
        console.log('Erreur: trop d\'images', this.errors);
        return;
      }
  
      // Ajoute les fichiers sélectionnés au tableau existant
      this.propertyForm.get('additionnal_images')?.setValue([...existingImages, ...files]);
      console.log('Nouvelles images dans le formulaire:', this.propertyForm.get('additionnal_images')?.value);
  
      // Ajoute les prévisualisations
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result as string;
          this.images.push(result); // Pour afficher les prévisualisations
          console.log('Prévisualisation ajoutée:', result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    console.log('Suppression de l\'image à l\'index:', index);
    
    // Vérifie si l'index est valide avant de supprimer
    if (index >= 0 && index < this.images.length) {
      this.images.splice(index, 1);
      console.log('Image supprimée. Nouveau tableau des images:', this.images);
    } else {
      console.log('Erreur: index non valide pour la suppression.');
    }
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
        const descriptionControl = this.propertyForm.get('description');
        if(!this.propertyForm.get('title')?.value) {
          this.errors.push('Please enter a title');
          valid = false;
        }
        if(!descriptionControl?.value) {
          this.errors.push('Please enter a description');
          valid = false;
        } else if (descriptionControl?.value.length < 10) {
          this.errors.push('Description must be at least 10 characters long');
          valid = false;
        }
        
        break;

      case 3:
        if (
          !this.checkFieldErrors('price_per_night') || 
          !this.checkFieldErrors('bedrooms') ||
          !this.checkFieldErrors('bathrooms') ||
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

      case 5:
        const imageFile = this.propertyForm.get('image')?.value;
        if(!imageFile) {
          this.errors.push('Please select an image');
          valid = false;
        } else if (imageFile.size > 5 * 1024 * 1024) {
          this.errors.push('The file size exceeds the limit of 5MB.');
          valid = false
        }
        break
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

  // async submitForm() {
  //   if (this.validateStep()) {
  //     if (this.propertyForm.valid) {
  //       try {
  //         const response = await this.apiService.setProperty(this.propertyForm)
  //         console.log('Response:', response);
  //         if (response.success) {
  //           this.modalService.close();
  //         } 
  //       } catch (error) {
  //           this.errors.push('failed to submit property. Please try again later.')
  //       }
        
  //     } else {
  //       this.errors.push('Please complete all required fields.');
  //     }
  //   }
  // }

  async submitForm() {
    // Vérifie la première étape de validation
    console.log('Validation étape 1: validateStep');
    if (this.validateStep()) {
      console.log('Validation étape 1 réussie');
      
      // Vérifie si le formulaire est valide
      console.log('Validation étape 2: propertyForm.valid');
      console.log('Formulaire:', this.propertyForm.value);
      
      if (this.propertyForm.valid) {
        console.log('Validation étape 2 réussie');
        
        try {
          // Appel API pour soumettre les données
          console.log('Envoi des données à l\'API');
          const response = await this.apiService.setProperty(this.propertyForm);
          
          console.log('Réponse de l\'API:', response);
          if (response.success) {
            console.log('Soumission réussie, fermeture du modal');
            this.modalService.close();
          } else {
            console.log('Échec de la soumission');
            this.errors.push('Failed to submit property. Please try again later.');
          }
        } catch (error) {
          console.error('Erreur lors de l\'appel à l\'API:', error);
          this.errors.push('Failed to submit property. Please try again later.');
        }
        
      } else {
        console.log('Le formulaire est invalide');
        console.log('Form Errors:', this.propertyForm.errors);
        this.errors.push('Please complete all required fields.');
      }
      
    } else {
      console.log('Échec de validateStep');
      this.errors.push('Validation step failed.');
    }
  }
  
}

