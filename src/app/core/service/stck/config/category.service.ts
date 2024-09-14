import { ApiResponse } from '@/app/common/apiResponse';
import { Paginated } from '@/app/common/paginatrd.interface';
import { CategoryList } from '@/app/core/models/config/category.model';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getCategories(): Observable<Paginated<CategoryList>> { // Replace with your Category interface
    return this.http.get(`${environment.baseStockUrl}/category`).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<CategoryList>;
      })
    );
  }

  getCategory(id: string): Observable<CategoryList> { // Replace with your Category interface
    return this.http.get(`${environment.baseStockUrl}/category/${id}`).pipe(
      map((response) => {
        return (response as ApiResponse).data as CategoryList;
      })
    );
  }

  saveCategory(dataCat: any): Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/category`, dataCat).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  editCategory(id: string, categoryData: any): Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/category/${id}`, categoryData).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  deleteCategory(id: string): Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/category/${id}`).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }
}
