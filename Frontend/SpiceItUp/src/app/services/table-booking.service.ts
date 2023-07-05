import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class TableBookingService {
  _baseUrl: any;

  constructor(private http: HttpClient) {
    this._baseUrl = Constants.baseUrl;
  }

  // private baseUrl = 'https://spiceitup-restaurant.onrender.com';

  addbooking(data: any) {
    let url = this._baseUrl + `/api/user/booking`;
    return this.http.post(url, data);
  }

  gettables(timeStamp: any): Observable<number[]> {
    let url =this._baseUrl + `/api/user/booking/checkAvailableTables?timeStamp=${timeStamp}`;
    console.log('this is URL ', url);
    return this.http.get<number[]>(url);
  }
}
