import { Component, inject, computed, Input, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../../service/property.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';

@Component({
    selector: 'app-items',
    imports: [RouterModule, CommonModule],
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  @Input() id!: string;
  @Input() image_url!: string;
  @Input() title!: string;
  @Input() price_per_night!: number;
  @Input() isFavorite!: boolean ;
  @Output() favoriteToggle = new EventEmitter<boolean>();

  constructor(private apiService: ApiService) {
    console.log(this.id);
    
    // Correction de l'URL de l'image
    if (this.image_url) {
      this.image_url = this.image_url.replace(/\/\//g, '/'); // Remplacer les doubles slashes
    }
  }


  async toggleFavorite(event: MouseEvent) {
    event.stopPropagation();

    console.log('Property:', this.isFavorite);
    try {
      const response = await this.apiService.toggleFavorite(this.id);
      
      this.isFavorite = response.is_favorite;
      this.favoriteToggle.emit(this.isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }
}
