import { Component } from '@angular/core';
import { ReservationSidebarComponent } from '../reservation-sidebar/reservation-sidebar.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReservationSidebarComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

}
