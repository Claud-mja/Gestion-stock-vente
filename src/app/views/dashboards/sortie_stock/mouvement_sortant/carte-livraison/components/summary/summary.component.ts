import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, type OnInit } from '@angular/core'
import { RavitaillementProduct } from '../../data'
import { currency } from '@/app/common/constants'
import { ProductListType } from '../../productlist.interface';
import { RavitaillementUpdateType } from '../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-details-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styles: ``,
})
export class SummaryComponent implements OnChanges {
  @Input() orderData: ProductListType[] = [];
  @Input() infoRavitaillement: RavitaillementUpdateType | undefined;
  @Output() finalOrderData: EventEmitter<any> = new EventEmitter<any>();
  
  itemSubTotal: number = 0;
  subTotal: number = 0;
  total: number = 0;
  currency = currency;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderData']) {
      this.updateTotals();
    }
  }

  private updateTotals() {
    this.itemSubTotal = 0;
    this.orderData.forEach((order) => {
      this.itemSubTotal += order.total;
    });
    this.subTotal = this.itemSubTotal;
    this.total = this.subTotal;
    // if (this.infoRavitaillement) {
    //   this.infoRavitaillement.amount = this.total;
    // }
  }

  emitFinalOrderData() {
    this.finalOrderData.emit({
      'product': this.orderData,
      'inventaire': this.infoRavitaillement,
    });
  }
}
