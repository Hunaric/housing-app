import { Routes } from '@angular/router';
import { PagesComponent } from './part/pages/pages.component';
import { DetailsComponent } from './part/properties/details/details.component';
import { LandlordComponent } from './part/landlord/landlord/landlord.component';
import { ReservationComponent } from './part/reservation/reservation/reservation.component';
import { MypropertiesComponent } from './part/properties/myproperties/myproperties.component';
import { InboxComponent } from './chat/inbox/inbox.component';
import { DetailsComponent as ChatDetailsComponents } from './chat/details/details.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        title: 'Home Page',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page'
    },
    {
        path: 'landlord/:id',
        component: LandlordComponent,
        title: 'Landlord Page',
    },
    {
        path: 'my-properties',
        component: MypropertiesComponent,
        title: 'My Properties Page'
    },
    {
        path: 'reservation',
        component: ReservationComponent,
        title: 'Reservation Page'
    },
    {
        path: 'inbox',
        component: InboxComponent,
        title: 'Inbox Page',
    },
    {
        path: 'inbox-details',
        component: ChatDetailsComponents,
        title: 'Conversation Page'
    },
];
