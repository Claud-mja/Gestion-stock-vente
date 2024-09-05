import { Component, Directive, EventEmitter, inject, Input, Output, TemplateRef, ViewChildren, type PipeTransform, type QueryList } from '@angular/core'
import { ClientData, paginateData, type ClientType } from './data' // Update this to match your client data import
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'

export type SortColumn = keyof ClientType | ''
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

function search(text: string, pipe: PipeTransform): ClientType[] {
  return ClientData.filter((client) => {
    const term = text.toLowerCase()
    return (
      client.nom.toLowerCase().includes(term) ||
      pipe.transform(client.prenom).includes(term) ||
      pipe.transform(client.adresse).includes(term)
    )
  })
}
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, NgbHighlight, NgbdSortableHeader, ReactiveFormsModule, RouterLink],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  clientForm: FormGroup;
  newclientForm: FormGroup;
  isEditMode = false;
  isCreateMode = false;
  page = 1
  pageSize = 4
  collectionSize = ClientData.length
  Produit!: ClientType[]
  basicProduit = ClientData.slice(0, 5)
  searchProduit = ClientData.slice(0, 5)
  sortProduit = ClientData.slice(0, 5)

  records$: Observable<ClientType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<ClientType>
  >

  public tableService = inject(TableService<ClientType>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private fb: FormBuilder) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    this.refreshProduit()

    this.clientForm = this.fb.group({
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

    this.newclientForm = this.fb.group({
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
    this.tableService.setItems(ClientData, 5)
  }

  loadClientData(dataUpdate: any): void {
    const data: ClientType = {
      id: dataUpdate.id,
      nom: dataUpdate.nom,
      prenom: dataUpdate.prenom,
      adresse: dataUpdate.adresse,
      email: dataUpdate.email,
      numero: dataUpdate.numero,
      rap: dataUpdate.rap,
      verser: dataUpdate.verser,
      total: dataUpdate.total,
    };
    this.clientForm.patchValue(data);
  }


  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, client: any) {
    this.modalData = {
      title: `${client.nom} ${client.prenom}`,
      contentTitle: `${client.nom} ${client.prenom}`,
      list: [
        `Nom: ${client.nom}`,
        `Prenom: ${client.prenom}`,
        `Adresse: ${client.adresse}`,
        `Email: ${client.email}`,
        `Numéro: ${client.numero}`,
        `RAP: ${client.rap}`,
        `Verser: ${client.verser}`,
        `Total: ${client.total}`,
      ]
    };
    this.modalService.open(content, options)
    this.loadClientData(client);
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
    if (this.clientForm.valid) {
      const ClientData: ClientType = this.clientForm.value;
      if (this.isEditMode) {
        console.log('Mise à jour des données:', ClientData);
      } else {
        console.log('Création d’un nouveau client:', ClientData);
      }
    }
  }

  onNewSubmit(): void {
    if (this.newclientForm.valid) {
      const ClientData: ClientType = this.newclientForm.value;
      if (this.isCreateMode) {
        console.log('Ajout catégorie:', ClientData);
      } else {
        console.log('Création d’un nouveau client:', ClientData);
      }
    }
  }
}


