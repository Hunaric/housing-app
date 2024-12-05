import { Component, inject, computed, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../../service/property.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent {
  @Input() id!: string;
  @Input() image_url!: string;
  @Input() title!: string;
  @Input() price_per_night!: number;

}
