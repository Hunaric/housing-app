import { Component, Input } from '@angular/core';
import { ItemsComponent } from '../items/items.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [ItemsComponent, CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  @Input() gridClasses: string = 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6';
}
