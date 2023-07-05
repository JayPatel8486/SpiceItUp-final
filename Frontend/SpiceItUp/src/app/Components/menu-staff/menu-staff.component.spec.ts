import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStaffComponent } from './menu-staff.component';

describe('MenuStaffComponent', () => {
  let component: MenuStaffComponent;
  let fixture: ComponentFixture<MenuStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
