import { TestBed } from '@angular/core/testing';

import { RavitaillementDetailsService } from './ravitaillement-details.service';

describe('RavitaillementDetailsService', () => {
  let service: RavitaillementDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RavitaillementDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
