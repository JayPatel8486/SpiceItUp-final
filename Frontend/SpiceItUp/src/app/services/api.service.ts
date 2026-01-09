import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TableOrder } from '../table-order';
import { User } from '../user';
import { Observable, catchError, throwError } from 'rxjs';
import { Order } from '../order';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getOrder: any;
  getCustomerOrders(uid: string | null) {
    throw new Error('Method not implemented.');
  }
  URL = 'http://localhost:4000/api/table_orders';


  constructor(private http: HttpClient) { }

  //This is Get All Order
  // Redirecting to Order Component
  getAllTableOrders(): Observable<TableOrder[]> {
    return this.http.get<TableOrder[]>(this.URL);
  }


  //This is for getting Order Details for Particular Table  
  // Redirecting to Customer-Order 
  datas: any = []
  GetOrder(data: any, booking_id: any): Observable<Order[]> {
    const url = `${this.URL}/orders/${booking_id}`;
    console.log("Booking Id", booking_id);
    console.log("data", data);

    // this.datas = data
    // console.log("items",this.datas);
    return this.http.get<Order[]>(url);
  }

  //This is for Update Status
  // Redirecting to Order Component
  UpdateStatus(_id: any): Observable<TableOrder> {
    const url = `${this.URL}/${_id}/update_status2`;
    return this.http.put<TableOrder>(url, {});
  }

  //This is for Update Status
  // Redirecting to Order Component
  UpdateTableStatus(id: any): Observable<TableOrder> {
    const url = `${this.URL}/${id}/update_status`;
    return this.http.put<TableOrder>(url, {});
  }

  //This is for getting Table Details for the user
  // Redirecting to Customer-Order Component
  getLoginUserData(id: any): Observable<{ tableorders: TableOrder[] }> {
    const url = `${this.URL}/UserId/${id}`;
    return this.http.get<{ tableorders: TableOrder[] }>(url, {});
  }

  //This is for getting Table Details for the user
  // Redirecting to Customer-Order Component
  // getOrders(id:any):Observable<Order[]>{
  //   const url=  `${this.URL}/order/${id}`;
  //   return this.http.get<Order[]>(url,{});
  // }


  //This is for Cancelling the Order
  // Redirecting to Customer-Order Component
  CancelTableOrder(id: any): Observable<TableOrder> {
    const url = `${this.URL}/cancel/${id}`;
    return this.http.put<TableOrder>(url, {});
  }

  //This is for Adding the Feedback
  // Redirecting to Customer-Order Component
  Feedback(_id: any, feedback: String): Observable<TableOrder> {
    const url = `${this.URL}/feedback/${_id}`;
    return this.http.put<TableOrder>(url, { feedback: feedback });
  }
}
