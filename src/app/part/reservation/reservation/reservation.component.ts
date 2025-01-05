import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Reservation, ReservationList } from '../../../interfaces/properties';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-reservation',
    imports: [CommonModule, RouterModule],
    templateUrl: './reservation.component.html',
    styleUrl: './reservation.component.css'
})
export class ReservationComponent {
    reservations: Reservation[] = [];
    userId: string | null = localStorage.getItem('userId');

    constructor(private apiService: ApiService, private router: Router) {
        this.loadReservations();
    }

    loadReservations() {
        if (this.userId) {
            this.apiService.getUserReservations().then((reservations: Reservation[]) => {
                this.reservations = reservations;
                console.log('reservations list:', reservations);
                
            }).catch((error) => {
                console.error('Error during fetching data:', error);
            })
        } else {
            this.router.navigate(['']);
        }
    }
}
