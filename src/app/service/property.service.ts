import { Injectable, signal } from '@angular/core';
import { Property } from '../interfaces/properties';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  selectedProperty = signal<Property | null>(null);

  setSelectedProperty(property: Property) {
    this.selectedProperty.set(property);
  }
}
