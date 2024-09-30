import { Component, Directive, EventEmitter, inject, Input, Output, TemplateRef, ViewChildren, type PipeTransform, type QueryList } from '@angular/core'
import { EntrepotData, paginateData, type EntrepotType } from './data' // Update this to match your entrepot data import
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'
import { TableFooterComponent } from "../../../../../components/table/table-footer/table-footer.component";
import { TableHeaderComponent } from "../../../../../components/table/table-header/table-header.component";

export type SortColumn = keyof EntrepotType | ''
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

function search(text: string, pipe: PipeTransform): EntrepotType[] {
  return EntrepotData.filter((entrepot) => {
    const term = text.toLowerCase()
    return (
      entrepot.nom.toLowerCase().includes(term) ||
      pipe.transform(entrepot.nom).includes(term) ||
      pipe.transform(entrepot.valeur).includes(term)
    )
  })
}
@Component({
  selector: 'app-entrepot',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, NgbHighlight, NgbdSortableHeader, ReactiveFormsModule, RouterLink, TableFooterComponent, TableHeaderComponent],
  templateUrl: './entrepot.component.html',
  styleUrl: './entrepot.component.scss'
})
export class EntrepotComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  entrepotForm: FormGroup;
  newentrepotForm: FormGroup;
  isEditMode = false;
  isCreateMode = false;
  page = 1
  pageSize = 4
  collectionSize = EntrepotData.length
  Produit!: EntrepotType[]
  basicProduit = EntrepotData.slice(0, 5)
  searchProduit = EntrepotData.slice(0, 5)
  sortProduit = EntrepotData.slice(0, 5)

  records$: Observable<EntrepotType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<EntrepotType>
  >

  public tableService = inject(TableService<EntrepotType>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private fb: FormBuilder) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$
    this.refreshProduit()
    this.entrepotForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      valeur: ['', Validators.required],
    });
    this.newentrepotForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      valeur: ['', Validators.required],
    });
  }



  ngOnInit(): void {
    this.tableService.setItems(EntrepotData, 5)
  }

  loadEntrepotData(dataUpdate: any): void {
    const data: EntrepotType = {
      id: dataUpdate.id,
      nom: dataUpdate.nom,
      valeur: dataUpdate.valeur,
    };
    this.entrepotForm.patchValue(data);
  }

  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, entrepot: any) {
    this.modalData = {
      title: entrepot.nom,
      contentTitle: entrepot.nom,
      list: [
        `id: ${entrepot.id}`,
        `nom: ${entrepot.nom}`,
        `valeur: ${entrepot.valeur}`,
      ]
    };
    this.modalService.open(content, options)
    this.loadEntrepotData(entrepot);
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
    if (this.entrepotForm.valid) {
      const EntrepotData: EntrepotType = this.entrepotForm.value;
      if (this.isEditMode) {
        console.log('Mise à jour des données:', EntrepotData);
      } else {
        console.log('Création d’un nouveau entrepot:', EntrepotData);
      }
    }
  }
  onNewSubmit(): void {
    if (this.newentrepotForm.valid) {
      const EntrepotData: EntrepotType = this.newentrepotForm.value;
      if (this.isCreateMode) {
        console.log('Mise à jour des données:', EntrepotData);
      } else {
        console.log('Création d’un nouveau entrepot:', EntrepotData);
      }
    }
  }
}

