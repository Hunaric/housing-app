import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorySearchService, LocationService, ModalService, SearchService } from '../../../service/modal.service';
import { Commune, Departement } from '../../../interfaces/locations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SearchQuery } from '../../../interfaces/search';

@Component({
  selector: 'app-search-modal',
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    MatDatepickerModule,
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
  isCommuneSelected = false;
  data: Departement[] = [];
  selectedDepartement: Departement | null = null;
  errors: string[] = [];
  selectedCommune: Commune | null = null;
  searchQuery: SearchQuery | null = null;

  @Input() selectedCategory: string | null = null; // Propriété pour recevoir la catégorie sélectionnée


  minDate = new Date();
  maxDate = new Date(
    this.minDate.getFullYear(),
    this.minDate.getMonth() + 6,
    this.minDate.getDay()
  )
  
  minEndDate = this.minDate;
  maxEndDate = new Date(
    this.minEndDate.getFullYear(),
    this.minEndDate.getMonth() + 6,
    this.minEndDate.getDay()
  );
  
  locationForm = new FormGroup({
    departement: new FormControl(''),
    commune: new FormControl(''),
    
  })

  startDateForm = new FormGroup({
    startDate: new FormControl(this.minDate),
    endDate: new FormControl(this.minDate),
  })

  detailsForm = new FormGroup({
    bedrooms: new FormControl(null, [
      Validators.min(1),
      Validators.pattern('^[0-9]+$'),
    ]),
    bathrooms: new FormControl(null, [
      Validators.min(1),
      Validators.pattern('^[0-9]+$'),
    ]),
    guests: new FormControl(null, [
      Validators.min(1),
      Validators.pattern('^[0-9]+$'),
    ]),
  })

  // Formulaire pour la sélection des dates
  readonly campaignOne = new FormGroup({
    start: new FormControl<Date | null>(this.minDate),
    end: new FormControl<Date | null>(null),
  });


  constructor(private modalService: ModalService, private searchService: SearchService, locationService: LocationService, private categoryService: CategorySearchService, private cdr: ChangeDetectorRef) {
    locationService.getLocations().subscribe(data => {
      this.data = data;
    })

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.minDate = today;
    this.minEndDate = new Date(this.minDate);
  }

  ngOnInit(): void {
    this.modalService.modalState$.subscribe(state => {
      if(state.data?.currentStep) {
        this.currentStep = state.data.currentStep;
      }
    })
    

    // Abonnez-vous à la catégorie sélectionnée
    this.categoryService.selectedCategory$.subscribe(category => {
      if (category) {
        this.selectedCategory = category; // Mettez à jour la catégorie sélectionnée
        this.endSearch(); // Appelez la méthode pour effectuer la recherche
      }
    });
  }


  // Méthode pour gérer la sélection de la catégorie
  onCategorySelected(category: string) {
    this.selectedCategory = category; // Mettez à jour la catégorie sélectionnée
    console.log('Catégorie sélectionnée:', this.selectedCategory);
  }

    // #Méthodes pour gérer la sélection 
    onDepartementChange(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const departementId = Number(selectElement.value);
      this.selectedDepartement = this.data.find((d: Departement) => d.id_departement === departementId) || null;
      this.locationForm.get('departement')?.setValue(this.selectedDepartement?.libelle_departement || '');
      this.isDepartementSelected = true;
      this.selectedCommune = null;
      console.log('Form', this.locationForm.value);
    }

  onCommuneChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const communeId = Number(selectElement.value);
    this.selectedCommune = this.selectedDepartement?.communes.find((c: Commune) => c.id_commune === communeId) || null;
    this.locationForm.get('commune')?.setValue(this.selectedCommune?.libelle_commune || '');
    this.isCommuneSelected = true;
    console.log('Form', this.locationForm.value);
  }
  

  // Filtrer les dates pour empêcher la sélection de dates passées ou réservées
  filterDates = (date: Date | null): boolean => {
    if (!date) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remettre l'heure à minuit

    // Vérifiez si la date est dans le passé 
    const isPast = date < today;

    return !isPast; // N'autorise que les dates valides
  };

    // Fonction déclenchée lorsqu'une date de début est sélectionnée
    onStartDateSelected(date: Date | null) {
      if (!date) {return};
  
      // Mettre à jour la date de début et définir la date de fin par défaut
      this.campaignOne.get('start')?.setValue(date);
      this.minEndDate = date;
      const endDate = this.campaignOne.get('end')?.value;
  
      // Si aucune date de fin ou si elle est antérieure à la date de début
      if (!endDate || endDate < date) {
        this.campaignOne.get('end')?.setValue(date); // Définit la date de début comme valeur par défaut pour la fin
        this.startDateForm.get('endDate')?.setValue(date);
      }
  
    }
  
    // Fonction déclenchée lorsqu'une date de fin est sélectionnée
    onEndDateSelected(date: Date | null) {
      if (!date) return;
  
      const startDate = this.campaignOne.get('start')?.value;
      
      if (startDate && date < startDate) {
        alert('La date de fin ne peut pas être antérieure à la date de début.');
        return;
      }
  
      // Mettre à jour la date de fin
      this.campaignOne.get('end')?.setValue(date);
      this.startDateForm.get('endDate')?.setValue(date);
    }

    changeStep(value: string) {
      // if (value == 'checkin') {
      //   console.log("Location:", this.locationForm);
      // }
      this.currentStep = value;
    }

    endSearch() {
      const startValue = this.campaignOne.get('start')?.value;
      const endValue = this.campaignOne.get('end')?.value;
      
      // Vérifier si la date de fin est vide et l'utiliser comme date de début
      const checkOut = endValue 
        ? (endValue instanceof Date ? endValue.toISOString() : new Date(endValue).toISOString())
        : (startValue && (startValue instanceof Date || !isNaN(new Date(startValue).getTime())))
          ? new Date(startValue).toISOString()
          : null; // Si startValue est invalide ou null, retourner null
      
      const departement = this.locationForm.get('departement')?.value;
      const commune = this.locationForm.get('commune')?.value;
      
      const country = departement ? (commune ? `${departement}/${commune}` : departement) : '';
      
    
      this.searchQuery = {
        country: country,
        checkIn: startValue instanceof Date
          ? startValue.toISOString()
          : startValue 
            ? new Date(startValue).toISOString()
            : null,
        checkOut:checkOut,
        guests: this.detailsForm.get('guests')?.value ?? 1,
        bathrooms: this.detailsForm.get('bathrooms')?.value ?? 1,
        bedrooms: this.detailsForm.get('bedrooms')?.value ?? 1,
        category: this.selectedCategory || '', // Ajouter une valeur par défaut
      };

      console.log('search query:', this.searchQuery);
      
      this.searchService.updateSearchQuery(this.searchQuery);
      this.modalService.close();

    }


}
