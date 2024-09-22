import { TestBed } from '@angular/core/testing';
import { InventaireDetailsService } from './inventaireDetails.service';


describe('InventaireService', () => {
  let service: InventaireDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventaireDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
