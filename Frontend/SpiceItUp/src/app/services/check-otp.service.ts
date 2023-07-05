import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CheckOtpService {

 
  _baseUrl: any;

  constructor(private http: HttpClient) {
    this._baseUrl = Constants.baseUrl;
  }

  check(data: any) {
    let  url = this._baseUrl+'/forgot-password/checkOtp';
    return this.http.post(url, data);
  }
}
