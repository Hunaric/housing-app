import { Component, INJECTOR, Input, signal, WritableSignal } from '@angular/core';
import {  PropertyDetail } from '../../../interfaces/properties';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reservation-sidebar',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, MatInputModule],
  templateUrl: './reservation-sidebar.component.html',
  styleUrl: './reservation-sidebar.component.css'
})
export class ReservationSidebarComponent {
  @Input() id!: string;
  @Input() guests!: number;
  @Input() price_per_night!: number;

  dateRange: {startDate: Date | null, endDate: Date | null } = { startDate: new Date(), endDate: new Date()};
  userId: string | null = localStorage.getItem('userId');
  bookedDates: Date[] = [];
  fee: number = 0;
  nights: number= 1;
  totalPrice: number = 1;
  guestsPick: number = 1;
  guestsRange: number[] = [];
  
   // Fonction pour générer un tableau de 1 à `guests`
   getGuestsArray(): number[] {
    return Array.from({ length: this.guests }, (_, i) => i + 1);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const newStartDate = event.value;
    const newEndDate = newStartDate ? new Date(newStartDate) : new Date();

    if (newEndDate <= newStartDate!) {
      newEndDate.setDate(newStartDate!.getDate() + 1);
    }

    this.dateRange = {
      startDate: newStartDate,
      endDate: newEndDate
    };

    // this.calculateTotalPrice();
  }

} 
