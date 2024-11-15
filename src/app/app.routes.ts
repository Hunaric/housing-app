import { Routes } from '@angular/router';
import { PagesComponent } from './part/pages/pages.component';
import { DetailsComponent } from './part/properties/details/details.component';
import { LandlordComponent } from './part/landlord/landlord/landlord.component';
import { ReservationComponent } from './part/reservation/reservation/reservation.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        title: 'Home Page',
    },
    {
        path: 'details',
        component: DetailsComponent,
        title: 'Details Page'
    },
    {
        path: 'landlord',
        component: LandlordComponent,
        title: 'Landlord Page'
    },
    {
        path: 'reservation',
        component: ReservationComponent,
        title: 'Reservation Page'
    },
];
