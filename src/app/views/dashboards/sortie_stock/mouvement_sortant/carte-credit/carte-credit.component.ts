import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { mockProductData, Product } from './data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carte-credit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './carte-credit.component.html',
  styleUrl: './carte-credit.component.scss'
})
export class CarteCreditComponent {
  productForm: FormGroup;
  products = mockProductData;
  filteredProducts: Product[] = []; 

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      searchProduct: [''],
      unite: [''],
      depot: [''],
      caisse: [''],
      quantite: [1],
      payment: ['Espèce'],
      billet: ['']
    });
  }

  ngOnInit(): void {
    this.filteredProducts = this.products;
    this.productForm.get('searchProduct')?.valueChanges.subscribe(value => {
      this.filterProducts(value);
    });
  }

  filterProducts(searchText: string): void {
    if (!searchText) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }

  onSubmit(): void {
    console.log(this.productForm.value);
  }
}
