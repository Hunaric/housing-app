import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private modalState = new BehaviorSubject<{ isOpen: boolean, content: any, label: string }>({
    isOpen: false,
    content: null,
    label: '',
  });

  modalState$ = this.modalState.asObservable();

  open(label: string, content: any) {
    this.modalState.next({ isOpen: true, content, label });
  }

  close() {
    this.modalState.next({ isOpen: false, content: null, label: '' });
  }
}
