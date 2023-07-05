import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


interface Menu {
  menu: any[]
}
@Injectable({
  providedIn: 'root'
})
export class AddmenuService {

  
  constructor(private http: HttpClient) { }

  getProduct(pageNumber: number, pageSize: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`http://localhost:4000/menu?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(
      map((response: any) => {
        return response;
      })
    );
    }
  postProduct(data:any){
    
    return this.http.post<any>("http://localhost:4000/menu/",data)
  }

  putProduct(data:any, id: string){
    return this.http.put<any>("http://localhost:4000/menu/"+id,data)
  }

  deleteProduct(id: string){
    
    return this.http.delete<any>("http://localhost:4000/menu/"+id)
  }
  
}
