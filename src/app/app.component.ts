import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './body/navbar/navbar.component';
import { PagesComponent } from './part/pages/pages.component';
import { ModalComponent } from './part/modal/modal.component';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, RouterModule, ModalComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'housing';
}
