import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile-data.service';
import { FormControl, NgModel, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
// import { DailogboxComponent } from './dailogbox/dailogbox.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent {
  users: any = [];
  toggle = true;

  updateProfileForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  
  constructor(private userData: ProfileService , private toastr:ToastrService , public dialog: MatDialog, private _router: Router ) {
   

  }
  ngOnInit() {
    this.updateProfileForm.disable();
    const uid = localStorage.getItem('userId');
    console.log(uid);
    this.userData.addProfile(uid).subscribe((data: any) => {
      console.warn('data', data);
      this.users = data;
      console.log('new Data: ', this.users.user.first_name);
      
    });
  }

  updateProfile() {

    this.toggle = !this.toggle;
    if (!this.toggle) {
      this.updateProfileForm.enable();
    } else {
      this.updateProfileForm.disable();
    }

  }

  btnUpdate() {

    this.updateProfile();

      const data = this.updateProfileForm.value;
      console.log(this.users.user._id);
      this.userData.putProfile(data,this.users.user._id);
      this.toastr.success("Profile Updated successfully","",{timeOut:1700 , progressBar:true , progressAnimation:'increasing'});


  }
  
  // btndelete(){
    
  //   const data = this.updateProfileForm.value;
  //   console.log(data);
  //   this.userData.deleteProfile(data,this.users.user._id);
  //   this.toastr.error("Profile deleted successfully","",{timeOut:1500 , progressBar:true , progressAnimation:'increasing'});
     
  // }

  btndelete(){
    

    const confirmDialog = this.dialog.open(DialogboxComponent, {
      data: {
        title: 'Confirm Remove Employee',
        message: 'Are you sure, you want to remove a user: '
      }
    });
    confirmDialog.afterClosed().subscribe((result:any) => {
      if (result === true) {
        
        const data = this.updateProfileForm.value;
        console.log(data);
        this.userData.deleteProfile(data,this.users.user._id);
        this._router.navigate(['/']); 
      }
      
      
 });
  }



}


