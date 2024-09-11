import { Component, EventEmitter, Input, Output } from '@angular/core'
import { currency, currentYear } from '@/app/common/constants'
import { ProductListType } from '../../productlist.interface';
import { CommonModule } from '@angular/common';
import { RavitaillementUpdateType } from '../../../orders/data';

@Component({
  selector: 'order-list',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './order-list.component.css',
  templateUrl: './order-list.component.html',
})

export class OrderListComponent {
  @Input() orderData: ProductListType[] = [];
  @Input() infoRavitaillement: RavitaillementUpdateType | undefined;
  @Input() openModal!: () => void;
  @Input() removeItem!: (id: number) => void;
  @Output() updateQuantity: EventEmitter<{ id: number, quantity: number }> = new EventEmitter();
  currency = currency
  currentYear = currentYear

  triggerOpenModal() {
    if (this.openModal) {
      this.openModal();
    }
  }

  handleDeleteItem(id: number) {
    if (this.removeItem) {
      this.removeItem(id);
    }
  }

  handleQuantityChange(id: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = Number(inputElement.value);
    this.updateQuantity.emit({ id, quantity: newQuantity });
  }
}
