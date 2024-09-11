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
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router'

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
    NgbHighlight,
    NgbdSortableHeader,
  ],
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'] // Updated from styleUrl to styleUrls
})
export class ListeComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  page = 1
  pageSize = 4
  collectionSize = DataTableProduct.length
  Produit!: DataTableProduitsType[]
  basicProduit = DataTableProduct.slice(0, 5)
  searchProduit = DataTableProduct.slice(0, 5)
  sortProduit = DataTableProduct.slice(0, 5)

  records$: Observable<DataTableProduitsType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<DataTableProduitsType>
  >

  public tableService = inject(TableService<DataTableProduitsType>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private router: Router) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    this.refreshProduit()
  }

  ngOnInit(): void {
    this.tableService.setItems(DataTableProduct, 5)
  }

  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }
  clickToNew(){
    this.router.navigate(['/dashboard/stock-interne/new'])
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, produit: any) {
    this.modalData = {
      title: produit.name,
      image: produit.photo,
      contentTitle: produit.name,
      badge: produit.etat,
      date: '07 Oct 2024',
      list: [
        `Seuil: ${produit.seuil}`,
        `Prix Achat: ${produit.prixAchat}`,
        `Prix Vente: ${produit.prixVente}`,
        `Depot: ${produit.depot}`,
        `Uniter: ${produit.uniter}`
      ]
    };
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
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = ''
      }
    }
    if (direction === '' || column === '') {
      this.sortProduit = DataTableProduct
    } else {
      this.sortProduit = [...DataTableProduct].sort((a, b) => {
        const res = compare(a[column], b[column])
        return direction === 'asc' ? res : -res
      })
    }
  }

  searchfilter() {
    this.searchProduit = search(this.filter, this.pipe)
  }

  refreshProduit() {
    this.Produit = paginateData
      .map((produitres, i) => ({
        ...produitres,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      )
  }

  onCompleteSort({ column, direction }: CustomSortEvent) {
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = ''
      }
    }
    this.tableService.sortColumn = column
    this.tableService.sortDirection = direction
  }
}
