import { Component, inject, TemplateRef } from '@angular/core'
import { OrderListComponent } from './components/order-list/order-list.component'
import { BoughtComponent } from './components/bought/bought.component'
import { SummaryComponent } from './components/summary/summary.component'
import { InformationComponent } from './components/information/information.component'
import { AllRavitaillementProduct, RavitaillementProduct } from './data'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ProductListType } from './productlist.interface'
import { RavitaillementUpdateType } from '../orders/data'
import { currency, currentYear } from '@/app/common/constants'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    OrderListComponent,
    BoughtComponent,
    SummaryComponent,
    InformationComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './order-details.component.html',
  styles: ``,
})
export class OrderDetailsComponent {
  idRav: string | undefined;
  orderData: ProductListType[] = []
  currency = currency
  orderDataAll = AllRavitaillementProduct
  ravitaillementDetaille: RavitaillementUpdateType | undefined;
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
      this.idRav = params['idRav'];
      this.orderData = RavitaillementProduct
      // SERVICE TO CAL DETAIL RAVITAILLEMENT
      this.ravitaillementDetaille = {
        order_id: this.idRav ?? '546987',
        rav_name: 'Bata Shoes',
        product_details: 'size-08 (Model' + currentYear + ')',
        order_date: '15/08/2023',
        fournisseur: 'UPI',
        status: 'Completed',
        amount: 390,
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
    console.log(this.orderData);
    
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
