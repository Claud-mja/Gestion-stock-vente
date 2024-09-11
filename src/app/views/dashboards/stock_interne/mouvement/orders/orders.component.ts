import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import type { Observable } from 'rxjs'
import { RavitaillementUpdateData, type RavitaillementUpdateType } from './data'
import { currency } from '@/app/common/constants'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styles: ``,
})
export class OrdersComponent {
  orderList = RavitaillementUpdateData
  currency = currency

  constructor(private router: Router) {}
  clickToNew(){
    this.router.navigate(['/dashboard/stock-interne/mouvement-stock/nouveau'])
  }

  deleteRavitaillement(id: string){
    alert("DELETE IT " + id)
  }
}
