import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerprofileService {
  _baseUrl: any;

  constructor(private http:HttpClient) {
    this._baseUrl = Constants.baseUrl;
  }

  getCustomerDetails(){
    let url = this._baseUrl+'/registration/getRegDetails'
   return this.http.get<any>(url)

  }

}
