import { TestBed } from '@angular/core/testing';

import { FeedBackServiceService } from './feedback-service.service';

describe('StudentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedBackServiceService = TestBed.get(FeedBackServiceService);
    expect(service).toBeTruthy();
  });
});
