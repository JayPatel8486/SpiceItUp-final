import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  _baseUrl: any;

  constructor(private http: HttpClient) {
    this._baseUrl = Constants.baseUrl;
  }

  loginForm(data: any) {
    let url = this._baseUrl+'/login';
    return this.http.post(url, data);
  }
}
