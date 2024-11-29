import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalState = new BehaviorSubject<{ isOpen: boolean, content: Type<any> | null, label: string }>({
    isOpen: false,
    content: null,
    label: '',
  });

  modalState$ = this.modalState.asObservable();

  open(label: string, content: Type<any>) {
    this.modalState.next({ isOpen: true, content, label });
  }

  close() {
    this.modalState.next({ isOpen: false, content: null, label: '' });
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