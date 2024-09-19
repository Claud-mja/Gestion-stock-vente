import { Paginated } from '@/app/common/paginatrd.interface';
import { QueryParam } from '@/app/common/queryRequest';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RavDetailsList } from '../../models/ravitaillementDetails.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { buildQueriesParams } from '../../helpers/utils';
import { environment } from '@/environments/environment.development';
import { ApiResponse } from '@/app/common/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class RavitaillementDetailsService {

  constructor(private http : HttpClient) { }

  getRavDetails(queries : QueryParam[]) : Observable<Paginated<RavDetailsList>> {
    let params = new HttpParams();

    if (queries && queries.length>0) {
      params = buildQueriesParams(queries);
    }
    
    return this.http.get(`${environment.baseStockUrl}/ravitaillementDetails`,
      {
        params :  params.keys().length ? params : undefined
      }
    ).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<RavDetailsList>;
      })
    );
  }

  addDetails (details : RavDetailsList) : Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/ravitaillementDetails` , details).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  addMultipleDetails ( details : RavDetailsList[]) : Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/ravitaillementDetails/add-multi` , details).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  editMultipleDetails ( idRav : string ,details : RavDetailsList[]) : Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/ravitaillementDetails/edit-multi/${idRav}` , details).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  deleteDetails( id : string ) : Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/ravitaillementDetails/${id}`).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  compareRavDetails(ravDetail1: RavDetailsList, ravDetail2: RavDetailsList): boolean {
    return ravDetail1.pu_achat === ravDetail2.pu_achat &&
           ravDetail1.pu_vente === ravDetail2.pu_vente &&
           ravDetail1.qt_ajouter === ravDetail2.qt_ajouter 
  }

  validDetails(idRav : string) : Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/ravitaillementDetails/valid/${idRav}`,{}).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }
  
}
