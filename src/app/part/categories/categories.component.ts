import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CategorySearchService } from '../../service/modal.service';

@Component({
    selector: 'app-categories',
    imports: [CommonModule],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css'
})
export class CategoriesComponent {
    constructor(private categoryService: CategorySearchService) {} // Injectez le service

    setCategory(category: string | null) {
        console.log('Category:', category);
        
        this.categoryService.setSelectedCategory(category); // Utilisez le service pour définir la catégorie
    }
}
