import { Component } from '@angular/core';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';
import { UserNavComponent } from '../user-nav/user-nav.component';
import { AddPropertieButtonComponent } from '../add-propertie-button/add-propertie-button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchFiltersComponent, UserNavComponent, AddPropertieButtonComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
