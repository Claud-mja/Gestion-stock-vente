import { TestBed } from '@angular/core/testing';

import { UniterService } from './uniter.service';

describe('UniterService', () => {
  let service: UniterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
