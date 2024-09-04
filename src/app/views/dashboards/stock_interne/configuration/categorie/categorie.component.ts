import { Component, Directive, EventEmitter, inject, Input, Output, TemplateRef, ViewChildren, type PipeTransform, type QueryList } from '@angular/core'
import { CategoryData, paginateData, type CategoryType } from './data' // Update this to match your category data import
import type { Observable } from 'rxjs'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'

export type SortColumn = keyof CategoryType | ''
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

function search(text: string, pipe: PipeTransform): CategoryType[] {
  return CategoryData.filter((category) => {
    const term = text.toLowerCase()
    return (
      category.nom.toLowerCase().includes(term) ||
      pipe.transform(category.nom).includes(term) ||
      pipe.transform(category.type).includes(term)
    )
  })
}
@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, NgbHighlight, NgbdSortableHeader, ReactiveFormsModule, RouterLink],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss'
})
export class CategorieComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  categoryForm: FormGroup;
  newcategoryForm: FormGroup;
  isEditMode = false;
  isCreateMode = false;
  page = 1
  pageSize = 4
  collectionSize = CategoryData.length
  Produit!: CategoryType[]
  basicProduit = CategoryData.slice(0, 5)
  searchProduit = CategoryData.slice(0, 5)
  sortProduit = CategoryData.slice(0, 5)

  records$: Observable<CategoryType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<CategoryType>
  >

  public tableService = inject(TableService<CategoryType>)

  ficheInfo: string = ''
  ficheFile: File | null = null

  constructor(public pipe: DecimalPipe, private fb: FormBuilder) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    this.refreshProduit()

    this.categoryForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      type: ['', Validators.required],
    });

    this.newcategoryForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      type: ['', Validators.required],
    });
  }



  ngOnInit(): void {
    this.tableService.setItems(CategoryData, 5)
  }

  loadCategoryData(dataUpdate: any): void {
    const data: CategoryType = {
      id: dataUpdate.id,
      nom: dataUpdate.nom,
      type: dataUpdate.type,
    };
    this.categoryForm.patchValue(data);
  }

  toggleAccordion(id: string) {
    if (this.accordions.hasOwnProperty(id)) {
      this.accordions[id as keyof typeof this.accordions] = !this.accordions[id as keyof typeof this.accordions];
    }
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, category: any) {
    this.modalData = {
      title: category.nom,
      contentTitle: category.nom,
      list: [
        `id: ${category.id}`,
        `nom: ${category.nom}`,
        `type: ${category.type}`,
      ]
    };
    this.modalService.open(content, options)
    this.loadCategoryData(category);
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
    if (this.categoryForm.valid) {
      const CategoryData: CategoryType = this.categoryForm.value;
      if (this.isEditMode) {
        console.log('Mise à jour des données:', CategoryData);
      } else {
        console.log('Création d’un nouveau category:', CategoryData);
      }
    }
  }

  onNewSubmit(): void {
    if (this.newcategoryForm.valid) {
      const CategoryData: CategoryType = this.newcategoryForm.value;
      if (this.isCreateMode) {
        console.log('Ajout catégorie:', CategoryData);
      } else {
        console.log('Création d’un nouveau category:', CategoryData);
      }
    }
  }
}

