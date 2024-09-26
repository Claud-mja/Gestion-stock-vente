import { Component } from '@angular/core';
import { StateComponent } from '../analytics/components/state/state.component';
import { StateType } from '../analytics/data';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { ChartOptions } from '@/app/common/apexchart.model';

@Component({
  selector: 'app-st',
  standalone: true,
  imports: [StateComponent, CommonModule, CategoriesComponent],
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

  categoryChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Produits',
        data: [13, 11, 99, 80, 100, 48, 10, 60],
      },
    ],
    chart: {
      type: 'bar',
      height: 275,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: true,
        distributed: true,
        barHeight: '85%',
        isFunnel: true,
        isFunnel3d: false,
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex]
      },
      dropShadow: {
        enabled: false,
      },
      style: {
        colors: ['#22c55e'],
        fontWeight: 400,
        fontSize: '13px',
      },
    },
    xaxis: {
      categories: [
        'Mobile',
        'Men Fishion',
        'Women Fishion',
        'Beauty',
        'Health',
        'Sports',
        'Kids',
        'Music',
      ],
    },
    colors: [
      'rgba(34, 197, 94, 0.45)',
      'rgba(34, 197, 94, 0.4)',
      'rgba(34, 197, 94, 0.35)',
      'rgba(34, 197, 94, 0.3)',
      'rgba(34, 197, 94, 0.25)',
      'rgba(34, 197, 94, 0.2)',
      'rgba(34, 197, 94, 0.15)',
      'rgba(34, 197, 94, 0.1)',
    ],
    legend: {
      show: false,
    },
  }

}
