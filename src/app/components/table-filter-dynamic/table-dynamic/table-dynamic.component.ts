import { NgbdSortableHeader, SortEvent } from '@/app/core/directive/sortable.directive';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TableService } from '@/app/core/service/table.service';
import { Observable } from 'rxjs';
import { TableConfig } from '@/app/common/table-config';

@Component({
  selector: 'table-dynamic',
  standalone: true,
  imports : [
    NgbdSortableHeader,
    TableHeaderComponent,
    TableFooterComponent,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './table-dynamic.component.html',
  styleUrls: ['./table-dynamic.component.scss']
})
export class TableDynamicComponent<T extends {}> implements OnInit {
  @Input() config!: TableConfig<T>;
  dataList$: Observable<T[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader<T>>;

  constructor(public tableService: TableService<T>) {
    this.dataList$ = tableService.items$;
    this.total$ = tableService.total$;
  }

  ngOnInit(): void {
    // Vous pouvez mettre en place des données initiales si nécessaire
    // Exemple : this.tableService.setItems([/* vos données */], 10);
  }

  onSort(event: SortEvent<T>): void {
    const { column, direction } = event;
    // Réinitialiser les autres en-têtes
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.tableService.sortColumn = column;
    this.tableService.sortDirection = direction;
  }

}
