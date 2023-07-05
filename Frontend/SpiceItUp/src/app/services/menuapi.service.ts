import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface Menu {
  menu: any[]
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Ordered(_id: String) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getProduct(pageNumber: number, pageSize: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`http://localhost:4000/menu?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  filter(data: any){
    return this.http.get<any>('http://localhost:4000/menu/'+ data);
  }
  header(){
    return this.http.get('http://localhost:4000/menu/item/menu')
  }
}
