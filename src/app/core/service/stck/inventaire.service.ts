import { Paginated } from '@/app/common/paginatrd.interface';
import { QueryParam } from '@/app/common/queryRequest';
import { environment } from '@/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { InventaireCreate, InventaireList } from '../../models/inventaire.model';
import { buildQueriesParams } from '../../helpers/utils';
import { ApiResponse } from '@/app/common/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class InventaireService {

  constructor(private http : HttpClient) { }

  getInvs(queries ?: QueryParam[]) : Observable<Paginated<InventaireList>>  {
    let params = new HttpParams();

    if (queries && queries.length>0) {
      params = buildQueriesParams(queries);
    }
    
    return this.http.get(`${environment.baseStockUrl}/inventaire`,
      {
        params :  params.keys().length ? params : undefined
      }
    ).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<InventaireList>;
      })
    );
  }

  getInv(id : string) : Observable<InventaireList> {
    return this.http.get(`${environment.baseStockUrl}/inventaire/${id}`).pipe(
      map((response) => {
        return (response as ApiResponse).data as InventaireList;
      })
    );
  }

  addInv(dataInv : InventaireCreate) : Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/inventaire` , dataInv).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  deleteInv(idInv : string) : Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/inventaire`).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  editInv(idInv : string , dataToUpdate : Partial<InventaireCreate>) : Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/inventaire`, dataToUpdate).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }
}
