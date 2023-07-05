import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoDialogPaymentOptionComponent } from './co-dialog-payment-option.component';

describe('CoDialogPaymentOptionComponent', () => {
  let component: CoDialogPaymentOptionComponent;
  let fixture: ComponentFixture<CoDialogPaymentOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoDialogPaymentOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoDialogPaymentOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
