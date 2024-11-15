import { Routes } from '@angular/router';
import { PagesComponent } from './part/pages/pages.component';
import { DetailsComponent } from './part/properties/details/details.component';

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
    }
];
