import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, type OnInit } from '@angular/core'
import { CarteProduct } from '../../data'
import { currency } from '@/app/common/constants'
import { ProductListType } from '../../productlist.interface';
import { CarteUpdateType } from '../data';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'order-details-summary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './summary.component.html',
  styles: ``,
})
export class SummaryComponent implements OnChanges {
  @Input() orderData: ProductListType[] = [];
  @Input() infoCarte: CarteUpdateType | undefined;
  @Output() finalOrderData: EventEmitter<any> = new EventEmitter<any>();
  
  itemSubTotal: number = 0;
  subTotal: number = 0;
  total: number = 0;
  currency = currency;
  typePayement = 'Cash';
  typePanier = 'Simple';
  client = 'Client 1';
  paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Paypal'];
  clientMethods = ['Client 1', 'Client 2', 'Client 3'];
  paniers = ['Simple' , 'Special'];

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
  }

  emitFinalOrderData() {
    this.finalOrderData.emit({
      'product': this.orderData,
      'typePayement': this.typePayement
    });
  }

  
}
