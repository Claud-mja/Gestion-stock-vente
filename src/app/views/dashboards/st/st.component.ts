import { Component } from '@angular/core';
import { StateComponent } from '../analytics/components/state/state.component';
import { StateType } from '../analytics/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-st',
  standalone: true,
  imports: [StateComponent, CommonModule],
  templateUrl: './st.component.html',
  styleUrl: './st.component.scss'
})
export class StComponent {
  stateDataCustom: StateType[] = [
    {
      title: 'Client',
      value: '24K',
      icon: 'iconoir-hexagon-dice',
      description: {
        percentage: '+10K',
        text: 'Ce mois',
        trend: 'positive',
      },
    },
    {
      title: 'Nombre de produit',
      value: '1K',
      icon: 'iconoir-view-grid',
      description: {
        percentage: '+10',
        text: "Aujourd'hui",
        trend: 'positive',
      },
    },
    {
      title: 'Ravitaillement',
      value: '300M Ar',
      icon: 'iconoir-compact-disc',
      description: {
        percentage: '',
        text: "Chiffre d'affaire",
        trend: 'positive',
      },
    }
  ]

}
