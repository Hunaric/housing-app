import { Component, input, Input, OnChanges, computed, signal, SimpleChanges } from '@angular/core';
import { ItemsComponent } from '../items/items.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';
import { Properties, Property } from '../../../interfaces/properties';
type PropertyWithFavorite = Property & { isFavorited: boolean};

@Component({
    selector: 'app-properties',
    imports: [ItemsComponent, CommonModule],
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.css']
})

export class PropertiesComponent implements OnChanges{
  
  userId: string | null = localStorage.getItem('userId');
  // Définition du signal avec une valeur initiale vide
  property = signal<PropertyWithFavorite[]>([]);

  // @Input() gridClasses!: string;
  gridClasses = input<string>();
  // @Input() landlordId?: string;
  landlordId = input<string>();

  constructor(private apiService: ApiService) {
    this.loadProperties();
    console.log('props:', this.property);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['landlordId']) {
      this.loadProperties({landlord_id: this.landlordId()});      
    }
  }

  // loadProperties(filters: {landlord_id?: string, [key: string]: any} = {}) {
  //   this.apiService.getAllHouses(filters)
  //     .then((properties: Properties) => {
  //       console.log('Properties received:', properties);
  //       this.property.set(properties.data);
  //       console.log('Property array:', this.property());        
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching properties:', error);
  //     })
  // }

  loadProperties(filters: { landlord_id?: string, [key: string]: any } = {}) {
    this.apiService.getAllHouses(filters)
      .then((properties: Properties) => {
        console.log('Properties received:', properties);
        this.property.set(
          properties.data.map(property => ({
            ...property,
            isFavorited: this.userId ? property.favorited.includes(this.userId) : false
          })) 
        );
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
      });
  }
  


}
