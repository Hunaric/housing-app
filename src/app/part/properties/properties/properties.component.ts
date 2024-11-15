import { Component } from '@angular/core';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [ItemsComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {

}
