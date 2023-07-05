import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';


@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  _baseUrl: any;

  

  constructor(private http: HttpClient) {
    this._baseUrl = Constants.baseUrl;
  }
 

  submitForm(data: any) {
    let url = this._baseUrl + '/registration';
    return this.http.post(url, data);
  }
}
