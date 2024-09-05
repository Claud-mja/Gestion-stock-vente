import { Component, Directive, EventEmitter, inject, Input, Output, TemplateRef, ViewChildren, type PipeTransform, type QueryList } from '@angular/core'
import { CreeData, paginateData, type CreeType } from './data' // Update this to match your creer data import
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'

export type SortColumn = keyof CreeType | ''
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

function search(text: string, pipe: PipeTransform): CreeType[] {
  return CreeData.filter((creer) => {
    const term = text.toLowerCase()
    return (
      creer.remarque.toLowerCase().includes(term) ||
      pipe.transform(creer.remarque).includes(term) ||
      pipe.transform(creer.remarque).includes(term)
    )
  })
}
@Component({
  selector: 'app-creer',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, NgbHighlight, NgbdSortableHeader, ReactiveFormsModule, RouterLink],
  templateUrl: './creer.component.html',
  styleUrl: './creer.component.scss'
})
export class CreerComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  creerForm: FormGroup;
  newcreerForm: FormGroup;
  isEditMode = false;
  isCreateMode = false;
  page = 1
  pageSize = 4
  collectionSize = CreeData.length
  Produit!: CreeType[]
  basicProduit = CreeData.slice(0, 5)
  searchProduit = CreeData.slice(0, 5)
  sortProduit = CreeData.slice(0, 5)

  records$: Observable<CreeType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<CreeType>
  >

  public tableService = inject(TableService<CreeType>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private fb: FormBuilder) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    this.refreshProduit()

    this.creerForm = this.fb.group({
      id: ['', Validators.required],
      idPannierType: ['', Validators.required],
      idCaisse: ['', Validators.required],
      dateCommande: ['', Validators.required],
      dateAjout: ['', Validators.required],
      remarque: [''],
      admin: ['', Validators.required],
      pannierType: ['', Validators.required],
      client: ['', Validators.required],
      montantReste: [0, [Validators.required, Validators.min(0)]],
      montantVerser: [0, [Validators.required, Validators.min(0)]],
      montantTotal: [0, [Validators.required, Validators.min(0)]]
    });

    this.newcreerForm = this.fb.group({
      id: ['', Validators.required],
      idPannierType: ['', Validators.required],
      idCaisse: ['', Validators.required],
      dateCommande: ['', Validators.required],
      dateAjout: ['', Validators.required],
      remarque: [''],
      admin: ['', Validators.required],
      pannierType: ['', Validators.required],
      client: ['', Validators.required],
      montantReste: [0, [Validators.required, Validators.min(0)]],
      montantVerser: [0, [Validators.required, Validators.min(0)]],
      montantTotal: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.tableService.setItems(CreeData, 5)
  }

  loadCreeData(dataUpdate: any): void {
    const data: CreeType = {
      id: dataUpdate.id,
      idPannierType: dataUpdate.idPannierType,
      idCaisse: dataUpdate.idCaisse,
      dateCommande: dataUpdate.dateCommande,
      dateAjout: dataUpdate.dateAjout,
      remarque: dataUpdate.remarque,
      admin: dataUpdate.admin,
      pannierType: dataUpdate.pannierType,
      client: dataUpdate.client,
      montantReste: dataUpdate.montantReste,
      montantVerser: dataUpdate.montantVerser,
      montantTotal: dataUpdate.montantTotal,
    };
    this.creerForm.patchValue(data);
  }


  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, creer: any) {
    this.modalData = {
      title: creer.nom,
      contentTitle: creer.nom,
      list: [
        `Remarque: ${creer.remarque}`,
        `Nom: ${creer.nom}`,
        `Admin: ${creer.admin}`,
        `Type panier: ${creer.pannierType}`,
        `Client: ${creer.client}`,
        `Montant reste: ${creer.montantReste}`,
        `Montant à verser: ${creer.montantVerser}`,
        `Montant Total: ${creer.montantTotal}`,
      ]
    };
    this.modalService.open(content, options)
    this.loadCreeData(creer);
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
    if (this.creerForm.valid) {
      const CreeData: CreeType = this.creerForm.value;
      if (this.isEditMode) {
        console.log('Mise à jour des données:', CreeData);
      } else {
        console.log('Création d’un nouveau creer:', CreeData);
      }
    }
  }

  onNewSubmit(): void {
    if (this.newcreerForm.valid) {
      const CreeData: CreeType = this.newcreerForm.value;
      if (this.isCreateMode) {
        console.log('Ajout catégorie:', CreeData);
      } else {
        console.log('Création d’un nouveau creer:', CreeData);
      }
    }
  }
}

