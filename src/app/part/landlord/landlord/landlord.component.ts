import { Component, inject } from '@angular/core';
import { PropertiesComponent } from '../../properties/properties/properties.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Landlord } from '../../../interfaces/user';
import { ApiService } from '../../../service/api.service';
import { LoginModalComponent } from '../../modal-content/login-modal/login-modal.component';
import { ModalService } from '../../../service/modal.service';

@Component({
    selector: 'app-landlord',
    imports: [PropertiesComponent, CommonModule, RouterModule],
    templateUrl: './landlord.component.html',
    styleUrl: './landlord.component.css'
})
export class LandlordComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    landlord: Landlord | undefined;
    userId: string | null = localStorage.getItem('userId');
    conversationId: string | null = null;

    constructor(private apiService: ApiService, private modalService: ModalService, private router: Router) {
        const landlordId = String(this.route.snapshot.params['id']);

        apiService.getLandlordInfo(landlordId).then((landlord) => {
            this.landlord = landlord;
            console.log('landlord:', this.landlord);
        }); 
        
    }

    
    startConversation() {
        if (!this.userId) {
            this.openLoginModal();
            return;
        }
    
        const landlordId = this.route.snapshot.params['id'];
        if (!landlordId) {
            console.error("Landlord ID is undefined.");
            return;
        }
    
        this.apiService.getConversationWithLandlord(landlordId).then((conversation) => {
            if (conversation && conversation.conversation_id) {
                this.conversationId = conversation.conversation_id;
                this.router.navigate(['/inbox-details', this.conversationId]); // Rediriger après création
            } else {
                console.warn("Aucune conversation trouvée ou créée.");
            }
        }).catch(error => {
            console.error("Erreur lors du chargement de la conversation :", error);
        });
    }

    openLoginModal() { 
    this.modalService.open('Log in', LoginModalComponent);  // Passez le composant ici
    }
      
    
}
