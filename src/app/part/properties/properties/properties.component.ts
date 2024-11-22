import { Component, Input, signal } from '@angular/core';
import { ItemsComponent } from '../items/items.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';
import { Properties, Property } from '../../../interfaces/properties';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [ItemsComponent, CommonModule],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  // Définition du signal avec une valeur initiale vide
  property = signal<Property[]>([]);

  @Input() gridClasses!: string;

  constructor(private apiService: ApiService) {
    this.apiService
      .getAllHouses()
      .then((properties: Properties) => {
        console.log('Properties received:', properties);
        this.property.set(properties.data);  // Met à jour la valeur du signal
        console.log('Property array:', this.property()); // Log supplémentaire
        console.log(this.property().map(p => p.image_url));
      });
  }
}
