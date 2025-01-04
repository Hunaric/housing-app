import { Component, inject } from '@angular/core';
import { ReservationSidebarComponent } from '../reservation-sidebar/reservation-sidebar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { PropertyDetail } from '../../../interfaces/properties';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-details',
    imports: [ReservationSidebarComponent, RouterModule, CommonModule],
    templateUrl: './details.component.html',
    styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  apiService = inject(ApiService);
  property: PropertyDetail | undefined;

  constructor() {
    const propertyId = String(this.route.snapshot.params['id']);

    this.apiService.getPropertyDetail(propertyId).then((property) => {
      // Ajouter l'image principale dans les miniatures
      if (property) {
        property.additionnal_images = [
          { image_url: property.image_url }, // Ajouter l'image principale
          ...(property.additionnal_images || []), // Conserver les miniatures existantes
        ];
      }
      this.property = property;
    });
  }

/*
  constructor() {
    this.loadPropertyDetails();
  }

  async loadPropertyDetails() {
    const propertyId = String(this.route.snapshot.params['id']);
  
    try {
      const property = await this.apiService.getPropertyDetail(propertyId);
      if (!property) throw new Error('Propriété introuvable');
  
      this.property = property;
  
      // Initialiser l'image principale
      this.mainImage = property.image_url || null;
  
      console.log('Propriété chargée :', this.property);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de la propriété :', error);
      this.property = undefined; // Assurez-vous que property est toujours cohérent
    }
  }
    */
  
  // Fonction pour changer l'image principale
  changeMainImage(imageUrl: string) {
    if (this.property) {
      this.property.image_url = imageUrl;
    }
  }

}
