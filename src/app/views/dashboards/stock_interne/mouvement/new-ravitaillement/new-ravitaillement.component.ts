import { Paginated } from '@/app/common/paginatrd.interface';
import { FournisseurList } from '@/app/core/models/fournisseur.model';
import { FournisseurService } from '@/app/core/service/stck/fournisseur.service';
import { RavitaillementService } from '@/app/core/service/stck/ravitaillement.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-ravitaillement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-ravitaillement.component.html',
  styleUrl: './new-ravitaillement.component.scss'
})
export class NewRavitaillementComponent {
  
  private forunService = inject(FournisseurService);
  private ravitailService = inject( RavitaillementService);

  ravitaillementForm: FormGroup;
  fourns !: FournisseurList[];

  constructor(private fb: FormBuilder, ) {
    this.ravitaillementForm = this.fb.group({
      fournisseur: ['', Validators.required],
      nom: ['', Validators.required],
      montant: [0, [Validators.required, Validators.min(0)]],
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
    if (this.ravitaillementForm.valid) {
      console.log(this.ravitaillementForm.value);
    }
  }
}
