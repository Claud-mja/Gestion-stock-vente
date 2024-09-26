import type { ChartOptions } from '@/app/common/apexchart.model'
import { Component, Input } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'ecommerce-categories',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './categories.component.html',
  styles: ``,
})
export class CategoriesComponent {
  @Input() categoryChart: Partial<ChartOptions> = {}
}
