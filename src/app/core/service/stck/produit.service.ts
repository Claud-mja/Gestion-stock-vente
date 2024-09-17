import { PageDetails, Paginated } from '@/app/common/paginatrd.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProduitCreate, ProduitInfo, ProduitList } from '../../models/produit.model';
import { environment } from '@/environments/environment.development';
import { ApiResponse } from '@/app/common/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http : HttpClient) { }

  getProduits(pageDetails : PageDetails) :  Observable<Paginated<ProduitList>> {
    let params = new HttpParams()
      .set('$page[rang]' , pageDetails.page_now)
      .set('$page[limit]' , pageDetails.data_limit)
    return this.http.get(`${environment.baseStockUrl}/produit`,{ 
      params
     }).pipe(
      map((response) => {
        return (response as ApiResponse).data as Paginated<ProduitList>
      })
    );
  }

  getProduit(id : string) : Observable<ProduitInfo> {
    return this.http.get(`${environment.baseStockUrl}/produit/${id}`).pipe(
      map((response) => {
        return (response as ApiResponse).data as ProduitInfo
      })
    );
  }

  saveProduit(dataProd : any , file : File | null) : Observable<ApiResponse> {
    const formData : FormData = new FormData();
    formData.append('prod' , JSON.stringify(dataProd));
    if (file!=null) {
      formData.append('file' , file );
    }

    console.log(formData);
    
    return this.http.post(`${environment.baseStockUrl}/produit` , formData).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  saveMultiProduit(dataProd : any[]) : Observable<ApiResponse> {
    return this.http.post(`${environment.baseStockUrl}/produit/add-multi` , dataProd).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  editProduit(id : string , produitData : any) : Observable<ApiResponse> {
    return this.http.put(`${environment.baseStockUrl}/produit/${id}`, produitData).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }

  deleteProduit(id : string) : Observable<ApiResponse> {
    return this.http.delete(`${environment.baseStockUrl}/produit/${id}`).pipe(
      map((response) => {
        return response as ApiResponse
      })
    )
  }
}
