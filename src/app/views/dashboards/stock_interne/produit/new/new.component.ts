import { TypeList } from '@/app/core/models/config/type.model';
import { TypeService } from './../../../../../core/service/stck/config/type.service';
import { ProduitService } from '@/app/core/service/stck/produit.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Paginated } from '@/app/common/paginatrd.interface';
import { UniterService } from '@/app/core/service/stck/config/uniter.service';
import { DepotService } from '@/app/core/service/stck/config/depot.service';
import { ZoneService } from '@/app/core/service/stck/config/zone.service';
import { CasierService } from '@/app/core/service/stck/config/casier.service';
import { UniteList } from '@/app/core/models/config/uniter.model';
import { DepotList } from '@/app/core/models/config/depot.model';
import { ZoneList } from '@/app/core/models/config/zone.model';
import { CasierList } from '@/app/core/models/config/casier.model';
import { QueryParam } from '@/app/common/queryRequest';
import { CategoryService } from '@/app/core/service/stck/config/category.service';
import { CategoryList } from '@/app/core/models/config/category.model';
import { ApiResponse } from '@/app/common/apiResponse';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent implements OnInit {

  fileUpload : File | null = null;
  
  private prodService = inject(ProduitService);

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

  public prodForm ! : FormGroup;

  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.getTypes();
    this.getUnites();
    this.getDepots()
  }

  initForm(): void {
    this.fileUpload = null;
    this.prodForm = this.fb.group({
      nom: ['', Validators.required],
      ref: ['', Validators.required], // Add required validation for ref
      seriazable: [false], // Set default value for seriazable
      perissable: [false], // Set default value for perissable
      qt_equivalance: ['', [Validators.required, Validators.min(1)]], // Require and minimum of 1 for qt_equivalance
      seuil: ['', Validators.required],
      depot : ['' , Validators.required],
      zone : ['' , Validators.required],
      prixachat: ['', Validators.required],
      prixvente: ['', Validators.required],
      type: ['', Validators.required],
      categ: ['', Validators.required],
      casier: ['', Validators.required],
      uniter: ['', Validators.required],
      photo : ['']
    });
  }

  getCategories() {
    this.categService.getCategories().subscribe((response : Paginated<CategoryList>) => {
      this.categsProd = response.reulstat;

      this.prodForm.get('categ')?.setValue(response.reulstat[0].id);
    })
  }

  getTypes(){
    this.typeService.getTypes().subscribe((response : Paginated<TypeList>) => {
      this.typesProd = response.reulstat;

      this.prodForm.get('type')?.setValue(response.reulstat[0].id);
    })
  }

  getUnites() {
    this.uniteService.getUnites().subscribe((response : Paginated<UniteList>) => {
      this.unitesProd = response.reulstat;

      this.prodForm.get('uniter')?.setValue(response.reulstat[0].id);
    })
  }

  getDepots() {
    this.depotService.getDepots().subscribe((response : Paginated<DepotList>) => {
      this.depotsProd = response.reulstat;
      console.log(response.reulstat , "  DEPOT");

      this.prodForm.get('depot')?.setValue(response.reulstat[0].id);

      this.onChangeDepot(response.reulstat[0].id)
    })
  }

  getZone(queries : QueryParam[]) {
    this.zoneService.getZones(queries).subscribe((response : Paginated<ZoneList>) => {
      this.zonesProd = response.reulstat;
      console.log(response.reulstat , "  ZONE");

      this.prodForm.get('zone')?.setValue(response.reulstat[0].id);

      this.onChangeZone(response.reulstat[0].id)
    })
  }

  getCasier(queries : QueryParam[]) {
    this.casierService.getCasiers(queries).subscribe((response : Paginated<CasierList>) => {
      this.casiersProd = response.reulstat;
      console.log(response.reulstat , "  CASIER");

      this.prodForm.get('casier')?.setValue(response.reulstat[0].id);
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

    console.log(selectEl , "k oko");
    
    if (selectEl) {
      const id = typeof selectEl === 'string' ? selectEl : selectEl.value
      let queries : QueryParam[] = [
        { key : '$query[id_zone][$eq]' , value: `'${id}'` }
      ]
      
      this.getCasier(queries)
    }
  }

  onChangeFile(event : EventTarget | null){
    this.fileUpload = null;
    const files = (event as HTMLInputElement).files;
    if (files && files.length > 0) {
      const file : File = files[0];
      if (!file.type.includes('image')) {
        this.prodForm.get('photo')?.setErrors({ notImage : true });
        console.error('Le fichier sélectionné n\'est pas une image.');
      }else{
        const maxSizeInMB = 5;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
          this.prodForm.get('photo')?.setErrors({ fileTooLarge: true });
          console.error(`Le fichier dépasse la taille limite de ${maxSizeInMB} Mo.`);
        } else {
          console.log('Fichier valide : ', file);
          this.prodForm.get('photo')?.setErrors(null); // Retirer les erreurs si tout est bon
          this.fileUpload = file;
          // this.prodForm.get('photo')?.setValue(file);
        }
      }
    }
  }

  onSubmit(){
    if (this.prodForm.invalid) {
      this.prodForm.markAllAsTouched(); // Marquer tous les champs pour afficher les erreurs si nécessaire
      console.error('Formulaire non valide.');
      return;
    }

    const dataProd : any = {
      id_type: this.prodForm.get('type')?.value,
      id_cat: this.prodForm.get('categ')?.value,
      id_casier: this.prodForm.get('casier')?.value,
      id_uniter: this.prodForm.get('uniter')?.value,
      nom: this.prodForm.get('nom')?.value,
      ref: this.prodForm.get('ref')?.value,
      seriazable: this.prodForm.get('seriazable')?.value,
      perissable: this.prodForm.get('perissable')?.value,
      qt_equivalance: this.prodForm.get('qt_equivalance')?.value,
      seuil: this.prodForm.get('seuil')?.value,
      prixachat: this.prodForm.get('prixachat')?.value,
      prixvente: this.prodForm.get('prixvente')?.value,
    };


    this.prodService.saveProduit(dataProd , this.fileUpload).subscribe({
      next: (response : ApiResponse) => {
        console.log('Produit créé avec succès', response);
        // Rediriger ou afficher un message de succès
        this.initForm();
      },
      error: (error) => {
        console.error('Erreur lors de la création du produit', error);
        // Afficher un message d'erreur à l'utilisateur
      }
    })
  }

}
