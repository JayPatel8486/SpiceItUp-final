import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerDialogComponent } from './view-customer-dialog.component';

describe('ViewCustomerDialogComponent', () => {
  let component: ViewCustomerDialogComponent;
  let fixture: ComponentFixture<ViewCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
