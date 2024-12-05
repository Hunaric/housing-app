import { Component, INJECTOR, Input, signal, WritableSignal } from '@angular/core';
import {  PropertyDetail } from '../../../interfaces/properties';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-sidebar.component.html',
  styleUrl: './reservation-sidebar.component.css'
})
export class ReservationSidebarComponent {
  @Input() id!: string;
  @Input() guests!: number;
  @Input() price_per_night!: number;
  
   // Fonction pour générer un tableau de 1 à `guests`
   getGuestsArray(): number[] {
    return Array.from({ length: this.guests }, (_, i) => i + 1);
  }
}
