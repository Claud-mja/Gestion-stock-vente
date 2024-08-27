import { TableConfig } from "@/app/common/table-config";
import { environment } from "@/environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export class TableDynamicService{

    constructor(private http : HttpClient) { }

    getData(configTable : TableConfig):Observable<Object[]>{
        const token = localStorage.getItem('token');
        // const headers = new HttpHeaders().set(
        //   'Authorization',
        //   `Bearer ${token}`
        // );
        return this.http.get<Object[]>(`${environment.baseUrl}/${configTable.tools}` , { headers : {} });
      }
    
      getDataById(configTable : TableConfig , id : string):Observable<Object>{
        const token = localStorage.getItem('token');
        // const headers = new HttpHeaders().set(
        //   'Authorization',
        //   `Bearer ${token}`
        // );
        return this.http.get<Object>(`${environment.baseUrl}/${configTable.tools}/${id}` , { headers : {} });
      }
    
      updateData(configTable : TableConfig ,dataBody :  Object ):Observable<any>{
        const token = localStorage.getItem('token');
        // const headers = new HttpHeaders().set(
        //   'Authorization',
        //   `Bearer ${token}`
        // );
        return this.http.put<Object>(`${environment.baseUrl}/${configTable.tools}`, dataBody , {headers : {}});
      }
    
      deleteData(configTable : TableConfig , id :  string){
        const token = localStorage.getItem('token');
        // const headers = new HttpHeaders().set(
        //   'Authorization',
        //   `Bearer ${token}`
        // );
        return this.http.delete(`${environment.baseUrl}/${configTable.tools}/${id}` , { headers : {} });
      }
}