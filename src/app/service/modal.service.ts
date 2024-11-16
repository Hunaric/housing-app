import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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