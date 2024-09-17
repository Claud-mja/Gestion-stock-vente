import { Injectable } from '@angular/core';
import { FournisseurList } from '../../models/fournisseur.model';
import { QueryParam } from '@/app/common/queryRequest';
import { ApiResponse } from '@/app/common/apiResponse';
import { Paginated } from '@/app/common/paginatrd.interface';
import { environment } from '@/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { buildQueriesParams } from '../../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http : HttpClient) { }

  getFournisseurs(queries ?: QueryParam[]): Observable<Paginated<FournisseurList>> {
    let params = new HttpParams();

    if (queries && queries.length>0) {
      params = buildQueriesParams(queries);
    }
    
      
    return this.http.get(`${environment.baseStockUrl}/fournisseur`, { 
      params :  params.keys().length ? params : undefined
    }).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<FournisseurList>;
      })
    );
  }

  // getFournisseur(id: string): Observable<FournisseurInfo> {
  //   return this.http.get(`${environment.baseStockUrl}/fournisseur/${id}`).pipe(
  //     map((response) => {
  //       return (response as ApiResponse).data as FournisseurInfo;
  //     })
  //   );
  // }

  saveFournisseur(dataFournisseur: any, file: File | null): Observable<ApiResponse> {
    const formData: FormData = new FormData();
    formData.append('fournisseur', JSON.stringify(dataFournisseur));
    
    if (file !== null) {
      formData.append('file', file);
    }

    return this.http.post(`${environment.baseStockUrl}/fournisseur`, formData).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  saveMultiFournisseur(dataFournisseurs: any[]): Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/fournisseur/add-multi`, dataFournisseurs).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  editFournisseur(id: string, fournisseurData: any): Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/fournisseur/${id}`, fournisseurData).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  deleteFournisseur(id: string): Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/fournisseur/${id}`).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }
}
