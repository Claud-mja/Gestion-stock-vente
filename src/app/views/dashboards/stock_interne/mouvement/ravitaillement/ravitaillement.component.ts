import { Component, Directive, EventEmitter, inject, Input, Output, TemplateRef, ViewChildren, type PipeTransform, type QueryList } from '@angular/core'
import { RavitaillementData, paginateData, type RavitaillementType } from './data' // Update this to match your ravitaillement data import
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

export type SortColumn = keyof RavitaillementType | ''
export type SortDirection = 'asc' | 'desc' | ''
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0)

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

function search(text: string, pipe: PipeTransform): RavitaillementType[] {
  return RavitaillementData.filter((ravitaillement) => {
    const term = text.toLowerCase()
    return (
      ravitaillement.nom.toLowerCase().includes(term) ||
      pipe.transform(ravitaillement.fournisseur).includes(term) ||
      pipe.transform(ravitaillement.montant).includes(term)
    )
  })
}

@Component({
  selector: 'app-ravitaillement',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, NgbHighlight, NgbdSortableHeader],
  templateUrl: './ravitaillement.component.html',
  styleUrls: ['./ravitaillement.component.scss']
})
export class RavitaillementComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  page = 1
  pageSize = 4
  collectionSize = RavitaillementData.length
  Produit!: RavitaillementType[]
  basicProduit = RavitaillementData.slice(0, 5)
  searchProduit = RavitaillementData.slice(0, 5)
  sortProduit = RavitaillementData.slice(0, 5)

  records$: Observable<RavitaillementType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<RavitaillementType>
  >

  public tableService = inject(TableService<RavitaillementType>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    this.refreshProduit()
  }

  ngOnInit(): void {
    this.tableService.setItems(RavitaillementData, 5)
  }

  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
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
