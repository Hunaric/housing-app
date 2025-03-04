import { Component } from '@angular/core';
import { ModalService, SuccessMessageService } from '../../../service/modal.service';

@Component({
    selector: 'app-success-message',
    template: `
    <div class="bg-green-600 w-full h-full py-4 px-4 rounded-xl">
      <div class="flex justify-center items-center gap-2 text-white">
        <i class="fa fa-check-circle"></i>  <!-- Icône de succès -->
        <p class="font-semibold">{{ message }}</p>  <!-- Message de succès -->
      </div>
      <!-- Barre de progression -->
      <div class="progress-bar-container">
        <div class="progress-bar" [style.width]="progressWidth + '%'"></div>
      </div>
    </div>
  `,
    styleUrls: ['./success-message.component.css'],
    standalone: false
})
export class SuccessMessageComponent {
  message: string = '';
  visible: boolean = false;
  private timeoutId: any;
  progressWidth: number = 100; // Initialiser la largeur de la barre à 100%

  constructor(
    private successMessageService: SuccessMessageService,
    private modalService: ModalService
  ) {
    // Abonnement direct au message de succès
    this.successMessageService.successMessage$.subscribe((message) => {
      if (message) {
        this.message = message;
        this.visible = true;

        // Réinitialiser la largeur de la barre
        this.progressWidth = 100;

        // Diminuer progressivement la largeur de la barre
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }

        let elapsedTime = 0;
        const totalTime = 3000; // Durée en millisecondes
        const interval = 100; // Intervalle de mise à jour (en ms)

        const updateProgress = setInterval(() => {
          elapsedTime += interval;
          this.progressWidth = 100 - (elapsedTime / totalTime) * 100; // Calculer la largeur restante

          if (elapsedTime >= totalTime) {
            clearInterval(updateProgress); // Arrêter l'intervalle lorsque le temps est écoulé
            // window.location.reload();
            this.modalService.close(); // Fermer le modal après 3 secondes
          }
        }, interval);
      }
    });
  }
}
