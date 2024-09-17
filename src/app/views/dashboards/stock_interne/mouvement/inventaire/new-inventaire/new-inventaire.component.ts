import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-inventaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-inventaire.component.html',
  styleUrl: './new-inventaire.component.scss'
})
export class NewInventaireComponent {
  inventaireForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inventaireForm = this.fb.group({
      titre: ['', Validators.required],
      remarque: ['', Validators.required],
      responsable: ['', Validators.required],
      etat: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.inventaireForm.valid) {
      console.log(this.inventaireForm.value);
    }
  }
}
