import { Component, inject, TemplateRef } from '@angular/core';
import { OrderListComponent } from './components/order-list/order-list.component';
import { BoughtComponent } from './components/bought/bought.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListType } from './productlist.interface';
import { currency, currentYear } from '@/app/common/constants';
import { AllInventaireProduct, InventaireProduct, InventaireProductAjoute } from './data';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IventaireUpdateType } from './data';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-inventaire-details',
  standalone: true,
  imports: [
    OrderListComponent,
    BoughtComponent,
    SummaryComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './inventaire-details.component.html',
  styleUrl: './inventaire-details.component.scss'
})
export class InventaireDetailsComponent {
  idInv: string | undefined;
  orderData: ProductListType[] = []
  orderDataAjoute: ProductListType[] = []
  currency = currency
  orderDataAll = AllInventaireProduct
  inventaireDetaille: IventaireUpdateType | undefined;
  private modalService = inject(NgbModal)
  filteredData: ProductListType[] = [];
  paginatedData: ProductListType[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idInv = params['id'];
      this.orderData = InventaireProduct
      this.orderDataAjoute = InventaireProductAjoute
      // SERVICE TO CAL DETAIL RAVITAILLEMENT
      this.inventaireDetaille = {
        id: this.idInv ?? '0',
        titre: "Inventaire A",
        remarque: "Remarque A",
        responsable: "Responsable A",
        etat: "Completed",
      }
      this.filterData();
      // SERVICE TO CAL DETAIL RAVITAILLEMENT
    }, error => {
      this.router.navigate(['/']);
    });
  }

  handleFinalOrderData(updatedOrderData: any) {
    alert("Ok be")
    console.log('Final order data received:', updatedOrderData);
  }

  AddItemToParent(id: number) {
    const itemExists = this.orderData.some((item) => item.id === id);
    if (!itemExists) {
      this.orderDataAll.forEach((data) => {
        if (data.id === id) {
          this.orderData.push(data);
          this.orderData = this.orderData
        }
      });
    }
  }

  removeItem(id: number) {
    this.orderData = this.orderData.filter((data) => data.id !== id);
    this.filterData();
  }

  onQuantityUpdate(event: { id: number, quantity: number }) {
    const { id, quantity } = event;
    const updatedOrderData = this.orderData.map(order => {
      if (order.id === id) {
        return { ...order, quantity, total: order.price * quantity };
      }
      return order;
    });
    this.orderData = updatedOrderData;

  }

  onQuantityUpdateAdded(event: { id: number, quantity: number }) {
    const { id, quantity } = event;
    const updatedOrderDataAdded = this.orderDataAjoute.map(order => {
      if (order.id === id) {
        return { ...order, quantity, total: order.price * quantity };
      }
      return order;
    });
    this.orderDataAjoute = updatedOrderDataAdded;
  }

  onPriceUpdateAdded(event: { id: number, price: number }) {
    const { id, price } = event;
    const updatedOrderDataAdded = this.orderDataAjoute.map(order => {
      if (order.id === id) {
        return { ...order, price, total: price * order.quantity };
      }
      return order;
    });
    this.orderDataAjoute = updatedOrderDataAdded;
  }

  filterData() {
    if (this.searchTerm) {
      this.filteredData = this.orderDataAll.filter((data) =>
        data.product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = [...this.orderDataAll];
    }
    this.paginateData();
  }

  paginateData() {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Generate pages array
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  trackByIndex(index: number, item: ProductListType) {
    return index;
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options)
  }
}
