import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Input, Output, TemplateRef } from '@angular/core';
import { OrderListComponent } from './components/order-list/order-list.component';
import { currentYear } from '@/app/common/constants';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AllRavitaillementProduct, RavitaillementProduct, RavitaillementProductAjoute } from '../../order-details/data';
import { RavitaillementDetailsService } from '@/app/core/service/stck/ravitaillement-details.service';
import { ProduitService } from '@/app/core/service/stck/produit.service';
import { QueryParam } from '@/app/common/queryRequest';
import { ApiResponse } from '@/app/common/apiResponse';
import { Paginated } from '@/app/common/paginatrd.interface';
import { ProduitList } from '@/app/core/models/produit.model';
import { HttpErrorResponse } from '@angular/common/http';
import { RavDetailsList } from '@/app/core/models/ravitaillementDetails.model';
import { RavitaillementInfo } from '@/app/core/models/ravitaillement.model';
import { FormsModule } from '@angular/forms';
import { BoughtComponent } from './components/bought/bought.component';
import { SummaryComponent } from './components/summary/summary.component';
import { InformationComponent } from './components/information/information.component';
import { RavitaillementService } from '@/app/core/service/stck/ravitaillement.service';
import { environment } from '@/environments/environment.development';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule ,OrderListComponent , FormsModule, BoughtComponent,
    SummaryComponent,InformationComponent,],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  private productService = inject(ProduitService);
  private ravDetailService =  inject(RavitaillementDetailsService);
  private ravvitaillementService =  inject(RavitaillementService);
  private modalService = inject(NgbModal);

  public img_url = environment.baseUrlImg+'/produit';
  loadingProd :  any = {
    in : false,
    notIn : false,
  }

  idRav: string | undefined;
  ravDetails: RavDetailsList[] = []
  ravDetailsAdded: RavDetailsList[] = []

  ravProducts : ProduitList[] = []
  ravitaillementInfo : RavitaillementInfo | undefined;
  
  filteredData: ProduitList[] = [];
  paginatedData: ProduitList[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  currency: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idRav = params['id'];
      if (this.idRav) {
        this.getRavitaillement(this.idRav)
      }
      this.getListDetails();
      this.getListProdNotDetails();
    }, error => {
      this.router.navigate(['/']);
    });
  }

  getListDetails() {
    const queries : QueryParam[] = [
      { key : '$page[limit]' , value : this.itemsPerPage },
      { key : '$page[rang]' , value : this.currentPage },
      { key : '$query[id_ravitaillement][$eq]' , value : `'${this.idRav}'` },
    ]

    this.ravDetailService.getRavDetails(queries).subscribe({
      next : (response : Paginated<RavDetailsList>) => {
        console.log("Response : ", response);
        this.ravDetailsAdded =  response.reulstat;
      }, error : (error : HttpErrorResponse) =>{
        console.log("Error : ", error);
      }
    })
  }

  getRavitaillement(idRav : string){
    this.ravvitaillementService.getRav(idRav).subscribe({
      next : (response : RavitaillementInfo) => {
        console.log("Response : ", response);
        this.ravitaillementInfo =  response;
      }, error : (error : HttpErrorResponse) =>{
        console.log("Error : ", error);
      }
    })
  }

  getListProdNotDetails() {
    const page = {
      limit : this.itemsPerPage,
      rang : this.currentPage,
    }

    const queries : QueryParam[] = [
      { key : 'el' , value : 'rav' },
      { key : 'id' , value : this.idRav ? this.idRav : '' },
      // { key : 'cond' , value : cond },
      { key : 'page' , value : JSON.stringify(page) },
    ]

      this.productService.getProdsElement(queries).subscribe({
        next : (response : Paginated<ProduitList>) => {
          console.log("response : ", response);
          this.paginatedData = response.reulstat;
          this.ravProducts = response.reulstat;
        },
        error : (error) => {
          console.log(" error : ", error);
          
        }
      })

  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/no-image.png';
  }

  handleFinalOrderData(updatedOrderData: any) {
    alert("Ok be")
    console.log('Final order data received:', updatedOrderData);
  }

  AddItemToParent(prod : ProduitList) {
    const itemExists = this.ravDetails.some((item) => item.id_prod == prod.id);
    if (!itemExists) {
      // this.ravProducts.forEach((data) => {
      //   if (data.id === id) {
          this.ravDetails.push({
            id_prod : prod.id,
            prod_image : prod.photo,
            produit : prod.nom,
            pu_achat : prod.prixachat,
            pu_vente : prod.prixvente,
            qt_ajouter : 0,
            montant : 0,
          });
          // this.orderData = this.orderData
      //   }
      // });
    }
  }

  removeItem(id: string) {
    this.ravDetails = this.ravDetails.filter((data) => data.id_prod !== id);
    this.filterData();
  }

  onQuantityUpdate(event: { id: string, quantity: number }) {
    
    const { id, quantity } = event;
    const updatedOrderData = this.ravDetails.map(order => {
      if (order.id_prod === id) {
        return { ...order, quantity, montant : order.pu_achat * quantity };
      }
      return order;
    });
    console.log(" HUHUHU ", event);
    
    this.ravDetails = updatedOrderData; 
    
  }

  onQuantityUpdateAdded(event: { id: string, quantity: number }) {
    const { id, quantity } = event;
    const updatedOrderDataAdded = this.ravDetailsAdded.map(order => {
      if (order.id_prod === id) {
        return { ...order, quantity, montant : order.pu_achat * quantity };
      }
      return order;
    });
    this.ravDetailsAdded = updatedOrderDataAdded; 
  }

  onPriceUpdateAdded(event: { id: string, price: number }) {
    const { id, price } = event;
    const updatedOrderDataAdded = this.ravDetailsAdded.map(order => {
      if (order.id_prod === id) {
        return { ...order, price, montant : price * order.qt_ajouter };
      }
      return order;
    });
    this.ravDetailsAdded = updatedOrderDataAdded; 
  }

  filterData() {
    if (this.searchTerm) {
      this.filteredData = this.ravProducts.filter((data) =>
        data.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = [...this.ravProducts];
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

  trackByIndex(index: number, item: RavDetailsList) {
    return index;
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options)
  }

}
