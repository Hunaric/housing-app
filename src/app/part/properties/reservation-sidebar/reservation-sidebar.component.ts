import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-reservation-sidebar',
    providers: [provideNativeDateAdapter()],
    imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './reservation-sidebar.component.html',
    animations: [
      trigger('transitionMessages', [
        state('void', style({ opacity: 0 })),
        state('*', style({ opacity: 1 })),
        transition(':enter', [
          animate('300ms ease-in')
        ]),
        transition(':leave', [
          animate('300ms ease-out')
        ])
      ])
    ],
    styleUrls: ['./reservation-sidebar.component.css']
})
export class ReservationSidebarComponent {
  @Input() id!: string;
  @Input() guests!: number;
  @Input() price_per_night!: number;

  // Formulaire pour la sélection des dates
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(2023, 9, 13)),
    end: new FormControl(new Date(2023, 9, 16)),
  });

  // Variables pour gérer les dates et le calcul du prix
  totalPrice: number = 0;
  nights: number = 1;

  // Fonction pour calculer le nombre de nuits et mettre à jour le prix total
  calculateTotalPrice() {
    const startDate = this.campaignOne.get('start')?.value;
    const endDate = this.campaignOne.get('end')?.value;

    if (startDate && endDate) {
      const differenceInTime = endDate.getTime() - startDate.getTime();
      this.nights = Math.max(Math.ceil(differenceInTime / (1000 * 3600 * 24)), 1);
    } else {
      this.nights = 1;
    }

    this.totalPrice = this.nights * this.price_per_night;
  }

  // Fonction appelée lorsque la date est sélectionnée
  onDateSelected(date: Date | null) {
    if (!date) return;

    const startDate = this.campaignOne.get('start')?.value;
    const endDate = this.campaignOne.get('end')?.value;

    if (!startDate || (startDate && endDate)) {
      this.campaignOne.get('start')?.setValue(date);
      this.campaignOne.get('end')?.setValue(null);
    } else {
      if (startDate && date < startDate) {
        alert("La date de fin ne peut pas être antérieure à la date de début.");
        return;
      }
      this.campaignOne.get('end')?.setValue(date);
    }

    this.calculateTotalPrice();
  }

  // Classe CSS pour le calendrier en fonction des dates sélectionnées
  dateClass = (date: Date) => {
    const startDate = this.campaignOne.get('start')?.value;
    const endDate = this.campaignOne.get('end')?.value;

    if (this.isSameDay(date, startDate)) {
      return 'start-date';
    } else if (this.isSameDay(date, endDate)) {
      return 'end-date';
    } else if (startDate && endDate && date > startDate && date < endDate) {
      return 'range-date';
    }
    return '';
  };

  // Vérifier si deux dates sont identiques (jour, mois, année)
  isSameDay(date1: Date | null | undefined, date2: Date | null | undefined): boolean {
    if (!date1 || !date2) {
      return false;
    }
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  // Fonction pour obtenir le tableau de 1 à `guests`
  getGuestsArray(): number[] {
    return Array.from({ length: this.guests }, (_, i) => i + 1);
  }
}