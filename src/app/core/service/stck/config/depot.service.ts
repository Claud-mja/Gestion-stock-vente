import { ApiResponse } from '@/app/common/apiResponse';
import { Paginated } from '@/app/common/paginatrd.interface';
import { DepotList } from '@/app/core/models/config/depot.model';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http: HttpClient) { }

  getDepots(): Observable<Paginated<DepotList>> { // Remplacez par votre interface Depot
    return this.http.get(`${environment.baseStockUrl}/depot`).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<DepotList>;
      })
    );
  }

  getDepot(id: string): Observable<DepotList> { // Remplacez par votre interface Depot
    return this.http.get(`${environment.baseStockUrl}/depot/${id}`).pipe(
      map((response) => {
        return (response as ApiResponse).data as DepotList;
      })
    );
  }

  saveDepot(dataDepot: any): Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/depot`, dataDepot).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  editDepot(id: string, depotData: any): Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/depot/${id}`, depotData).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }

  deleteDepot(id: string): Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/depot/${id}`).pipe(
      map((response) => {
        return response as ApiResponse;
      })
    );
  }
}
