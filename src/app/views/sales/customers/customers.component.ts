import { TableConfig } from '@/app/common/table-config';
import { TableDynamicComponent } from '@/app/components/table-filter-dynamic/table-dynamic/table-dynamic.component';
import { Component, OnInit } from '@angular/core';

type AuteurType = {
  photo : string,
  name : string,
  lastname : string,
  marque : string
}

@Component({
  selector: 'app-customers',
  standalone : true,
  imports : [
    TableDynamicComponent
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  tableConfig !: TableConfig<AuteurType>;

  constructor() {
    this.initTbaleConfig();
  }

  ngOnInit() {
  }

  initTbaleConfig(){
    this.tableConfig = {
      tools : "auteur",
      header : {
        fields : [
          { name : "photo" , type: 'image' },
          { name : "lastname" , type : 'string' },
          { name : "marque" , type : 'string' },
          { name : "name" , type : 'string' },
        ],
        labels : {
          "photo" : "Photo auteur",
          "name" : "Nom auteur",
          "lastname" : "Prenom auteur",
          "marque" : "Marque auteur",
        },
        filters : [],
        sorts : []
      }
    }
  }

}
