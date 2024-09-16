import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableHeaderComponent } from "../../../../../components/table/table-header/table-header.component";
import { CasierList } from '@/app/core/models/config/casier.model';
import { CategoryList } from '@/app/core/models/config/category.model';
import { DepotList } from '@/app/core/models/config/depot.model';
import { TypeList } from '@/app/core/models/config/type.model';
import { UniteList } from '@/app/core/models/config/uniter.model';
import { ZoneList } from '@/app/core/models/config/zone.model';
import { CasierService } from '@/app/core/service/stck/config/casier.service';
import { CategoryService } from '@/app/core/service/stck/config/category.service';
import { DepotService } from '@/app/core/service/stck/config/depot.service';
import { TypeService } from '@/app/core/service/stck/config/type.service';
import { UniterService } from '@/app/core/service/stck/config/uniter.service';
import { ZoneService } from '@/app/core/service/stck/config/zone.service';
import { Paginated } from '@/app/common/paginatrd.interface';
import { QueryParam } from '@/app/common/queryRequest';
import { ProduitService } from '@/app/core/service/stck/produit.service';
import { ApiResponse } from '@/app/common/apiResponse';

@Component({
  selector: 'app-saisie-multiple',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableHeaderComponent],
  templateUrl: './saisie-multiple.component.html',
  styleUrl: './saisie-multiple.component.scss'
})
export class SaisieMultipleComponent {
  productsForm : FormGroup;
  loadSave : boolean = false;


  private productService = inject(ProduitService);

  private typeService = inject(TypeService);
  private uniteService = inject(UniterService);
  private depotService = inject(DepotService);
  private zoneService = inject(ZoneService);
  private casierService = inject(CasierService);
  private categService = inject(CategoryService);

  public typesProd !: TypeList[];
  public unitesProd !: UniteList[];
  public depotsProd !: DepotList[];
  public zonesProd !: ZoneList[];
  public casiersProd !: CasierList[];
  public categsProd !: CategoryList[];


  constructor(private fb: FormBuilder) {
    this.productsForm = this.fb.group({
      depot: ['', Validators.required],
      zone: ['', Validators.required],
      type: ['', Validators.required],
      categ: ['', Validators.required],
      products: this.fb.array([])
    });
    this.onAddPorduct();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getTypes();
    this.getUnites();
    this.getDepots()
  }

  get products(): FormArray {
    return this.productsForm.get('products') as FormArray;
  }

  getCategories() {
    this.categService.getCategories().subscribe((response : Paginated<CategoryList>) => {
      this.categsProd = response.reulstat;

      this.productsForm.get('categ')?.setValue(response.reulstat[0].id);
    })
  }

  getTypes(){
    this.typeService.getTypes().subscribe((response : Paginated<TypeList>) => {
      this.typesProd = response.reulstat;

      this.productsForm.get('type')?.setValue(response.reulstat[0].id);
    })
  }

  getUnites() {
    this.uniteService.getUnites().subscribe((response : Paginated<UniteList>) => {
      this.unitesProd = response.reulstat;

      const productsArray = this.products as FormArray;
      productsArray.controls.forEach(control => {
        control.get('uniter')?.setValue(this.unitesProd.length > 0 ? this.unitesProd[0].id : null);
      });
    })
  }

  getDepots() {
    this.depotService.getDepots().subscribe((response : Paginated<DepotList>) => {
      this.depotsProd = response.reulstat;
      console.log(response.reulstat , "  DEPOT");

      this.productsForm.get('depot')?.setValue(response.reulstat[0].id);

      this.onChangeDepot(response.reulstat[0].id)
    })
  }

  getZone(queries : QueryParam[]) {
    this.zoneService.getZones(queries).subscribe((response : Paginated<ZoneList>) => {
      this.zonesProd = response.reulstat;
      console.log(response.reulstat , "  ZONE");

      this.productsForm.get('zone')?.setValue(response.reulstat[0].id);

      this.onChangeZone(response.reulstat[0].id)
    })
  }

  getCasier(queries : QueryParam[]) {
    this.casierService.getCasiers(queries).subscribe((response : Paginated<CasierList>) => {
      this.casiersProd = response.reulstat;
      const productsArray = this.products as FormArray;
    
      productsArray.controls.forEach(control => {
        control.get('casier')?.setValue(this.casiersProd.length > 0 ? this.casiersProd[0].id : null);
      });
    })
  }

  onChangeDepot(event : any) {

    const selectEl = event as HTMLSelectElement;

    if (selectEl) {
      const id = typeof selectEl === 'string' ? selectEl : selectEl.value
      let queries : QueryParam[] = [
        { key : '$query[id_entrepot][$eq]' , value: `'${id}'` }
      ]
      
      this.getZone(queries)
    }
  }

  onChangeZone(event : any) {
    const selectEl = event as HTMLSelectElement;
    
    if (selectEl) {
      const id = typeof selectEl === 'string' ? selectEl : selectEl.value
      console.log(id , " selectEl");
      let queries : QueryParam[] = [
        { key : '$query[id_zone][$eq]' , value: `'${id}'` }
      ]
      
      this.getCasier(queries)
    }
  }


  lineProduct(): FormGroup {
    return this.fb.group({
      nom: ['', Validators.required],
      ref: ['', Validators.required],
      seriazable: [false],
      perissable: [false],
      qt_equivalance: [1, [Validators.required, Validators.min(1)]],
      seuil: ['', [Validators.required, Validators.min(1)]],
      prixachat: ['', [Validators.required, Validators.min(1)]],
      prixvente: ['', [Validators.required, Validators.min(1)]],
      casier: ['', Validators.required],
      uniter: ['', Validators.required]
    });
  }


  onAddPorduct(): void {
    this.products.push(this.lineProduct());
    const idZone = this.productsForm.get('zone')?.value;
    this.getUnites();

    if (idZone) {
      this.onChangeZone(idZone);
    }
  }

  onRemoveProduct(index : number) : void {
    this.products.removeAt(index);
  }

  onSubmit(){
    this.loadSave = true;
    if (this.productsForm.invalid) {
      this.productsForm.markAllAsTouched();
      console.error('Formulaire non valide.');
      return;
    }

    console.log(this.productsForm.value);
    
    const type = this.productsForm.get('type')?.value;
    const categ = this.productsForm.get('categ')?.value;

    // Récupérer les produits du FormArray
    const productsArray = this.productsForm.get('products') as FormArray;

    // Construire la structure de chaque produit avec les valeurs globales
    const formattedProducts = productsArray.controls.map((control: any) => ({  
      id_type : type,  
      id_cat : categ, 
      id_casier: control.get('casier')?.value,
      id_uniter: control.get('uniter')?.value,
      nom: control.get('nom')?.value,
      ref: control.get('ref')?.value,
      seriazable: control.get('seriazable')?.value,
      perissable: control.get('perissable')?.value,
      qt_equivalance: control.get('qt_equivalance')?.value,
      seuil: control.get('seuil')?.value,
      prixachat: control.get('prixachat')?.value,
      prixvente: control.get('prixvente')?.value,
    }));

    this.productService.saveMultiProduit(formattedProducts).subscribe({
      next: (response : ApiResponse) => {
        console.log('Produit créé avec succès', response);
        // Rediriger ou afficher un message de succès
        this.loadSave = false;
        this.products.clear();
        this.onAddPorduct();
      },
      error: (error) => {
        console.error('Erreur lors de la création du produit', error);
        // Afficher un message d'erreur à l'utilisateur
        this.loadSave = false;
      }
    })
    
  }
}
