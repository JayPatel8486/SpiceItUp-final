import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn() {
    return !!localStorage.getItem('loginUser');
  }

  isOtpRequired() {
    return !!localStorage.getItem('userId') && !localStorage.getItem('loginUser');
  }

  isForgotPasswordOTP() {
    return !!localStorage.getItem('forgot_password');
  }
}
