import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Properties, Property } from '../../../interfaces/properties';

@Component({
  selector: 'app-favorited',
  imports: [],
  templateUrl: './favorited.component.html',
  styleUrl: './favorited.component.css'
})
export class FavoritedComponent {

  userId: string | null = localStorage.getItem('userId');
  property!: Properties ;

  constructor(private apiService: ApiService) {
    // this.loadProperties();
    console.log('props:', this.property); 
  }

    // loadProperties(filters: { landlord_id?: string, [key: string]: any } = {}) {
    //   this.apiService.getAllHouses(filters)
    //     .then((properties: Properties) => {
    //       console.log('Properties received:', properties);
    //       this.property.set(
    //         properties.data.map(property => ({
    //           ...property,
    //           isFavorited: this.userId ? property.favorited.includes(this.userId) : false
    //         })) 
    //       );
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching properties:', error);
    //     });
    // }
}
