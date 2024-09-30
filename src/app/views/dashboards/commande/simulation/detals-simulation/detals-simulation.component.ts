import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductListType } from '../../../stock_interne/mouvement/order-details/productlist.interface';

@Component({
  selector: 'app-detals-simulation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './detals-simulation.component.html',
  styleUrl: './detals-simulation.component.scss'
})
export class DetalsSimulationComponent {
  orderData: ProductListType[] = [];
  orderDataAjoute: ProductListType[] = [];
}
