import { Component, input, Input, OnChanges, computed, signal, SimpleChanges } from '@angular/core';
import { ItemsComponent } from '../items/items.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';
import { Properties, Property } from '../../../interfaces/properties';
import { SearchService } from '../../../service/modal.service';
type PropertyWithFavorite = Property & { isFavorited: boolean};

@Component({
    selector: 'app-properties',
    imports: [ItemsComponent, CommonModule],
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.css']
})

export class PropertiesComponent implements OnChanges{
  
  @Input() selectedCategory: string | null = null; // Propriété pour recevoir la catégorie sélectionnée

  userId: string | null = localStorage.getItem('userId');
  // Définition du signal avec une valeur initiale vide
  property = signal<PropertyWithFavorite[]>([]);

  // @Input() gridClasses!: string;
  gridClasses = input<string>();
  // @Input() landlordId?: string;
  landlordId = input<string>();

  constructor(private apiService: ApiService, private searchService: SearchService) {
    this.loadProperties();

    // Abonnez-vous aux changements de la requête de recherche
    this.searchService.searchQuery$.subscribe(query => {
      if (query) {
        this.loadProperties({
          landlord_id: this.landlordId(),
          // is_favorite: query.isFavorite, // Si vous avez un champ pour les favoris
          country: query.country,
          category: query.category,
          checkIn: query.checkIn,
          checkOut: query.checkOut,
          numBedrooms: query.bedrooms,
          numGuests: query.guests,
          numBathrooms: query.bathrooms,
        });
      }
    });
    console.log('props:', this.property);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['landlordId']) {
      this.loadProperties({landlord_id: this.landlordId()});      
    }
    if (changes['selectedCategory']) {
      this.loadProperties({ category: this.selectedCategory });// Rechargez les propriétés lorsque la catégorie change
    }
  }


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
