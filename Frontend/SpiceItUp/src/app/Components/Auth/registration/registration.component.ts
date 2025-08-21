import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,FormGroupDirective,NgForm, FormBuilder, FormArray} from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConfirmedValidator } from './confirmed.validator';
import { Router } from '@angular/router';
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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  hide = true;

  hides = true

  matcher = new MyErrorStateMatcher();
  
  details:any
  constructor(private sendReg:RegistrationService,private fb:FormBuilder,private route:Router,private toastr: ToastrService){ }
  registrationForm: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      first_name:['', [Validators.required]],
      last_name:['',[Validators.required]],
      gender:['', [Validators.required]],
      phone:['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      email:['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password:['', [Validators.required,Validators.minLength(4)]],
        confirm_password: ['', [Validators.required]]
    },
    {
      validator:ConfirmedValidator('password','confirm_password')
    }
    )
  }


  get f(){
    return this.registrationForm.controls;
  }


  register(data:any){
    this.sendReg.submitForm(data).subscribe({
      next:(result)=>{
        console.warn(result);
        if(result){
          this.route.navigate(['']);
          this.toastr.success("Registration successfull","",{timeOut:1500 , progressBar:true , progressAnimation:'increasing'});      }
        else{
          console.log("registration not successfull...");
        }
      },
      error: ()=>{
        console.log("cfdcdfsc",data.email);
        console.log("cfdcdfsc",data.phone);
        if(data.email)
        this.toastr.error("email already registered","",{timeOut:1500 , progressBar:true , progressAnimation:'increasing'});      
      }
    })
  }
}