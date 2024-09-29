
import { PageDetails } from '@/app/common/paginatrd.interface';
import { TableFooterComponent } from '@/app/components/table/table-footer/table-footer.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimulationData, SimulationType } from './data';
import { Observable } from 'rxjs';
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive';
import { TableService } from '@/app/core/service/table.service';
import { RouterLink } from '@angular/router';
import { TableHeaderComponent } from '@/app/components/table/table-header/table-header.component';

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [CommonModule,FormsModule, TableFooterComponent , TableHeaderComponent, RouterLink , ReactiveFormsModule],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent {
  filter!: string
  private modalService = inject(NgbModal)
  modalData: any;
  simulationForm : FormGroup;
  accordions: { [key: string]: boolean } = {
    accordion1: true,
    accordion2: true
  };
  
  isEditMode = false;

  pageDetails: PageDetails = {
    data_count: 0,
    data_limit: 10,
    data_now: 0,
    page_max: 0,
    page_now: 1
  }

  basicProduit = SimulationData.slice(0, 5)
  searchProduit = SimulationData.slice(0, 5)
  sortProduit = SimulationData.slice(0, 5)

  records$: Observable<SimulationType[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<SimulationType>
  >

  public tableService = inject(TableService<SimulationType>)

  ficheInfo: string = ''
  ficheFile: File | null = null


  constructor(public pipe: DecimalPipe, private fb: FormBuilder) {
    this.records$ = this.tableService.items$
    this.total$ = this.tableService.total$

    // Initialiser les données
    this.tableService.setItems(SimulationData, this.pageDetails.data_limit);

    this.simulationForm = this.fb.group({
      nom: ['', Validators.required],
      dateValidation: ['', Validators.required],
      fournisseur: ['', Validators.required],
      montant: [0, Validators.required],
      paye: [0, Validators.required],
      rap: [0, Validators.required],
    });
  }
  
  // Ajouter d'autres méthodes similaires à celles du composant Ravitaillement si nécessaire

  openModal(content: TemplateRef<HTMLElement>, simulation: SimulationType) {
    this.modalData = {
      title: simulation.nom,
      date: simulation.dateSimulation,
      remarque: simulation.remarque,
      etat: simulation.etat,
    };
    this.modalService.open(content);
  }

  onSort(event: any) {
    const { column, direction } = event
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = ''
      }
    })

    this.tableService.sortColumn = column
    this.tableService.sortDirection = direction
  }

  onSubmit(): void {
    // Logique de soumission pour créer ou mettre à jour une simulation
    if (this.isEditMode) {
      console.log('Mise à jour des données:', this.modalData);
    } else {
      console.log('Création d’une nouvelle simulation:', this.modalData);
    }
  }
}
