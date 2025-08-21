import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,FormGroupDirective,NgForm,FormBuilder,FormArray} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConfirmedValidator } from '../registration/confirmed.validator';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  hides = true;
  nametodisplay: any;
  matcher = new MyErrorStateMatcher();

  constructor(private changePasswordService: ChangePasswordService,private fb: FormBuilder,private route: ActivatedRoute,private router: Router,private toastr: ToastrService) {}
  changePasswordForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group(
      {
        email: [''],
        password: ['', [Validators.required,,Validators.minLength(4)]],
        confirm_password: ['', [Validators.required]],
      },
      {
        validator: ConfirmedValidator('password', 'confirm_password'),
      }
    );
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  changed(data: any) {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      this.nametodisplay = params;
    });
    
    this.changePasswordForm.value.email = this.nametodisplay.email;
    console.log('email: ', this.changePasswordForm.value.email);

    this.changePasswordService
      .forgotForm(this.changePasswordForm.value)
      .subscribe((result) => {
        console.warn(result);
        this.router.navigate(['']);
        this.toastr.success('Password has been changed', '', {timeOut: 1900,progressBar: true,progressAnimation: 'increasing'});
      });
  }
}
