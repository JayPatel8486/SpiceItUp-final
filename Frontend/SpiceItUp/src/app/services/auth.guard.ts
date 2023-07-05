import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth:AuthService,private router:Router,private toastr: ToastrService) { }
  canActivate(){
    if(this.auth.isLoggedIn()){
      return true;
    }
    // alert("You have not logged In");
    this.toastr.warning ("You have not Login","",{timeOut:1900 , progressBar:true , progressAnimation:'increasing'});
    
    this.router.navigate(['']);
    return false;
  }
  
}
