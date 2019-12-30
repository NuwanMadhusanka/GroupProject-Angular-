import { TestBed } from '@angular/core/testing';

import { ComplainServiceService } from './complain-service.service';

describe('StudentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComplainServiceService = TestBed.get(ComplainServiceService);
    expect(service).toBeTruthy();
  });
});
