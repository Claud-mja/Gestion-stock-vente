import { ApiResponse } from '@/app/common/apiResponse';
import { Paginated } from '@/app/common/paginatrd.interface';
import { TypeList } from '@/app/core/models/config/type.model';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Paginated<TypeList>> { // Remplacez par votre interface Type
    return this.http.get(`${environment.baseStockUrl}/type`).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<TypeList>;
      })
    );
  }

  getType(id: string): Observable<TypeList> { // Remplacez par votre interface Type
    return this.http.get(`${environment.baseStockUrl}/type/${id}`).pipe(
      map((response) => {
        return (response as ApiResponse).data as TypeList;
      })
    );
  }

  saveType(dataType: any): Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/type`, dataType).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  editType(id: string, typeData: any): Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/type/${id}`, typeData).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  deleteType(id: string): Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/type/${id}`).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }
}
