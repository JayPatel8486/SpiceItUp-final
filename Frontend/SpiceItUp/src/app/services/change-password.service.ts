import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  _baseUrl: any;

  constructor(private http: HttpClient) {
    this._baseUrl = Constants.baseUrl;
  }

  forgotForm(data: any) {
    let   url = this._baseUrl+'/forgot-password/change-password';
    // return this.http.put(this.url, data);
    return this.http.patch(url,data);
  }


}