import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CarteSimpleImplComponent } from './carte-simple-impl.component'

describe('CarteSimpleImplComponent', () => {
  let component: CarteSimpleImplComponent
  let fixture: ComponentFixture<CarteSimpleImplComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteSimpleImplComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CarteSimpleImplComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
