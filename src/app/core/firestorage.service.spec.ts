import { TestBed } from '@angular/core/testing';

import { FirestorageService } from './firestorage.service';

describe('FiretorageService', () => {
  let service: FirestorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
