import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalsSimulationComponent } from './detals-simulation.component';

describe('DetalsSimulationComponent', () => {
  let component: DetalsSimulationComponent;
  let fixture: ComponentFixture<DetalsSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalsSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalsSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
