import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ApiService } from '../../../service/api.service';
import { ModalService } from '../../../service/modal.service';
import { LoginModalComponent } from '../../modal-content/login-modal/login-modal.component';

@Component({
  selector: 'app-reservation-sidebar',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservation-sidebar.component.html',
  animations: [
    trigger('transitionMessages', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [animate('300ms ease-in')]),
      transition(':leave', [animate('300ms ease-out')]),
    ]),
  ],
  styleUrls: ['./reservation-sidebar.component.css'],
})
export class ReservationSidebarComponent implements OnInit, OnChanges{
  @Input() id!: string;
  @Input() guests!: number;
  @Input() price_per_night!: number;
  userId: string | null = localStorage.getItem('userId');

  // Variables pour gérer les dates et le calcul du prix
  totalPrice: number = 0;
  nights: number = 1;
  
  minDate = new Date();
  maxDate = new Date(
    this.minDate.getFullYear(),
    this.minDate.getMonth() + 6,
    this.minDate.getDay()
  );

  minEndDate = this.minDate;
  maxEndDate = new Date(
    this.minEndDate.getFullYear(),
    this.minEndDate.getMonth() + 6,
    this.minEndDate.getDay()
  );
  minValue: number = 1;
  maxValue: number = this.guests;

  fee = this.minValue;

  constructor (private apiService: ApiService, private modalService: ModalService) {}

  ngOnInit(): void {
  }

  bookedDate: Date[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      if(this.id) {
        this.apiService
          .getPropertyReservation(this.id)
          .then((reservation) => {
            this.bookedDate = [];
            reservation.forEach((res: any) => {
              if (res.start_date && res.end_date) {
                const startDate = new Date(res.start_date);
                const endDate = new Date(res.end_date);
    
                // Ajouter la plage de dates réservées
                let currentDate = startDate;
                while (currentDate <= endDate) {
                  this.bookedDate.push(new Date(currentDate));
                  currentDate.setDate(currentDate.getDate() + 1);
                }
              }
            });
    
            // Identifier la première date libre après aujourd'hui
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Remettre l'heure à minuit
            const nextAvailableDate = this.getNextAvailableDate(today);
    
            // Mettre à jour minDate et startDate
            this.minDate = nextAvailableDate || today;
            this.minEndDate = new Date(this.minDate);
            this.reservationForm.get('startDate')?.setValue(this.minDate);
            this.campaignOne.get('start')?.setValue(this.minDate);
            this.reservationForm.get('endDate')?.setValue(this.minEndDate);
            this.campaignOne.get('end')?.setValue(this.minEndDate);
    
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des réservations:', error);
          });
      }
    }
  }

  getNextAvailableDate(today: Date): Date | null {
    let nextDate = new Date(today);
  
    while (true) {
      const isBooked = this.bookedDate.some(
        (booked) =>
          booked.getFullYear() === nextDate.getFullYear() &&
          booked.getMonth() === nextDate.getMonth() &&
          booked.getDate() === nextDate.getDate()
      );
  
      if (!isBooked) {
        return nextDate; // La date est libre
      }
  
      nextDate.setDate(nextDate.getDate() + 1); // Passer au jour suivant
  
      // Limite pour éviter une boucle infinie
      if (nextDate.getFullYear() > today.getFullYear() + 1) {
        return null; // Si aucune date n'est trouvée dans une année, retourner null
      }
    }
  }
  
  

  reservationForm = new FormGroup({
    selectedGuests: new FormControl(this.minValue, [
      Validators.required,
      Validators.min(this.minValue),
      Validators.max(this.maxValue),
    ]),
    startDate: new FormControl(this.minDate, [
      Validators.required,
    ]),
    endDate: new FormControl(this.minDate),
    nights: new FormControl(this.minValue, [
      Validators.required,
      Validators.min(this.minValue),
    ]),
    totalPrice: new FormControl(this.price_per_night, [
      Validators.required,
      Validators.min(this.price_per_night),
    ]),
  });

  // Formulaire pour la sélection des dates
  readonly campaignOne = new FormGroup({
    start: new FormControl<Date | null>(this.minDate),
    end: new FormControl<Date | null>(null),
  });

  calculateTotalPrice() {
    const startDate = this.campaignOne.get('start')?.value;
    const endDate = this.campaignOne.get('end')?.value;
  
    if (startDate && endDate) {
      const differenceInTime = endDate.getTime() - startDate.getTime();
      
      // Ajouter 1 pour inclure le dernier jour
      this.nights = Math.max(
        Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1,
        1
      ); // Assurer qu'il y a au moins 1 nuit
    } else {
      this.nights = 1; // Si seule la date de début est définie, on considère 1 nuit par défaut
    }
  
    this.fee = ((this.nights * this.price_per_night) / 100) * 5;
    this.totalPrice = (this.nights * this.price_per_night) + this.fee;
  }
  
  
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
      this.reservationForm.get('endDate')?.setValue(date);
    }

    this.calculateTotalPrice();
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
    this.reservationForm.get('endDate')?.setValue(date);
    this.calculateTotalPrice();
  }
  
  // Filtrer les dates pour empêcher la sélection de dates passées ou réservées
  filterDates = (date: Date | null): boolean => {
    if (!date) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remettre l'heure à minuit

    // Vérifiez si la date est dans le passé ou si elle est réservée
    const isPast = date < today;
    const isBooked = this.bookedDate.some(
      (booked) =>
        booked.getFullYear() === date.getFullYear() &&
        booked.getMonth() === date.getMonth() &&
        booked.getDate() === date.getDate()
    );

    return !isPast && !isBooked; // N'autorise que les dates valides
  };

  // Fonction pour valider la plage de dates
  validateDateRange(): void {
    const startDate = this.campaignOne.get('start')?.value;
    const endDate = this.campaignOne.get('end')?.value;

    // Si les deux dates sont définies
    if (startDate && endDate) {
      if (endDate < startDate) {
        this.campaignOne.setErrors({ invalidDateRange: true });
      } else {
        this.campaignOne.setErrors(null); // Réinitialise les erreurs
      }
    }
    this.calculateTotalPrice(); // Calculer les nuits et le prix
  }

  // Fonction pour obtenir le tableau de 1 à `guests`
  getGuestsArray(): number[] {
    return Array.from({ length: this.guests }, (_, i) => i + 1);
  }

  async performBooking(): Promise<void> {
    if (this.userId) {
      
      if (this.reservationForm.valid) {
        const guestChoice = this.reservationForm.get('selectedGuests')?.value;
        const startChoice = this.reservationForm.get('startDate')?.value;
        const endChoice = this.reservationForm.get('endDate')?.value;
        const priceChoice = this.totalPrice;
        const nightsChoice = this.nights;

        if (guestChoice && startChoice && endChoice && priceChoice && nightsChoice) {
          const formattedStartDate = formatDate(startChoice, 'yyyy-MM-dd', 'en-US');
          const formattedEndDate = formatDate(endChoice, 'yyyy-MM-dd', 'en-US');

          const formData = new FormData();
          formData.append('guests', guestChoice.toString());
          formData.append('start_date', formattedStartDate);
          formData.append('end_date', formattedEndDate);
          formData.append('number_of_nights', nightsChoice.toString());
          formData.append('total_price', priceChoice.toString());
          
          try {
            const response = await this.apiService.onPerformingBooking(this.id,formData)
          } catch (error) {
            console.log('Error', error);
          }
        }
      }
    } else {
      this.modalService.open('Log in', LoginModalComponent);  // Passez le composant ici
    }
  }
}
