import { Component } from '@angular/core';
import { PropertiesComponent } from '../../properties/properties/properties.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-landlord',
    imports: [PropertiesComponent, CommonModule],
    templateUrl: './landlord.component.html',
    styleUrl: './landlord.component.css'
})
export class LandlordComponent {

}
