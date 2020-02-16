import { TestBed } from '@angular/core/testing';

import { PaperMarkServiceService } from './paper-mark-service.service';

describe('PaperMarkServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaperMarkServiceService = TestBed.get(PaperMarkServiceService);
    expect(service).toBeTruthy();
  });
});
