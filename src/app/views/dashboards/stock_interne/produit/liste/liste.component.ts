import {
  Component,
  Directive,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChildren,
  type PipeTransform,
  type QueryList,
} from '@angular/core'
import { DataTableProduct, paginateData, type DataTableProduitsType } from './data'
import { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router'
import { ProduitService } from '@/app/core/service/stck/produit.service'
import { ProduitList } from '@/app/core/models/produit.model'
import { PageDetails, Paginated } from '@/app/common/paginatrd.interface'
import { environment } from '@/environments/environment.development'
import { TableFooterComponent } from '@/app/components/table/table-footer/table-footer.component'
import { TableHeaderComponent } from '@/app/components/table/table-header/table-header.component'
import { RouterLink } from '@angular/router'

export type SortColumn = keyof DataTableProduitsType | ''
export type SortDirection = 'asc' | 'desc' | ''
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0

export type CustomSortEvent = {
  column: SortColumn
  direction: SortDirection
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdCustomSortableHeader {
  @Input() sortable: SortColumn = ''
  @Input() direction: SortDirection = ''
  @Output() sort = new EventEmitter<CustomSortEvent>()

  rotate() {
    this.direction = rotate[this.direction]
    this.sort.emit({ column: this.sortable, direction: this.direction })
  }
}

function search(text: string, pipe: PipeTransform): DataTableProduitsType[] {
  return DataTableProduct.filter((produitres) => {
    const term = text.toLowerCase()
    return (
      produitres.name.toLowerCase().includes(term) ||
      pipe.transform(produitres.name).includes(term) ||
      pipe.transform(produitres.prixVente).includes(term)
    )
  })
}

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [
    NgbPaginationModule,
    CommonModule,
    FormsModule,
    RouterLink,
    NgbHighlight,
    NgbdSortableHeader,
    TableHeaderComponent, TableFooterComponent
  ],
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'] // Updated from styleUrl to styleUrls
})
export class ListeComponent {
  records$: Observable<ProduitList[]>
  total$: Observable<number>
  pageSize$: Observable<number>;

  filter!: string
  private modalService = inject(NgbModal);
  private prodServvice = inject(ProduitService);
  public img_url = environment.baseUrlImg+'/produit';

  pageDetails : PageDetails = {
    data_count : 0,
    data_limit : 10,
    data_now : 0,
    page_max : 0,
    page_now : 1
  }

  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
 
  Produit!: ProduitList[]


  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<ProduitList>
  >

  public tableService = inject(TableService<ProduitList>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private router: Router) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$;
    this.pageSize$ = this.tableService.pageSize$;
  }
  
  ngOnInit(): void {
    this.pageSize$.subscribe(size => {
      this.pageDetails.data_limit = size;
      this.getProduitList();
    });
  }

  initDataTableService(dataPage : PageDetails){
    this.pageDetails.data_count = dataPage.data_count;
    this.tableService.setTotal(dataPage.data_count);
  }

  getProduitList(){
    // console.log(this.tableService);
    this.tableService.setLoading(true);
    this.prodServvice.getProduits(this.pageDetails).subscribe((response :  Paginated<ProduitList>) => {
        this.tableService.setItems(response.reulstat,response.desc.data_limit);
        console.log("Total ==> ", this.tableService.total$);
        // this.tableService.setLoading(false);
    })
  }

  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }
  clickToNew(){
    this.router.navigate(['/dashboard/stock-interne/new'])
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, produit: ProduitList) {
    this.modalData = {
      title: produit.nom,
      image: "https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp",
      contentTitle: produit.nom,
      badge: produit.etat,
      date: '07 Oct 2024',
      list: [
        `Seuil: ${produit.seuil}`,
        `Prix Achat: ${produit.prixachat}`,
        `Prix Vente: ${produit.prixvente}`,
        `Depot: ${produit.depot}`,
        `Uniter: ${produit.uniter}`
      ]
    };

    console.log(this.modalData);
    
    this.modalService.open(content, options)
  }

  updateProduct() {
    // Add logic to update the product based on modalData
    console.log('Updating product:', this.modalData);
  }

  createFiche() {
    // Add logic to create a fiche based on ficheInfo and ficheFile
    console.log('Creating fiche:', this.ficheInfo, this.ficheFile);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.ficheFile = input.files[0];
    }
  }

  onSort({ column, direction }: CustomSortEvent) {
    // for (const header of this.headers) {
    //   if (header.sortable !== column) {
    //     header.direction = ''
    //   }
    // }
    // if (direction === '' || column === '') {
    //   this.sortProduit = DataTableProduct
    // } else {
    //   this.sortProduit = [...DataTableProduct].sort((a, b) => {
    //     const res = compare(a[column], b[column])
    //     return direction === 'asc' ? res : -res
    //   })
    // }
  }

  searchfilter() {
    // this.searchProduit = search(this.filter, this.pipe)
  }

  refreshProduit() {
    // this.Produit = paginateData
    //   .map((produitres, i) => ({
    //     ...produitres,
    //   }))
    //   .slice(
    //     (this.page - 1) * this.pageSize,
    //     (this.page - 1) * this.pageSize + this.pageSize
    //   )

    
  }

  onCompleteSort({ column, direction }: CustomSortEvent) {
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = ''
      }
    }
    // this.tableService.sortColumn = column
    this.tableService.sortDirection = direction
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/no-image.png';
  }
}
