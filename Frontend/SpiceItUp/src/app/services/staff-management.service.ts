import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class StaffManagementService {

  _baseUrl: any;

  constructor(private http: HttpClient) { 
    this._baseUrl = Constants.baseUrl;
   }

   getstaff(){
    let url = this._baseUrl+`/staff-management`;
    
    console.log("this is URL ", url);
    
    return this.http.get(url);
  }

  addstaff(data: any) {
    
    let url = this._baseUrl+`/staff-management`;
    return this.http.post(url, data); 
  }

  deleteStaff(id: string){
    
    let url = this._baseUrl+`/staff-management/`+id;
    return this.http.delete(url)
  }

  updateStaff(data: any, id: String){
    let url = this._baseUrl+`/staff-management/`+id;
    return this.http.put(url,data)
  }

}
