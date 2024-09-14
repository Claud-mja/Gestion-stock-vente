import { ApiResponse } from '@/app/common/apiResponse';
import { Paginated } from '@/app/common/paginatrd.interface';
import { UniteList } from '@/app/core/models/config/uniter.model';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniterService {

  constructor(private http: HttpClient) { }

  getUnites(): Observable<Paginated<UniteList>> { // Remplacez par votre interface Unite
    return this.http.get(`${environment.baseStockUrl}/unite`).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<UniteList>;
      })
    );
  }

  getUnite(id: string): Observable<UniteList> { // Remplacez par votre interface Unite
    return this.http.get(`${environment.baseStockUrl}/unite/${id}`).pipe(
      map((response) => {
        return (response as ApiResponse).data as UniteList;
      })
    );
  }

  saveUnite(dataUnite: any): Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/unite`, dataUnite).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  editUnite(id: string, uniteData: any): Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/unite/${id}`, uniteData).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  deleteUnite(id: string): Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/unite/${id}`).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }
}
