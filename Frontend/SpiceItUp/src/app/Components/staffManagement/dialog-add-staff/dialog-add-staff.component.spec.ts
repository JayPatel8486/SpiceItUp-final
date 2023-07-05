import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddStaffComponent } from './dialog-add-staff.component';

describe('DialogAddStaffComponent', () => {
  let component: DialogAddStaffComponent;
  let fixture: ComponentFixture<DialogAddStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
