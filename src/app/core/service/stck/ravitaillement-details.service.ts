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

  addDetails (details : any) : Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/ravitaillementDetails` , details).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  addMultipleDetails ( details : any[]) : Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/ravitaillementDetails/add-multi` , details).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }
}
