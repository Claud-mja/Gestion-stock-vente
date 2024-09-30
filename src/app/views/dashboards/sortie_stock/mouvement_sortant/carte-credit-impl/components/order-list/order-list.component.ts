import { Component, EventEmitter, Input, Output } from '@angular/core'
import { currency, currentYear } from '@/app/common/constants'
import { ProductListType } from '../../productlist.interface';
import { CommonModule } from '@angular/common';
import { CarteUpdateType } from '../data';


@Component({
  selector: 'order-list',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './order-list.component.css',
  templateUrl: './order-list.component.html',
})

export class OrderListComponent {
  @Input() orderData: ProductListType[] = [];
  @Input() orderDataAjoute: ProductListType[] = [];
  @Input() infoCarte: CarteUpdateType | undefined;
  @Input() openModal!: () => void;
  @Input() removeItem!: (id: string, item: any) => void;
  @Output() updateQuantity: EventEmitter<{ id: string, quantityAdd: number }> = new EventEmitter();
  @Output() updateQuantityAdded: EventEmitter<{ id: string, quantity: number }> = new EventEmitter();
  @Output() updatePriceAdded: EventEmitter<{ id: string, price: number }> = new EventEmitter();
  currency = currency
  today = new Date()
  currentYear = currentYear

  triggerOpenModal() {
    if (this.openModal) {
      this.openModal();
    }
  }

  handleDeleteItem(id: string, item: any) {
    if (this.removeItem) {
      this.removeItem(id, item);
    }
  }

  handleQuantityChange(id: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = Number(inputElement.value);
    this.updateQuantity.emit({ id, quantityAdd: newQuantity });
  }
  handleQuantityChangeAdded(id: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = Number(inputElement.value);
    this.updateQuantityAdded.emit({ id, quantity: newQuantity });
  }

  handlePriceChangeAdded(id: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newPrice = Number(inputElement.value);
    this.updatePriceAdded.emit({ id, price: newPrice });
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/no-image.png';
  }
}
