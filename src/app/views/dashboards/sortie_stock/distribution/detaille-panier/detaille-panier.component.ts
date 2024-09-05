import { Component, Directive, EventEmitter, inject, Input, Output, TemplateRef, ViewChildren, type PipeTransform, type QueryList } from '@angular/core'
import { DPanierData, paginateData, type DPanierType } from './data' // Update this to match your detaillePanier data import
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'

export type SortColumn = keyof DPanierType | ''
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

function search(text: string, pipe: PipeTransform): DPanierType[] {
  return DPanierData.filter((detaillePanier) => {
    const term = text.toLowerCase()
    return (
      detaillePanier.produit.toLowerCase().includes(term) ||
      pipe.transform(detaillePanier.client).includes(term) ||
      pipe.transform(detaillePanier.prixAchat).includes(term)
    )
  })
}
@Component({
  selector: 'app-detaille-panier',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, NgbHighlight, NgbdSortableHeader, ReactiveFormsModule, RouterLink],
  templateUrl: './detaille-panier.component.html',
  styleUrl: './detaille-panier.component.scss'
})
export class DetaillePanierComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  detaillePanierForm: FormGroup;
  newdetaillePanierForm: FormGroup;
  isEditMode = false;
  isCreateMode = false;
  page = 1
  pageSize = 4
  collectionSize = DPanierData.length
  Produit!: DPanierType[]
  basicProduit = DPanierData.slice(0, 5)
  searchProduit = DPanierData.slice(0, 5)
  sortProduit = DPanierData.slice(0, 5)

  records$: Observable<DPanierType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<DPanierType>
  >

  public tableService = inject(TableService<DPanierType>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private fb: FormBuilder) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    this.refreshProduit()

    this.detaillePanierForm = this.fb.group({
      id: ['', Validators.required],
      idPannierType: ['', Validators.required],
      idCaisse: ['', Validators.required],
      dateCommande: ['', Validators.required],
      dateAjout: ['', Validators.required],
      remarque: [''],
      admin: ['', Validators.required],
      pannierType: ['', Validators.required],
      detaillePanier: ['', Validators.required],
      montantReste: [0, [Validators.required, Validators.min(0)]],
      montantVerser: [0, [Validators.required, Validators.min(0)]],
      montantTotal: [0, [Validators.required, Validators.min(0)]]
    });

    this.newdetaillePanierForm = this.fb.group({
      id: ['', Validators.required],
      idPannierType: ['', Validators.required],
      idCaisse: ['', Validators.required],
      dateCommande: ['', Validators.required],
      dateAjout: ['', Validators.required],
      remarque: [''],
      admin: ['', Validators.required],
      pannierType: ['', Validators.required],
      detaillePanier: ['', Validators.required],
      montantReste: [0, [Validators.required, Validators.min(0)]],
      montantVerser: [0, [Validators.required, Validators.min(0)]],
      montantTotal: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.tableService.setItems(DPanierData, 5)
  }

  loadDPanierData(dataUpdate: any): void {
    const data: DPanierType = {
      id: dataUpdate.id,
      idPanier: dataUpdate.idPanier,
      produit: dataUpdate.produit,
      client: dataUpdate.client,
      prixAchat: dataUpdate.prixAchat,
      quanite: dataUpdate.quanite
    };
    this.detaillePanierForm.patchValue(data);
  }


  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, detaillePanier: any) {
    this.modalData = {
      title: ``,
      contentTitle: ``,
      list: [
        `Produit: ${detaillePanier.produit}`,
        `Client: ${detaillePanier.client}`,
        `Prix Achat: ${detaillePanier.prixAchat}`,
        `Quantite: ${detaillePanier.quanite}`,
      ]
    };
    this.modalService.open(content, options)
    this.loadDPanierData(detaillePanier);
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
    if (this.detaillePanierForm.valid) {
      const DPanierData: DPanierType = this.detaillePanierForm.value;
      if (this.isEditMode) {
        console.log('Mise à jour des données:', DPanierData);
      } else {
        console.log('Création d’un nouveau detaillePanier:', DPanierData);
      }
    }
  }

  onNewSubmit(): void {
    if (this.newdetaillePanierForm.valid) {
      const DPanierData: DPanierType = this.newdetaillePanierForm.value;
      if (this.isCreateMode) {
        console.log('Ajout catégorie:', DPanierData);
      } else {
        console.log('Création d’un nouveau detaillePanier:', DPanierData);
      }
    }
  }
}



