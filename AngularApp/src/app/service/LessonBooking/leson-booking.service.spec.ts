import { TestBed } from '@angular/core/testing';

import { LesonBookingService } from './leson-booking.service';

describe('LesonBookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LesonBookingService = TestBed.get(LesonBookingService);
    expect(service).toBeTruthy();
  });
});
