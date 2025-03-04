import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchQuery } from '../interfaces/search';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalState = new BehaviorSubject<{ isOpen: boolean, content: Type<any> | null, label: string, data?: any }>({
    isOpen: false,
    content: null,
    label: '',
    data: null,
  });

  modalState$ = this.modalState.asObservable();

  open(label: string, content: Type<any>, data?: any) {
    this.modalState.next({ isOpen: true, content, label, data });
  }

  close() {
    this.modalState.next({ isOpen: false, content: null, label: '', data: null });
  }
}

@Injectable({
  providedIn: 'root'
})
export class CategorySercive {
  private categorySignal = signal<string | null>(null);

  // Récupère la catégorie
  getCategory(): Signal<string | null> {
    return this.categorySignal;
  }

  // Met à jour la catégorie
  setCategory(category: string) {
    this.categorySignal.set(category);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}
  
  getLocations(): Observable<any[]> {
    return this.http.get<any[]>('json/benin_data.json');
  }
}

@Injectable({
  providedIn: 'root'
})
export class SuccessMessageService {
  private successMessageSubject = new BehaviorSubject<string>('');
  successMessage$ = this.successMessageSubject.asObservable();

  constructor() {}

  showSuccessMessage(message: string) {
    this.successMessageSubject.next(message);
  }
}


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<SearchQuery | null>(null);
  searchQuery$ = this.searchQuerySubject.asObservable();

  updateSearchQuery(query: SearchQuery) {
    this.searchQuerySubject.next(query);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CategorySearchService {
  private selectedCategorySubject = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  setSelectedCategory(category: string | null) {
    this.selectedCategorySubject.next(category);
  }
}