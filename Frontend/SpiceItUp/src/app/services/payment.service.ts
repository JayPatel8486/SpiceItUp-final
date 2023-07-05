import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http:HttpClient) {}

  makepayment(stripeToken: any,price:any): Observable<any> {
    console.log("vfdvdffv",price);
    return this.http.post<any>('http://localhost:4000/payment/pay', {
      token: stripeToken,
      price
    });
    
  }

  getGrandTotal(id:any) {
    return this.http.get<any>('http://localhost:4000/order',id);
  }
}
