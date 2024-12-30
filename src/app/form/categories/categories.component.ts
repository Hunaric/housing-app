import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { CategorySercive } from '../../service/modal.service';

@Component({
    selector: 'app-categories',
    imports: [CommonModule],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  constructor(private categoryService: CategorySercive) {}

  selectCategory(category: string) {
    this.categoryService.setCategory(category);
  }

  get category() {
    return this.categoryService.getCategory();
  }
  

}
