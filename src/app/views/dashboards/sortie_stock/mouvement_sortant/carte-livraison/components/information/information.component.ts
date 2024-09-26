import { Component, Input, SimpleChanges } from '@angular/core'
import { OrderInfo } from '../../data'
import { currency } from '@/app/common/constants'
import { RavitaillementUpdateType } from '../data';
import { ProductListType } from '../../productlist.interface';

@Component({
  selector: 'order-details-information',
  standalone: true,
  imports: [],
  templateUrl: './information.component.html',
  styles: ``,
})
export class InformationComponent {
  @Input() orderData: ProductListType[] = [];
  @Input() infoRavitaillement: RavitaillementUpdateType | undefined;
  orderInfo = OrderInfo
  currency = currency
  total: number = 0

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderData']) {
      this.updateData();
    }
  }
  updateData(){
    this.total = 0
    this.orderData.forEach((order) => {
      this.total += order.total
    })
  }
}
