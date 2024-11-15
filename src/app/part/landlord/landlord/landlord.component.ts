import { Component } from '@angular/core';
import { PropertiesComponent } from '../../properties/properties/properties.component';

@Component({
  selector: 'app-landlord',
  standalone: true,
  imports: [PropertiesComponent],
  templateUrl: './landlord.component.html',
  styleUrl: './landlord.component.css'
})
export class LandlordComponent {

}
