import { map, Observable } from 'rxjs';
import { Paginated } from '@/app/common/paginatrd.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RavitaillementCreate, RavitaillementInfo, RavitaillementList, RavitaillementListType } from '../../models/ravitaillement.model';
import { environment } from '@/environments/environment.development';
import { ApiResponse } from '@/app/common/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class RavitaillementService {

  constructor(private http : HttpClient) { }

  getRavs() : Observable<Paginated<RavitaillementListType>> {
    return this.http.get(`${environment.baseStockUrl}/ravitaillement`).pipe(
      map((response) => {
        
        return (response as ApiResponse).data as Paginated<RavitaillementListType>
      })
    );
  }

  getRav(id : string) : Observable<RavitaillementInfo> {
    return this.http.get(`${environment.baseStockUrl}/ravitaillement/${id}`).pipe(
      map((response) => {
        return (response as ApiResponse).data as RavitaillementInfo
      })
    );
  }

  addRav(dataRav : RavitaillementCreate) : Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/ravitaillement` ,
      dataRav
    ).pipe(
      map((response) => {
        return response as ApiResponse
      })
    );
  }

  updateRav(id : number,dataRavToUpdate : RavitaillementCreate) : Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/ravitaillement/${id}` ,
      dataRavToUpdate
    ).pipe(
      map((response) => {
        return response as ApiResponse
      })
    );
  }

  deleteRav(id : number) : Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/ravitaillement/${id}`
    ).pipe(
      map((response) => {
        return response as ApiResponse
      })
    );
  }

}
