import { Component, inject, OnInit } from '@angular/core';
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
export class DetailsComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute);
  apiService = inject(ApiService);
  property: PropertyDetail | undefined;

  ngOnInit(): void {
    const propertyId = String(this.route.snapshot.params['id']);
    if (!propertyId) return; // Vérifier que l'ID est bien présent

    this.apiService.getPropertyDetail(propertyId).then((property) => {
      // Ajouter l'image principale dans les miniatures
      if (property) {
        property.additionnal_images = [
          { image_url: property.image_url }, // Ajouter l'image principale
          ...(property.additionnal_images || []), // Conserver les miniatures existantes
        ];
        console.log('prop:', property);
        
      }
      this.property = property;
    });
  }
  
  // Fonction pour changer l'image principale
  changeMainImage(imageUrl: string) {
    if (this.property) {
      this.property.image_url = imageUrl;
    }
  }

  formatLocation(location: string): string {
    if (!location) return 'Nothing about this';

    // Divide the string
    const parts = location.split('/');


  // Vérifier que la première partie existe et la laisser en majuscules
  let formatted = parts[0];

  // Parcourir les autres parties et les mettre en format "Titre"
  if (parts.length > 1) {
    formatted += ' - ' + parts.slice(1).map(part =>
      part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    ).join(' - ');
  }

  return formatted
  }

}
