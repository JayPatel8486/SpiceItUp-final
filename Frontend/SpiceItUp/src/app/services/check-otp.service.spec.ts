import { TestBed } from '@angular/core/testing';

import { CheckOtpService } from './check-otp.service';

describe('CheckOtpService', () => {
  let service: CheckOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
