import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-ravitaillement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-ravitaillement.component.html',
  styleUrl: './new-ravitaillement.component.scss'
})
export class NewRavitaillementComponent {
  ravitaillementForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ravitaillementForm = this.fb.group({
      fournisseur: ['', Validators.required],
      nom: ['', Validators.required],
      montant: [0, [Validators.required, Validators.min(0)]],
      dateCreation: [new Date(), Validators.required],
      dateValidation: [new Date(), Validators.required],
      remarque: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.ravitaillementForm.valid) {
      console.log(this.ravitaillementForm.value);
    }
  }
}
