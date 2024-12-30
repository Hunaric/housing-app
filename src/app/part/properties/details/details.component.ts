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

    this.apiService.getPropertyDetail(propertyId).then(property => {
      this.property = property;
    })
    console.log(this.property); 
  }

  // Fonction pour changer l'image principale
  changeMainImage(imageUrl: string) {
    if (this.property) {
      this.property.image_url = imageUrl;
    }
  }

}
