import { Component, Directive, EventEmitter, inject, Input, Output, TemplateRef, ViewChildren, type PipeTransform, type QueryList } from '@angular/core'
import { UniteMesureData, paginateData, type UniteMesureType } from './data' // Update this to match your umesure data import
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'

export type SortColumn = keyof UniteMesureType | ''
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

function search(text: string, pipe: PipeTransform): UniteMesureType[] {
  return UniteMesureData.filter((umesure) => {
    const term = text.toLowerCase()
    return (
      umesure.nom.toLowerCase().includes(term) ||
      pipe.transform(umesure.nom).includes(term) ||
      pipe.transform(umesure.val).includes(term)
    )
  })
}
@Component({
  selector: 'app-unite-mesure',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, NgbHighlight, NgbdSortableHeader, ReactiveFormsModule, RouterLink],
  templateUrl: './unite-mesure.component.html',
  styleUrl: './unite-mesure.component.scss'
})
export class UniteMesureComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  umesureForm: FormGroup;
  newumesureForm: FormGroup;
  isEditMode = false;
  isCreateMode = false;
  page = 1
  pageSize = 4
  collectionSize = UniteMesureData.length
  Produit!: UniteMesureType[]
  basicProduit = UniteMesureData.slice(0, 5)
  searchProduit = UniteMesureData.slice(0, 5)
  sortProduit = UniteMesureData.slice(0, 5)

  records$: Observable<UniteMesureType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<UniteMesureType>
  >

  public tableService = inject(TableService<UniteMesureType>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private fb: FormBuilder) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    this.refreshProduit()

    this.umesureForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      val: ['', Validators.required],
      etat: ['', Validators.required],
    });

    this.newumesureForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      val: ['', Validators.required],
      etat: ['', Validators.required],
    });
  }



  ngOnInit(): void {
    this.tableService.setItems(UniteMesureData, 5)
  }

  loadUniteMesureData(dataUpdate: any): void {
    const data: UniteMesureType = {
      id: dataUpdate.id,
      nom: dataUpdate.nom,
      val: dataUpdate.val,
      etat: dataUpdate.etat,
    };
    this.umesureForm.patchValue(data);
  }

  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, umesure: any) {
    this.modalData = {
      title: umesure.nom,
      contentTitle: umesure.nom,
      list: [
        `id: ${umesure.id}`,
        `nom: ${umesure.nom}`,
        `val: ${umesure.val}`,
        `etat: ${umesure.etat}`,
      ]
    };
    this.modalService.open(content, options)
    this.loadUniteMesureData(umesure);
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
    if (this.umesureForm.valid) {
      const UniteMesureData: UniteMesureType = this.umesureForm.value;
      if (this.isEditMode) {
        console.log('Mise à jour des données:', UniteMesureData);
      } else {
        console.log('Création d’un nouveau umesure:', UniteMesureData);
      }
    }
  }

  onNewSubmit(): void {
    if (this.newumesureForm.valid) {
      const UniteMesureData: UniteMesureType = this.newumesureForm.value;
      if (this.isCreateMode) {
        console.log('Ajout catégorie:', UniteMesureData);
      } else {
        console.log('Création d’un nouveau umesure:', UniteMesureData);
      }
    }
  }
}

