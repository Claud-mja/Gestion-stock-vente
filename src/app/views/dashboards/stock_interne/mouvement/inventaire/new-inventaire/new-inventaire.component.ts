import { ApiResponse } from '@/app/common/apiResponse';
import { Paginated } from '@/app/common/paginatrd.interface';
import { InventaireCreate } from '@/app/core/models/inventaire.model';
import { InventaireService } from '@/app/core/service/stck/inventaire.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-inventaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-inventaire.component.html',
  styleUrl: './new-inventaire.component.scss'
})
export class NewInventaireComponent {

  private invService  = inject(InventaireService);
  inventaireForm: FormGroup;
  maxDate: string;

  constructor(private fb: FormBuilder, private router : Router) {
    const now = new Date();
    this.maxDate = now.toISOString().substring(0, 10); 
    this.inventaireForm = this.fb.group({
      titre: ['', Validators.required],
      remarque: [''],
      date_creation : [this.maxDate  , Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.inventaireForm.markAllAsTouched();
    if (this.inventaireForm.valid) {
      console.log(this.inventaireForm.value);
      const invData = this.inventaireForm.value as InventaireCreate;

      this.invService.addInv(invData).subscribe({
        next : (response : ApiResponse) => {
          console.log(response);
          this.router.navigate(['/dashboard/stock-interne/mouvement-stock/inventaire'])
        },
        error : (error : HttpErrorResponse) => {
          console.log(" Error : Insertion Inventaire", error);
        }
      })
    }
  }
}
