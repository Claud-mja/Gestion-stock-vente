import { Component, EventEmitter, Input, Output } from '@angular/core'
import { currency, currentYear } from '@/app/common/constants'
import { ProductListType } from '../../productlist.interface';
import { CommonModule } from '@angular/common';
import { RavitaillementUpdateType } from '../../../orders/data';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultSimulation, SimulationResult } from '../../data';

@Component({
  selector: 'order-list',
  standalone: true,
  imports: [CommonModule , FormsModule , NgbAccordionModule],
  styleUrl: './order-list.component.css',
  templateUrl: './order-list.component.html',
})

export class OrderListComponent  {
  @Input() orderData: ProductListType[] = [];
  @Input() orderDataAjoute: ProductListType[] = [];
  // @Input() simulationResult: SimulationResult[] = [];
  @Input() infoRavitaillement: RavitaillementUpdateType | undefined;
  @Input() openModal!: () => void;
  @Input() removeItem!: (id: string) => void;
  @Output() updateQuantity: EventEmitter<{ id: string, quantity: number }> = new EventEmitter();
  @Output() updateQuantityAdded: EventEmitter<{ id: string, quantity: number }> = new EventEmitter();
  @Output() updatePriceAdded: EventEmitter<{ id: string, price: number }> = new EventEmitter();
  currency = currency
  currentYear = currentYear

  typeSimulation = 'Seuil';
  resultSimulation : SimulationResult[];

  constructor(){
    
    this.resultSimulation=ResultSimulation
   // Boucle à travers la liste des fournisseurs et leurs produits

  }

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
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = Number(inputElement.value);
    this.updateQuantity.emit({ id, quantity: newQuantity });
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

  showVal(data : any) {
    console.log(data);
    
  } 
}
