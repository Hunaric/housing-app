import { Component, input, signal } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Properties, Property } from '../../../interfaces/properties';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from '../items/items.component';
type PropertyWithFavorite = Property & { isFavorited: boolean};

@Component({
  selector: 'app-favorited',
  imports: [CommonModule, ItemsComponent],
  templateUrl: './favorited.component.html',
  styleUrl: './favorited.component.css'
})
export class FavoritedComponent {

  userId: string | null = localStorage.getItem('userId');
  property: PropertyWithFavorite[] = [] ;

  gridClasses = signal('grid grid-cols-1 md:grid-cols-3 gap-6');

  constructor(private apiService: ApiService) {
    this.loadProperties({ is_favorite: 'true' });
    console.log('props:', this.property); 
  }

    loadProperties(filters: { is_favorite?: string, [key: string]: any } = {}) {
      this.apiService.getAllHouses(filters)
        .then((properties: Properties) => {
          console.log('Properties received:', properties);
          this.property = properties.data.map(property => ({
            ...property,
            isFavorited:this.userId ? property.favorited.includes(this.userId) : false
          })
          );
        })
        .catch((error) => {
          console.error('Error fetching properties:', error);
        });
    }
}
