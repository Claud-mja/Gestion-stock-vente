import { Component, EventEmitter, Input, Output } from '@angular/core'
import { currency, currentYear } from '@/app/common/constants'
import { CommonModule } from '@angular/common';
import { RavitaillementInfo } from '@/app/core/models/ravitaillement.model';
import { RavDetailsList } from '@/app/core/models/ravitaillementDetails.model';
import { environment } from '@/environments/environment.development';

@Component({
  selector: 'order-list',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './order-list.component.css',
  templateUrl: './order-list.component.html',
})

export class OrderListComponent {
  @Input() orderData: RavDetailsList[] = [];
  @Input() orderDataAdded: RavDetailsList[] = [];
  @Input() infoRavitaillement: RavitaillementInfo | undefined;
  @Input() openModal!: () => void;
  @Input() removeItem!: (id: string) => void;
  @Output() updateQuantity: EventEmitter<{ id: string, quantity: number }> = new EventEmitter();
  @Output() updateQuantityAdded: EventEmitter<{ id: string, quantity: number }> = new EventEmitter();
  @Output() updatePriceAdded: EventEmitter<{ id: string, price: number }> = new EventEmitter();
  currency = currency
  currentYear = currentYear

  public img_url = environment.baseUrlImg+'/produit';

  triggerOpenModal() {
    if (this.openModal) {
      this.openModal();
    }
  }

  handleDeleteItem(id: string) {
    if (this.removeItem) {
      this.removeItem(id);
    }
  }

  handleQuantityChange(id: string, event: Event) {
    console.log("QT ch", id , event);
    
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = Number(inputElement.value);
    this.updateQuantity.emit({ id, quantity: newQuantity });
  }

  handleQuantityChangeAdded(id: string, event: Event) {
    console.log("QT chAdd" , id , event);
    
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
