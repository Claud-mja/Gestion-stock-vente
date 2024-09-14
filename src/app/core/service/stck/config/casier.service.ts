import { ApiResponse } from '@/app/common/apiResponse';
import { Paginated } from '@/app/common/paginatrd.interface';
import { QueryParam } from '@/app/common/queryRequest';
import { buildQueriesParams } from '@/app/core/helpers/utils';
import { CasierList } from '@/app/core/models/config/casier.model';
import { environment } from '@/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasierService {

  constructor(private http: HttpClient) { }

  getCasiers(queries ?: QueryParam[]): Observable<Paginated<CasierList>> { // Replace with your Casier interface

    let params = new HttpParams();

    if (queries && queries.length>0) {
      params = buildQueriesParams(queries);
    }

    return this.http.get(`${environment.baseStockUrl}/casier` , {
      params : params.keys().length ? params : undefined
    }).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<CasierList>;
      })
    );
  }

  getCasier(id: string): Observable<CasierList> { // Replace with your Casier interface
    return this.http.get(`${environment.baseStockUrl}/casier/${id}`).pipe(
      map((response) => {
        return (response as ApiResponse).data as CasierList;
      })
    );
  }

  saveCasier(dataCasier: any): Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/casier`, dataCasier).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  editCasier(id: string, casierData: any): Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/casier/${id}`, casierData).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  deleteCasier(id: string): Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/casier/${id}`).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }
}
