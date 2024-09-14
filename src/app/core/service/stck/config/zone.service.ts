import { ApiResponse } from '@/app/common/apiResponse';
import { Paginated } from '@/app/common/paginatrd.interface';
import { QueryParam } from '@/app/common/queryRequest';
import { buildQueriesParams } from '@/app/core/helpers/utils';
import { ZoneList } from '@/app/core/models/config/zone.model';
import { environment } from '@/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http: HttpClient) { }

  getZones(queries ?: QueryParam[]): Observable<Paginated<ZoneList>> { // Remplacez par votre interface Zone
    let params = new HttpParams();

    if (queries && queries.length>0) {
      params = buildQueriesParams(queries);
    }
    

    return this.http.get(`${environment.baseStockUrl}/zone`,
      {
        params :  params.keys().length ? params : undefined
      }
    ).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<ZoneList>;
      })
    );
  }

  getZone(id: string): Observable<ZoneList> { // Remplacez par votre interface Zone
    return this.http.get(`${environment.baseStockUrl}/zone/${id}`).pipe(
      map((response) => {
        return (response as ApiResponse).data as ZoneList;
      })
    );
  }

  saveZone(dataZone: any): Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/zone`, dataZone).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  editZone(id: string, zoneData: any): Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/zone/${id}`, zoneData).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  deleteZone(id: string): Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/zone/${id}`).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }
}
