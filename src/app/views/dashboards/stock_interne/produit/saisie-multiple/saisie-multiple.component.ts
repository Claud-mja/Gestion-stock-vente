import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-saisie-multiple',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './saisie-multiple.component.html',
  styleUrl: './saisie-multiple.component.scss'
})
export class SaisieMultipleComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      caisse: ['CP', Validators.required],
      depot: ['iDEP1', Validators.required],
      type: ['iTYP1', Validators.required],
      category: ['iCAT1', Validators.required],
      products: this.fb.array([this.createProduct()])
    });
  }

  ngOnInit(): void { }

  get products(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  createProduct(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      ref: ['', Validators.required],
      threshold: [0, Validators.required],
      purchasePrice: [0, Validators.required],
      salePrice: [0, Validators.required],
      unit: ['UNTAR', Validators.required],
      save: [false]
    });
  }

  addProduct(): void {
    this.products.push(this.createProduct());
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
    }
  }
}
