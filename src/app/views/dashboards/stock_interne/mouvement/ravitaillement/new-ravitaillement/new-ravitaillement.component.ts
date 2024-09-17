import { ApiResponse } from '@/app/common/apiResponse';
import { Paginated } from '@/app/common/paginatrd.interface';
import { FournisseurList } from '@/app/core/models/fournisseur.model';
import { FournisseurService } from '@/app/core/service/stck/fournisseur.service';
import { RavitaillementService } from '@/app/core/service/stck/ravitaillement.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-ravitaillement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './new-ravitaillement.component.html',
  styleUrl: './new-ravitaillement.component.scss'
})
export class NewRavitaillementComponent {
  
  @ViewChild('selectrFourn') selectrForunElement!: ElementRef;

  private forunService = inject(FournisseurService);
  private ravitailService = inject( RavitaillementService);

  ravitaillementForm: FormGroup;
  fourns !: FournisseurList[];

  constructor(private fb: FormBuilder, private router : Router) {
    this.ravitaillementForm = this.fb.group({
      fournisseur: ['', Validators.required],
      nom: ['', Validators.required],
      montant: [0, [Validators.required, Validators.min(0)]],
      dateCreation : ['' , Validators.required],
      dateValidation : [''],
      remarque: ['']
    });
  }

  ngOnInit(): void {
    this.getFournisseurs();
  }

  getFournisseurs() {
    this.forunService.getFournisseurs().subscribe({
      next : (response : Paginated<FournisseurList>) => {
          console.log(response);
          this.fourns = response.reulstat;    
          this.ravitaillementForm.get('fournisseur')?.setValue(response.reulstat[0].nom)      
      },
      error: (error) => {
        console.error('Erreur lors de la création du produit', error);
        // Afficher un message d'erreur à l'utilisateur
      }
    })
  }

  onSubmit(): void {
    this.ravitaillementForm.markAllAsTouched();
    if (this.ravitaillementForm.valid) {

      const dataRav = {
        id_fournisseur : this.ravitaillementForm.get('fournisseur')?.value,
        titre : this.ravitaillementForm.get('nom')?.value,
        montant : this.ravitaillementForm.get('montant')?.value,
        date_creation : this.ravitaillementForm.get('dateCreation')?.value,
        date_validation : this.ravitaillementForm.get('dateValidation')?.value,
        remarque : this.ravitaillementForm.get('remarque')?.value
      }

      this.ravitailService.addRav(dataRav).subscribe({
        next : (response : ApiResponse) => {
            console.log("Response : ", response);
            this.router.navigate(['/ravitaillement'])
        },
        error : (err) => {
            console.log('Error : ',err);
            
        },
      })
    }
  }
}
