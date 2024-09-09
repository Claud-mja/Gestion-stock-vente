import { TestBed } from '@angular/core/testing';

import { InventaireDetailsService } from './inventaire-details.service';

describe('InventaireDetailsService', () => {
  let service: InventaireDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventaireDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
