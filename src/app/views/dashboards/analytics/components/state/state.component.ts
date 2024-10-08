import { Component, Input } from '@angular/core'
import { stateData } from '../../data'

@Component({
  selector: 'analytics-state',
  standalone: true,
  imports: [],
  templateUrl: './state.component.html',
  styles: ``,
})
export class StateComponent {
  @Input() stateData?: any;

  ngOnInit() {
    if (!this.stateData) {
      this.stateData = stateData;
    }
  }
}
