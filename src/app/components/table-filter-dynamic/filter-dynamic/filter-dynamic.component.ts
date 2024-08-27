import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'filter-dynamic',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './filter-dynamic.component.html',
  styleUrls: ['./filter-dynamic.component.css']
})
export class FilterDynamicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
