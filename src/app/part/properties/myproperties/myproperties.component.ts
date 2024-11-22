import { Component, signal } from '@angular/core';
import { PropertiesComponent } from '../properties/properties.component';

@Component({
  selector: 'app-myproperties',
  standalone: true,
  imports: [PropertiesComponent],
  templateUrl: './myproperties.component.html',
  styleUrl: './myproperties.component.css'
})
export class MypropertiesComponent {
  gridClasses = 'grid grid-cols-1 md:grid-cols-3 gap-6';

}
