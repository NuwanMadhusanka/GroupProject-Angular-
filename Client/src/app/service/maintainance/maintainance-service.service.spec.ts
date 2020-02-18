import { TestBed } from '@angular/core/testing';

import { MaintainanceServiceService } from './maintainance-service.service';

describe('MaintainanceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintainanceServiceService = TestBed.get(MaintainanceServiceService);
    expect(service).toBeTruthy();
  });
});
