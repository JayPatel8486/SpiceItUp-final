import { TestBed } from '@angular/core/testing';

import { StaffroleGuard } from './staffrole.guard';

describe('StaffroleGuard', () => {
  let guard: StaffroleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StaffroleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
