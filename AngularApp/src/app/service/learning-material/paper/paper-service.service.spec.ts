import { TestBed } from '@angular/core/testing';

import { PaperServiceService } from './pdf-service.service';

describe('PaperServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaperServiceService = TestBed.get(PaperServiceService);
    expect(service).toBeTruthy();
  });
});
