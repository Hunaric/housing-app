import { Component, inject } from '@angular/core';
import { PropertiesComponent } from '../../properties/properties/properties.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Landlord } from '../../../interfaces/user';
import { ApiService } from '../../../service/api.service';

@Component({
    selector: 'app-landlord',
    imports: [PropertiesComponent, CommonModule],
    templateUrl: './landlord.component.html',
    styleUrl: './landlord.component.css'
})
export class LandlordComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    landlord: Landlord | undefined;

    constructor(private apiService: ApiService) {
        const landlordId = String(this.route.snapshot.params['id']);

        apiService.getLandlordInfo(landlordId).then((landlord) => {
            this.landlord = landlord;
            console.log('landlord:', this.landlord);
        })
        
    }
    
}
