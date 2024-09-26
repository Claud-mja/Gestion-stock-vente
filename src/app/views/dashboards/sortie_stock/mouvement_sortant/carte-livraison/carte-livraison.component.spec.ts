import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CarteLivraisonComponent } from './carte-livraison.component'

describe('CarteLivraisonComponent', () => {
  let component: CarteLivraisonComponent
  let fixture: ComponentFixture<CarteLivraisonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteLivraisonComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CarteLivraisonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
