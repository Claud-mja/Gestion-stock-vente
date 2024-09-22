import { Component, EventEmitter, Input, Output } from '@angular/core'
import { currency, currentYear } from '@/app/common/constants'
import { CommonModule } from '@angular/common';
import { IventaireUpdateType } from '../../data';
import { ProductListType } from '../../productlist.interface';
import { environment } from '@/environments/environment.development';
import { InvDetailInfo, InvDetailList } from '@/app/core/models/inventaireDetails.model';
import { InventaireList } from '@/app/core/models/inventaire.model';

@Component({
  selector: 'order-list',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './order-list.component.css',
  templateUrl: './order-list.component.html',
})

export class OrderListComponent {
  @Input() orderData: InvDetailList[] = [];
  @Input() orderDataAdded: InvDetailList[] = [];
  @Input() invInfo: InventaireList | undefined;
  @Input() openModal!: () => void;
  @Input() removeItem!: (id: string , type : string) => void;
  @Output() updateQuantity: EventEmitter<{ id: string, quantity: number , type : string }> = new EventEmitter();
  @Output() updateQuantityAdded: EventEmitter<{ id: string, quantity: number , type : string }> = new EventEmitter();
  @Output() updatePurchasePrice: EventEmitter<{ id: string, pricePurchase: number , type : string }> = new EventEmitter();
  @Output() updateSelPrice: EventEmitter<{ id: string, priceSel: number , type : string }> = new EventEmitter();
  @Output() submitClicked = new EventEmitter<{ dataIns : InvDetailList[] }>();
  @Output() validClicked = new EventEmitter<void>();

  currency = currency
  currentYear = currentYear;

  public img_url = environment.baseUrlImg+'/produit';

  triggerOpenModal() {
    if (this.openModal) {
      this.openModal();
    }
  }

  handleDeleteItem(id: string , type  : string) {
    if (this.removeItem) {
      this.removeItem(id , type);
    }
  }

  handleQuantityChange(id : string, event : Event , type : string) {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = Number(inputElement.value);
    this.updateQuantity.emit({ id, quantity: newQuantity , type });
  }

  handlePurchasePriceChange(id : string, event : Event , type : string) {
    const inputElement = event.target as HTMLInputElement;
    const newPurchasePrice= Number(inputElement.value);
    this.updatePurchasePrice.emit({ id , pricePurchase : newPurchasePrice , type })
  }
  
  handleSelPriceChange(id : string , event : Event , type : string) {
    const inputElement = event.target as HTMLInputElement;
    const newSelPrice= Number(inputElement.value);
    this.updateSelPrice.emit({ id , priceSel : newSelPrice , type })
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/no-image.png';
  }

  onSubmit(){
    this.submitClicked.emit({ dataIns : this.orderData });
  }

  onValid() {
    this.validClicked.emit();
  }
}
