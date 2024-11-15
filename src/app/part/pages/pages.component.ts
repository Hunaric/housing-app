import { Component } from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { PropertiesComponent } from '../properties/properties/properties.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CategoriesComponent, PropertiesComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

}
