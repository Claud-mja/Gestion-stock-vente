import { ChangeDetectorRef, Component, inject, TemplateRef } from '@angular/core'
import { OrderListComponent } from './components/order-list/order-list.component'
import { BoughtComponent } from './components/bought/bought.component'
import { SummaryComponent } from './components/summary/summary.component'
import { InformationComponent } from './components/information/information.component'
import { AllCarteProduct, CarteProduct, CarteProductAjoute } from './data'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ProductListType } from './productlist.interface'
import { CarteUpdateType } from './components/data'
import { currency, currentYear } from '@/app/common/constants'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-carte-simple-impl',
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
  templateUrl: './carte-simple-impl.component.html',
  styleUrl: './carte-simple-impl.component.css',
})
export class CarteSimpleImplComponent {
  idRav: string | undefined;
  orderData: ProductListType[] = []
  orderDataAjoute: ProductListType[] = []
  currency = currency
  carteDetaille: CarteUpdateType | undefined;
  private modalService = inject(NgbModal)
  orderDataAll: ProductListType[] = []
  filteredData: ProductListType[] = [];
  paginatedData: ProductListType[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {
    this.orderDataAll = AllCarteProduct
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idRav = params['idRav'];
      this.orderData = CarteProduct
      this.orderDataAjoute = CarteProductAjoute
      // SERVICE TO CAL DETAIL carte
      this.carteDetaille = {
        order_id: this.idRav ?? '546987',
        rav_name: 'Bata Shoes',
        product_details: 'size-08 (Model' + currentYear + ')',
        order_date: '15/08/2023',
        fournisseur: 'UPI',
        status: 'Completed',
        amount: 390,
      }
      this.filterData();
      // SERVICE TO CAL DETAIL carte
    }, error => {
      this.router.navigate(['/']);
    });
  }

  ValidateData(updatedOrderData: any) {
    console.log("Liste #################################");
    console.log(this.orderDataAll);
    console.log("Ajouté #################################");
    console.log(updatedOrderData);
  }

  UpdateQuantiteAndQuantiteAdd() {
    this.orderDataAll = this.orderDataAll.map(data => {
      const quantityAdd = data.quantityAdd ?? 0;
      return {
        ...data,
        quantity: data.quantity - quantityAdd,
        quantityAdd: 0
      };
    });
  }

  handleQuantityChange(id: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newQuantityAdd = Number(inputElement.value);
    const order = this.orderDataAll.find(order => order.id === id);
    if (order && (order.quantity < newQuantityAdd || newQuantityAdd === 0)) {
      inputElement.classList.add('input-error');
    } else {
      inputElement.classList.remove('input-error');
    }
    this.onQuantityUpdate({ id, quantityAdd: newQuantityAdd });
  }

  AddItemToParent(id: number) {
    this.orderDataAll = this.orderDataAll.map((data) => {
      if (data.id === id && data.quantityAdd != null && data.quantityAdd != 0 && data.quantity >= data.quantityAdd) {
        this.orderData.push({
          ...data,
          total: data.price * data.quantityAdd
        });
        return {
          ...data,
          quantity: data.quantity - data.quantityAdd,
          quantityAdd: 0
        };
      }
      return data;
    });
    this.filterData();
  }

  removeItem(id: number, item: any) {
    const existingItemIndex = this.orderDataAll.findIndex((data) => data.id === item.id);
    if (existingItemIndex !== -1) {
      this.orderDataAll[existingItemIndex] = {
        ...this.orderDataAll[existingItemIndex],
        quantity: this.orderDataAll[existingItemIndex].quantity + item.quantityAdd,
        quantityAdd: 0
      };
    }
    const orderDataIndex = this.orderData.findIndex((data) => data.id === id && data === item);
    if (orderDataIndex !== -1) {
      this.orderData.splice(orderDataIndex, 1);
    }
    this.filterData();
  }

  onQuantityUpdate(event: { id: number, quantityAdd: number }) {
    const { id, quantityAdd } = event;
    const updatedOrderData = this.orderDataAll.map(order => {
      if (order.id === id) {
        return {
          ...order,
          quantityAdd,
        };
      }
      return order;
    });
    this.orderDataAll = updatedOrderData;
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
      this.filteredData = [...this.orderDataAll.filter(data => data.quantity > 0)];
    }
    this.orderData = this.orderData.filter(data => data.quantity > 0);
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
