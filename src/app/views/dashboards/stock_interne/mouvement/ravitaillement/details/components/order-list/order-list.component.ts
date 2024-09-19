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
  @Input() removeItem!: (id: string , type : string) => void;
  @Output() updateQuantity: EventEmitter<{ id: string, quantity: number , type : string }> = new EventEmitter();
  @Output() updateSelPrice: EventEmitter<{ id: string, priceSel : number , type : string }> = new EventEmitter();
  @Output() updatePurchasePrice: EventEmitter<{ id: string, pricePurchase : number  , type : string}> = new EventEmitter();
  @Output() submitClicked = new EventEmitter<{ dataIns : RavDetailsList[] , dataUpt : RavDetailsList[]}>();
  currency = currency
  currentYear = currentYear

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
    console.log(this.orderData , "Data to insert");
    console.log(this.orderDataAdded , "Data to update");

    const dataToIns: RavDetailsList[] = this.orderData.filter(
      (ravDet: RavDetailsList) => 
        ravDet.qt_ajouter > 0 && 
        ravDet.pu_achat > 0 && 
        ravDet.pu_vente > 0
    );
  
    // Afficher les données filtrées pour insertion
    console.log(dataToIns, "Filtered data to insert");
    
    const dataToUpdate : RavDetailsList[] = this.orderDataAdded.filter((ravDet : RavDetailsList) => ravDet.qt_ajouter > 0 && ravDet.pu_achat> 0 && ravDet.pu_vente > 0); ; 
    this.submitClicked.emit({ dataIns : dataToIns , dataUpt : dataToUpdate });
  }

}
