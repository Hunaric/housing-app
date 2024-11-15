import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSidebarComponent } from './reservation-sidebar.component';

describe('ReservationSidebarComponent', () => {
  let component: ReservationSidebarComponent;
  let fixture: ComponentFixture<ReservationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
