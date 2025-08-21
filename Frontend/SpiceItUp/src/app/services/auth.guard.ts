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

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const url = state.url;
    console.log(url.includes('route'));
    if (url.includes('/otp') && url.includes('route')) {
      if(this.auth.isForgotPasswordOTP()) {
        return true;
      }
      else {
        this.toastr.warning("Please enter email id first!", "", { timeOut: 1900, progressBar: true, progressAnimation: 'increasing' });
        this.router.navigate(['']);
        return false;
      }
    }
    // If trying to access OTP page
    if (url.includes('/otp')) {
      if (this.auth.isOtpRequired()) {
        return true;
      } else {
        this.toastr.warning("Please Enter login credentials!", "", { timeOut: 1900, progressBar: true, progressAnimation: 'increasing' });
        this.router.navigate(['']);
        return false;
      }
    }

    if (this.auth.isLoggedIn()) {
      return true;
    }
    // alert("You have not logged In");
    this.toastr.warning("You have not Login", "", { timeOut: 1900, progressBar: true, progressAnimation: 'increasing' });
    this.router.navigate(['']);
    return false;
  }

}
