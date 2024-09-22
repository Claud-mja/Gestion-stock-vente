import { QueryParam } from '@/app/common/queryRequest';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buildQueriesParams } from '../../helpers/utils';
import { Paginated } from '@/app/common/paginatrd.interface';
import { map, Observable } from 'rxjs';
import { environment } from '@/environments/environment.development';
import { ApiResponse } from '@/app/common/apiResponse';
import { InvDetailList } from '../../models/inventaireDetails.model';

@Injectable({
  providedIn: 'root'
})
export class InventaireDetailsService {

  constructor(private http : HttpClient) { }

  getInvDetails(queries : QueryParam[]) : Observable<Paginated<InvDetailList>> {
    let params = new HttpParams();

    if (queries && queries.length>0) {
      params = buildQueriesParams(queries);
    }
    
    return this.http.get(`${environment.baseStockUrl}/inventaireDetails`,
      {
        params :  params.keys().length ? params : undefined
      }
    ).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<InvDetailList>;
      })
    );
  }

  addDetails (details : InvDetailList) : Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/inventaireDetails` , details).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  addMultipleDetails ( details : InvDetailList[]) : Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/inventaireDetails/add-multi` , details).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  editMultipleDetails ( idRav : string ,details : InvDetailList[]) : Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/inventaireDetails/edit-multi/${idRav}` , details).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  deleteDetails( id : string ) : Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/inventaireDetails/${id}`).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  compareInvDetails(ravDetail1: InvDetailList, ravDetail2: InvDetailList): boolean {
    return ravDetail1.qt_theorique === ravDetail2.qt_theorique
  }

  validDetails(idRav : string) : Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/inventaireDetails/valid/${idRav}`,{}).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }
  
  
}
