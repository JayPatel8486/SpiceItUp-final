import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTableBookingComponent } from './dialog-table-booking.component';

describe('DialogTableBookingComponent', () => {
  let component: DialogTableBookingComponent;
  let fixture: ComponentFixture<DialogTableBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTableBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTableBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
