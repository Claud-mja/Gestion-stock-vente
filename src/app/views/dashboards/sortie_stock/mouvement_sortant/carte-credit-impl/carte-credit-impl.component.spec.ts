import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CarteCreditImplComponent } from './carte-credit-impl.component'

describe('CarteCreditImplComponent', () => {
  let component: CarteCreditImplComponent
  let fixture: ComponentFixture<CarteCreditImplComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteCreditImplComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CarteCreditImplComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
