import { TestBed } from '@angular/core/testing';

import { PaperMarksServiceService } from './paper-marks-service.service';

describe('PaperMarksServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaperMarksServiceService = TestBed.get(PaperMarksServiceService);
    expect(service).toBeTruthy();
  });
});
