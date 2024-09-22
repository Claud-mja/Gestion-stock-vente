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
import { QueryParam } from '@/app/common/queryRequest';
import { ProduitService } from '@/app/core/service/stck/produit.service';
import { ProduitList } from '@/app/core/models/produit.model';
import { Paginated } from '@/app/common/paginatrd.interface';
import { ApiResponse } from '@/app/common/apiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@/environments/environment.development';
import { InventaireDetailsService } from '@/app/core/service/stck/inventaireDetails.service';
import { InvDetailInfo, InvDetailList } from '@/app/core/models/inventaireDetails.model';
import { InventaireList } from '@/app/core/models/inventaire.model';
import { InventaireService } from '@/app/core/service/stck/inventaire.service';
import { switchMap, tap } from 'rxjs';

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
  private modalService = inject(NgbModal)
  private invDetailService = inject(InventaireDetailsService);
  private invService = inject(InventaireService);
  private prodService = inject(ProduitService);

  idInv !: string;
  invDetails: InvDetailList[] = []
  invDetailsAdded: InvDetailList[] = []
  initInvDetails: InvDetailList[] = []
  currency = currency;
  inventaireInfo: InventaireList | undefined;

  filteredData: ProduitList[] = [];
  paginatedData: ProduitList[] = [];
  invProducts : ProduitList[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  public img_url = environment.baseUrlImg+'/produit';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idInv = params['id'];

      if (this.idInv) {
        this.getInventaire(this.idInv);
      }
      
      this.getListProdNotDetails();
      this.getListDetails();
    }, error => {
      this.router.navigate(['/']);
    });
  }

  handleFinalOrderData(updatedOrderData: any) {
    alert("Ok be")
    console.log('Final order data received:', updatedOrderData);
  }

  getListDetails() {
    const queries : QueryParam[] = [
      { key : '$page[limit]' , value : this.itemsPerPage },
      { key : '$page[rang]' , value : this.currentPage },
      { key : '$query[id_inventaire][$eq]' , value : `'${this.idInv}'` },
    ]

    this.invDetailService.getInvDetails(queries).subscribe({
      next : (response : Paginated<InvDetailList>) => {
        console.log("Response : ", response);
        this.invDetailsAdded =  response.reulstat;
        this.initInvDetails = response.reulstat;
      }, error : (error : HttpErrorResponse) =>{
        console.log("Error : ", error);
      }
    })
  }

  getInventaire(id : string) {
    this.invService.getInv(id).subscribe({
      next : (response : InventaireList) => {
        console.log("Get inventaire",response);
        this.inventaireInfo = response;
      },
      error : (error : HttpErrorResponse) => {
        console.log("Error get infoINV : " , error);
      }
    })
  }

  getListProdNotDetails() {
    const page = {
      limit : this.itemsPerPage,
      rang : this.currentPage,
    }

    const queries : QueryParam[] = [
      { key : 'el' , value : 'inv' },
      { key : 'id' , value : this.idInv},
      { key : 'page' , value : JSON.stringify(page) },
    ]

      this.prodService.getProdsElement(queries).subscribe({
        next : (response : Paginated<ProduitList>) => {
          console.log("response : ", response);
          this.paginatedData = response.reulstat;
          this.invProducts = response.reulstat;
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
    const itemExists = this.invDetails.some((item) => item.id_produit == prod.id);
    if (!itemExists && this.idInv) {
      this.invDetails.push({
        id_inventaire : this.idInv ,
        id_produit : prod.id,
        prod_image : prod.photo,
        prod_name : prod.nom,
        pu_achat : prod.prixachat,
        pu_vente : prod.prixvente,
        qt_stock_virtuel : prod.qt_stock,
        qt_reelle : prod.qt_stock,
        qt_difference : 0,
      });
    }
  }

  removeItem(id: string , type : string) {
    if (type == 'added') {
      this.invDetailService.deleteDetails(id).subscribe({
        next : (response : ApiResponse )=> {
          console.log(response);
          this.invDetailsAdded = this.invDetailsAdded.filter((data) => data.id !== id);
          this.getListDetails();
          this.getListProdNotDetails();
        },
        error : (err : HttpErrorResponse) => {
          console.log(err);
        }
      })
    }else if(type == 'new') {
      this.invDetails = this.invDetails.filter((data) => data.id_produit !== id);
    }
    // this.filterData();
  }

  onQuantityUpdate(event: { id: string, quantity: number , type : string }) {
    
    const { id, quantity , type } = event;

    if (type =='added') {
      const updatedOrderDataAdded = this.invDetailsAdded.map(order => {
        if (order.id_produit === id) {
          return { ...order, qt_reelle : quantity, qt_difference : quantity - order.qt_stock_virtuel };
        }
        return order;
      });
      this.invDetailsAdded = updatedOrderDataAdded;  

    }else if (type == 'new') {
      const updatedOrderData = this.invDetails.map(order => {
        if (order.id_produit === id) {
          return { ...order, qt_reelle : quantity, qt_difference : quantity - order.qt_stock_virtuel };
        }
        return order;
      });
      this.invDetails = updatedOrderData; 
    }
    
    
  }

  filterData() {
    if (this.searchTerm) {
      this.filteredData = this.invProducts.filter((data) =>
        data.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = [...this.invProducts];
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

  getModifiedInvDetails(datasAdded : InvDetailList[]): InvDetailList[] {
    return datasAdded.filter((addedDetail: InvDetailList) => {
      const initialDetail = this.initInvDetails.find((initDetail: InvDetailList) => initDetail.id_produit === addedDetail.id_produit);
      return initialDetail ? !this.invDetailService.compareInvDetails(addedDetail, initialDetail) : true;
    });
  }

  submitClicked( event : { dataIns : InvDetailList[] }) {
    const { dataIns } = event;
  
    if (dataIns.length> 0) {
      this.invDetailService.addMultipleDetails(dataIns).subscribe({
        next : (response : ApiResponse) =>{
          this.invDetails = [];
          this.getListDetails();
          this.getListProdNotDetails();
        },
        error : (err : HttpErrorResponse) => {
          console.log(err , " ERR INSERT INV");
        }
      })
    }
  }

  onValidInv() {
    const dataAddedModified = this.getModifiedInvDetails(this.invDetailsAdded);
  
    if (dataAddedModified.length > 0) {
      this.invDetailService.editMultipleDetails(this.idInv, dataAddedModified)
        .pipe(
          switchMap(() => this.invDetailService.validDetails(this.idInv)),
          tap(() => this.getListDetails())
        )
        .subscribe({
          next: () => this.getInventaire(this.idInv),
          error: (err: HttpErrorResponse) => console.log(err, " ERR EDIT and Valid Inv"),
        });
    } else {
      this.invDetailService.validDetails(this.idInv)
        .pipe(
          tap(() => this.getListDetails())
        )
        .subscribe({
          next: () => this.getInventaire(this.idInv),
          error: (err: HttpErrorResponse) => console.log(err, " ERR VAlid Inv"),
        });
    }
  }
}
