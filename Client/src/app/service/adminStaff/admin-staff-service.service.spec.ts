import { TestBed } from '@angular/core/testing';

import { AdminStaffServiceService } from './admin-staff-service.service';

describe('UserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminStaffServiceService = TestBed.get(AdminStaffServiceService);
    expect(service).toBeTruthy();
  });
});
