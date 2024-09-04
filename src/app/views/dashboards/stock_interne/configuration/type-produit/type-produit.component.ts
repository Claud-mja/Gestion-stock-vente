import { Component, Directive, EventEmitter, inject, Input, Output, TemplateRef, ViewChildren, type PipeTransform, type QueryList } from '@angular/core'
import { ProductTypeData, paginateData, type ProductTypeType } from './data' // Update this to match your productType data import
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'

export type SortColumn = keyof ProductTypeType | ''
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

function search(text: string, pipe: PipeTransform): ProductTypeType[] {
  return ProductTypeData.filter((productType) => {
    const term = text.toLowerCase()
    return (
      productType.nom.toLowerCase().includes(term) ||
      pipe.transform(productType.nom).includes(term) ||
      pipe.transform(productType.valeur).includes(term)
    )
  })
}
@Component({
  selector: 'app-type-produit',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, NgbHighlight, NgbdSortableHeader, ReactiveFormsModule, RouterLink],
  templateUrl: './type-produit.component.html',
  styleUrl: './type-produit.component.scss'
})
export class TypeProduitComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  productTypeForm: FormGroup;
  newproductTypeForm: FormGroup;
  isEditMode = false;
  isCreateMode = false;
  page = 1
  pageSize = 4
  collectionSize = ProductTypeData.length
  Produit!: ProductTypeType[]
  basicProduit = ProductTypeData.slice(0, 5)
  searchProduit = ProductTypeData.slice(0, 5)
  sortProduit = ProductTypeData.slice(0, 5)

  records$: Observable<ProductTypeType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<ProductTypeType>
  >

  public tableService = inject(TableService<ProductTypeType>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private fb: FormBuilder) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$
    this.refreshProduit()
    this.productTypeForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      valeur: ['', Validators.required],
    });
    this.newproductTypeForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      valeur: ['', Validators.required],
    });
  }



  ngOnInit(): void {
    this.tableService.setItems(ProductTypeData, 5)
  }

  loadProductTypeData(dataUpdate: any): void {
    const data: ProductTypeType = {
      id: dataUpdate.id,
      nom: dataUpdate.nom,
      valeur: dataUpdate.valeur,
    };
    this.productTypeForm.patchValue(data);
  }

  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, productType: any) {
    this.modalData = {
      title: productType.nom,
      contentTitle: productType.nom,
      list: [
        `id: ${productType.id}`,
        `nom: ${productType.nom}`,
        `valeur: ${productType.valeur}`,
      ]
    };
    this.modalService.open(content, options)
    this.loadProductTypeData(productType);
  }

  openModalNew(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options)
  }

  updateProduct() {
    console.log('Updating product:', this.modalData);
  }

  createFiche() {
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

  onSubmit(): void {
    if (this.productTypeForm.valid) {
      const ProductTypeData: ProductTypeType = this.productTypeForm.value;
      if (this.isEditMode) {
        console.log('Mise à jour des données:', ProductTypeData);
      } else {
        console.log('Création d’un nouveau productType:', ProductTypeData);
      }
    }
  }
  onNewSubmit(): void {
    if (this.newproductTypeForm.valid) {
      const ProductTypeData: ProductTypeType = this.newproductTypeForm.value;
      if (this.isCreateMode) {
        console.log('Mise à jour des données:', ProductTypeData);
      } else {
        console.log('Création d’un nouveau productType:', ProductTypeData);
      }
    }
  }
}

