import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { ProfileService } from '../../../services/profile-data.service';
import { FormControl, NgModel, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { matchpassword } from './validator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userchangepassword',
  templateUrl: './userchangepassword.component.html',
  styleUrls: ['./userchangepassword.component.css']
})
export class UserchangepasswordComponent {
  hide1 = true;
  hide2 = true;
  hide3 = true;


  updatePassword = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]) 
  },
  {
    validators:matchpassword 
  });



  ngOnInit() {
     
  }

  constructor(private userData: ProfileService ,private toastr:ToastrService, private router:Router) {}
   
  btnUpdate(){

    const data = this.updatePassword.value;
    console.log(data);
    this.userData.putPassword(data);
    this.onLogOut();
   
   }

   onLogOut() {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('bookingId');
    localStorage.removeItem('lastAction');
    this.router.navigate(['']);
    // clearTimeout(this.tokenTimer);
  }
   
   btnBack(){
    this.toastr.info("Now You Are In ProfilePage","",{timeOut:1200 , progressBar:true , progressAnimation:'increasing'});
   }

}
