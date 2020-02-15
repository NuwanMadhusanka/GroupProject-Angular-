import { TestBed } from '@angular/core/testing';

import { StudentPaperServiceService } from './student-paper-service.service';

describe('StudentPaperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentPaperServiceService = TestBed.get(StudentPaperServiceService);
    expect(service).toBeTruthy();
  });
});
