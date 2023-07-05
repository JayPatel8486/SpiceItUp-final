import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  constructor(private http: HttpClient,private toastr:ToastrService) {}

  addProfile(cid : any ) {
    let url = `http://localhost:4000/api/user/profile/`+cid;
    return this.http.get(url);
  }

  putProfile(data:any,id:string){
    let url = `http://localhost:4000/api/user/profile/`+id;
    console.log(":::",data)
    return this.http.put(url,data).subscribe((result)=>{
      console.log(result);
    })
  }
  
  deleteProfile(data:any,id:string){
    let url = `http://localhost:4000/api/user/profile/`+id;
    console.log(data)
    return this.http.delete(url,data).subscribe((result)=>{
      console.log(result);
    })
  }

  putPassword(data:any){
    const uid = localStorage.getItem('userId');
    console.log(uid);
    let passUrl = 'http://localhost:4000/api/user/profile/update/'+uid;
    console.log(data)
    return this.http.put(passUrl,data).subscribe((result)=>{
      console.log(result);
      this.toastr.success("Password Update successfully","",{timeOut:1200 , progressBar:true , progressAnimation:'increasing'});
    },(error)=>{
      console.log("password",error)
      this.toastr.error(error.error,"",{timeOut:1500 , progressBar:true , progressAnimation:'increasing'});
    })
  }

}