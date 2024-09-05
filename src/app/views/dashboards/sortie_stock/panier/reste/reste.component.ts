import { Component, Directive, EventEmitter, inject, Input, Output, TemplateRef, ViewChildren, type PipeTransform, type QueryList } from '@angular/core'
import { ResteData, paginateData, type ResteType } from './data' 
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'

export type SortColumn = keyof ResteType | ''
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

function search(text: string, pipe: PipeTransform): ResteType[] {
  return ResteData.filter((reste) => {
    const term = text.toLowerCase()
    return (
      reste.etat.toLowerCase().includes(term) ||
      pipe.transform(reste.montant).includes(term) ||
      pipe.transform(reste.verser).includes(term)
    )
  })
}
@Component({
  selector: 'app-reste',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, NgbHighlight, NgbdSortableHeader, ReactiveFormsModule, RouterLink],
  templateUrl: './reste.component.html',
  styleUrl: './reste.component.scss'
})
export class ResteComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  resteForm: FormGroup;
  newresteForm: FormGroup;
  isEditMode = false;
  isCreateMode = false;
  page = 1
  pageSize = 4
  collectionSize = ResteData.length
  Produit!: ResteType[]
  basicProduit = ResteData.slice(0, 5)
  searchProduit = ResteData.slice(0, 5)
  sortProduit = ResteData.slice(0, 5)

  records$: Observable<ResteType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<ResteType>
  >

  public tableService = inject(TableService<ResteType>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private fb: FormBuilder) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    this.refreshProduit()

    this.resteForm = this.fb.group({
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

    this.newresteForm = this.fb.group({
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
    this.tableService.setItems(ResteData, 5)
  }

  loadResteData(dataUpdate: any): void {
    const data: ResteType = {
      id: dataUpdate.id,
      idClient: dataUpdate.idClient,
      dtLivraison: dataUpdate.dtLivraison,
      admin: dataUpdate.admin,
      pannierType: dataUpdate.pannierType,
      client: dataUpdate.client,
      etat: dataUpdate.etat,
      montant: dataUpdate.montant,
      verser: dataUpdate.verser,
      reste: dataUpdate.reste,
      nbrArticle: dataUpdate.nbrArticle,
    };
    this.resteForm.patchValue(data);
  }



  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, reste: any) {
    this.modalData = {
      title: "",
      contentTitle: "",
      list: [
        `Date livraison: ${reste.dtLivraison}`,
        `Nom: ${reste.admin}`,
        `Admin: ${reste.pannierType}`,
        `Client: ${reste.client}`,
        `Etat: ${reste.etat}`,
        `Montant: ${reste.montant}`,
        `Verser: ${reste.verser}`,
        `Reste: ${reste.reste}`,
        `Nombre article: ${reste.nbrArticle}`,
      ]
    };
    this.modalService.open(content, options)
    this.loadResteData(reste);
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
    if (this.resteForm.valid) {
      const ResteData: ResteType = this.resteForm.value;
      if (this.isEditMode) {
        console.log('Mise à jour des données:', ResteData);
      } else {
        console.log('Création d’un nouveau reste:', ResteData);
      }
    }
  }

  onNewSubmit(): void {
    if (this.newresteForm.valid) {
      const ResteData: ResteType = this.newresteForm.value;
      if (this.isCreateMode) {
        console.log('Ajout catégorie:', ResteData);
      } else {
        console.log('Création d’un nouveau reste:', ResteData);
      }
    }
  }
}

