import { QueryParam } from '@/app/common/queryRequest';
import { Component, Directive, EventEmitter, inject, Input, Output, TemplateRef, ViewChildren, type PipeTransform, type QueryList } from '@angular/core'
import { InventaireData, paginateData, type InventaireType } from './data' // Update this to match your inventaire data import
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'
import { InventaireList } from '@/app/core/models/inventaire.model'
import { InventaireService } from '@/app/core/service/stck/inventaire.service'
import { Paginated } from '@/app/common/paginatrd.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { TableFooterComponent } from '@/app/components/table/table-footer/table-footer.component';
import { TableHeaderComponent } from '@/app/components/table/table-header/table-header.component';

export type SortColumn = keyof InventaireType | ''
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

@Component({
  selector: 'app-inventaire',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, NgbHighlight, NgbdSortableHeader, ReactiveFormsModule, RouterLink , TableHeaderComponent, TableFooterComponent],
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss']
})
export class InventaireComponent {
  private modalService = inject(NgbModal)
  private invService = inject(InventaireService);


  filter!: string
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  inventaireForm: FormGroup;
  isEditMode = false;
  page = 1
  pageSize = 4
  collectionSize = InventaireData.length
  inventaires !: InventaireList[]
  basicProduit = InventaireData.slice(0, 5)
  searchProduit = InventaireData.slice(0, 5)
  sortProduit = InventaireData.slice(0, 5)

  records$: Observable<InventaireList[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<InventaireList>
  >

  public tableService = inject(TableService<InventaireList>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private fb: FormBuilder) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    // this.refreshProduit()

    this.inventaireForm = this.fb.group({
      titre: ['', Validators.required],
      remarque: ['', Validators.required],
      // responsable: [0, Validators.required],
      date_creation : ['' , Validators.required]
      // etat: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getInventaires();
    // this.tableService.setItems(InventaireData, 5)

  }

  getInventaires() {
    const queries : QueryParam[] = [
      { key : '$page[limit]' , value : this.pageSize },
      { key : '$page[rang]' , value : this.page },
    ]

    this.invService.getInvs(queries).subscribe({
      next : (response : Paginated<InventaireList>) => {
        this.inventaires = response.reulstat;
        this.page = response.desc.page_now;
        this.pageSize = response.desc.data_limit;

        this.tableService.setItems(this.inventaires , this.pageSize);
        console.log(response.reulstat);
        this.tableService.setPageSize(this.pageSize);
        this.tableService.setTotal(response.desc.data_count);
      },
      error : (error : HttpErrorResponse) => {
        console.log('Error list inventaire : ', error);
        
      }
    })
  }

  loadInventaireData(dataUpdate: any): void {
    const data: InventaireType = {
      id: dataUpdate.id,
      titre: dataUpdate.titre,
      remarque: dataUpdate.remarque,
      responsable: dataUpdate.responsable,
      etat: dataUpdate.etat,
    };
    this.inventaireForm.patchValue(data);
  }

  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, inventaire: any) {
    this.modalData = {
      title: inventaire.titre,
      contentTitle: inventaire.titre,
      badge: inventaire.titre,
      date: inventaire.titre,
      list: [
        `Remarque: ${inventaire.remarque}`,
        `Responsable: ${inventaire.responsable}`,
        `Etat: ${inventaire.etat}`,
      ]
    };
    this.modalService.open(content, options)
    this.loadInventaireData(inventaire);
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


  // refreshProduit() {
  //   this.inventaires = paginateData
  //     .map((produitres, i) => ({
  //       ...produitres,
  //     }))
  //     .slice(
  //       (this.page - 1) * this.pageSize,
  //       (this.page - 1) * this.pageSize + this.pageSize
  //     )
  // }

  onCompleteSort({ column, direction }: CustomSortEvent) {
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = ''
      }
    }
    // this.tableService.sortColumn = column
    // this.tableService.sortDirection = direction
  }

  onSubmit(): void {
    if (this.inventaireForm.valid) {
      const InventaireData: InventaireType = this.inventaireForm.value;
      if (this.isEditMode) {
        console.log('Mise à jour des données:', InventaireData);
      } else {
        console.log('Création d’un nouveau inventaire:', InventaireData);
      }
    }
  }
}
