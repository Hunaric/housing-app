import { Component, signal } from '@angular/core';
import { PropertiesComponent } from '../properties/properties.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-myproperties',
    imports: [PropertiesComponent, CommonModule],
    templateUrl: './myproperties.component.html',
    styleUrl: './myproperties.component.css'
})
export class MypropertiesComponent {
  gridClasses = signal('grid grid-cols-1 md:grid-cols-3 gap-6');
  userId: string | null = localStorage.getItem('userId');

  get isUserLoggedIn(): boolean {
    return this.userId !== null && this.userId !== ''; // Vérifier que l'utilisateur est bien connecté
  }

  get landlordId(): string | undefined {
    // Si l'utilisateur n'est pas connecté, renvoyer undefined
    return this.userId ?? undefined;
  }
}
