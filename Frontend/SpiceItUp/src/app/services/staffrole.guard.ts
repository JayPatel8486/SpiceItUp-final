import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffroleGuard implements CanActivate {
  
    canActivate(){
      let role = localStorage.getItem('userRole');
      if(role == "staff"){
        return true;
      }
      alert("you don't have staff rights")
    
      return false;
    }
  
}
