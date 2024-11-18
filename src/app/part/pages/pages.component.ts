import { Component, signal } from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { PropertiesComponent } from '../properties/properties/properties.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CategoriesComponent, PropertiesComponent, CommonModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
  gridClasses = signal('grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6');
}
