import { Component } from '@angular/core';
import { ReservationSidebarComponent } from '../reservation-sidebar/reservation-sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReservationSidebarComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

}
