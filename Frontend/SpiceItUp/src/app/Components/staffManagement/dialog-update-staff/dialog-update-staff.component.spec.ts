import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateStaffComponent } from './dialog-update-staff.component';

describe('DialogUpdateStaffComponent', () => {
  let component: DialogUpdateStaffComponent;
  let fixture: ComponentFixture<DialogUpdateStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
