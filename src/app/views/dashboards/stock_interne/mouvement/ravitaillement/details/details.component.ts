import { ProduitList } from '@/app/core/models/produit.model';
import { Component, TemplateRef } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  idRav: string | undefined;
  orderData: ProduitList[] = []
  orderDataAjoute: ProduitList[] = []
  currency = currency
  orderDataAll = AllRavitaillementProduct
  ravitaillementDetaille: RavitaillementUpdateType | undefined;
  private modalService = inject(NgbModal)
  filteredData: ProduitList[] = [];
  paginatedData: ProduitList[] = [];
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
      this.orderDataAjoute = RavitaillementProductAjoute
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

  trackByIndex(index: number, item: ProduitList) {
    return index;
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options)
  }
}
