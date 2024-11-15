import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertieButtonComponent } from './add-propertie-button.component';

describe('AddPropertieButtonComponent', () => {
  let component: AddPropertieButtonComponent;
  let fixture: ComponentFixture<AddPropertieButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPropertieButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPropertieButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
