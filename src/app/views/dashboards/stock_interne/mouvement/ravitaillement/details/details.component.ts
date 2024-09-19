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

  idRav !: string;
  ravDetails: RavDetailsList[] = []
  ravDetailsAdded: RavDetailsList[] = []
  initialRavDetails : RavDetailsList[] = [];
  totalMount : Number = 0;

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
        this.initialRavDetails = response.reulstat;
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
      { key : 'id' , value : this.idRav},
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

  AddItemToParent(prod : ProduitList) {
    const itemExists = this.ravDetails.some((item) => item.id_produit == prod.id);
    if (!itemExists) {
      this.ravDetails.push({
        id_ravitaillement : this.idRav ,
        id_produit : prod.id,
        prod_image : prod.photo,
        prod_name : prod.nom,
        pu_achat : prod.prixachat,
        pu_vente : prod.prixvente,
        qt_ajouter : 0,
        montant : 0,
      });
    }
  }

  removeItem(id: string , type : string) {
    if (type == 'added') {
      this.ravDetailService.deleteDetails(id).subscribe({
        next : (response : ApiResponse )=> {
          console.log(response);
          this.ravDetailsAdded = this.ravDetailsAdded.filter((data) => data.id !== id);
          this.getListDetails();
          this.getListProdNotDetails();
        },
        error : (err : HttpErrorResponse) => {
          console.log(err);
        }
      })
    }else if(type == 'new') {
      this.ravDetails = this.ravDetails.filter((data) => data.id_produit !== id);
    }
    this.filterData();
  }

  onQuantityUpdate(event: { id: string, quantity: number , type : string }) {
    
    const { id, quantity , type } = event;

    if (type =='added') {
      const updatedOrderDataAdded = this.ravDetailsAdded.map(order => {
        if (order.id_produit === id) {
          return { ...order, qt_ajouter : quantity, montant : order.pu_achat * quantity };
        }
        return order;
      });
      this.ravDetailsAdded = updatedOrderDataAdded;  

    }else if (type == 'new') {
      const updatedOrderData = this.ravDetails.map(order => {
        if (order.id_produit === id) {
          return { ...order, qt_ajouter : quantity, montant : order.pu_achat * quantity };
        }
        return order;
      });
      this.ravDetails = updatedOrderData; 
    }
    
    
  }

  onUpdateSelPrice(event: { id: string, priceSel: number , type : string }) {
    const { id, priceSel , type } = event;

    if (type =='added') {   
      const updatedOrderDataAdded = this.ravDetailsAdded.map(order => {
        if (order.id_produit === id) {
          return { ...order, pu_vente : priceSel };
        }
        return order;
      });
      this.ravDetailsAdded = updatedOrderDataAdded; 
    }else if (type == 'new') {
      const updatedOrderData = this.ravDetails.map(order => {
        if (order.id_produit === id) {
          return { ...order, pu_vente : priceSel };
        }
        return order;
      });
      this.ravDetails = updatedOrderData; 
    }
  }

  onUpdatePurchasePrice(event: { id: string, pricePurchase: number , type : string }) {
    const { id, pricePurchase , type } = event;

    if (type =='added') {   
      const updatedOrderDataAdded = this.ravDetailsAdded.map(order => {
        if (order.id_produit === id) {
          return { ...order, pu_achat : pricePurchase , montant : (pricePurchase * order.qt_ajouter) };
        }
        return order;
      });
      this.ravDetailsAdded = updatedOrderDataAdded; 
    }else if (type == 'new') {
      const updatedOrderData = this.ravDetails.map(order => {
        if (order.id_produit === id) {
          return { ...order, pu_achat : pricePurchase , montant : (pricePurchase * order.qt_ajouter) };
        }
        return order;
      });
      this.ravDetails = updatedOrderData; 
    }
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

  submitClicked( event : { dataIns : RavDetailsList[] , dataUpt : RavDetailsList[] }) {
    const { dataIns, dataUpt } = event;
    const dataAddedModified =  this.getModifiedRavDetails(dataUpt);

    if (dataIns.length> 0) {
      this.ravDetailService.addMultipleDetails(dataIns).subscribe({
        next : (response : ApiResponse) =>{
          this.ravDetails = [];
          this.getListDetails();
          this.getListProdNotDetails();
        },
        error : (err : HttpErrorResponse) => {
          console.log(err , " ERR INSERT RAV");
        }
      })
    }

    if (dataAddedModified.length> 0) {
      console.log(dataAddedModified);
        this.ravDetailService.editMultipleDetails(this.idRav , dataAddedModified).subscribe({
          next : (response : ApiResponse) =>{
            this.getListDetails();
          },
          error : (err : HttpErrorResponse) => {
            console.log(err , " ERR EDIT RAV");
          }
        })
    }
  }

  getModifiedRavDetails(datasAdded : RavDetailsList[]): RavDetailsList[] {
    return datasAdded.filter((addedDetail: RavDetailsList) => {
      const initialDetail = this.initialRavDetails.find((initDetail: RavDetailsList) => initDetail.id_produit === addedDetail.id_produit);
      return initialDetail ? !this.ravDetailService.compareRavDetails(addedDetail, initialDetail) : true;
    });
  }

  onValidateRav() {
    this.ravDetailService.validDetails(this.idRav).subscribe({
      next : (response : ApiResponse) =>{
          this.getRavitaillement(this.idRav);
      },
      error : (err : HttpErrorResponse) => {
        console.log(err , " ERR EDIT RAV");
      }
    })
  }

}
