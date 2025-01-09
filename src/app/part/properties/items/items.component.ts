import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  imports: [RouterModule, CommonModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnChanges {
  @Input() id!: string;
  @Input() image_url!: string;
  @Input() title!: string;
  @Input() price_per_night!: number;
  @Input() favorited: string[] = [];
  @Output() favoriteToggle = new EventEmitter<boolean>();
  
  userId: string | null = localStorage.getItem('userId');
  isFavorite: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['favorited']) {
      // Vérifier si userId est défini avant de l'utiliser
      if (this.userId) {
        this.isFavorite = this.favorited.includes(this.userId);
      } else {
        this.isFavorite = false; // ou tout autre comportement souhaité
      }
      console.log('Favoris inital:', this.favorited);
      console.log('Favoris prop:', this.isFavorite);
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
