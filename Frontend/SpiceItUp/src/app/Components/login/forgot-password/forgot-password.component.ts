import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  hide = true;
  nametodisplay:any
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userdata:any
  name:any
  matcher = new MyErrorStateMatcher();
  data: any;

  constructor(private fb:FormBuilder,private forgotpasswordservice:ForgotPasswordService,private router:Router,private toastr: ToastrService,private route: ActivatedRoute){}

  forgotForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email:['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })
  }

  get email(){
    return this.forgotForm.get('email')?.value
  }
  
  forgoted(data:any){
    this.forgotpasswordservice.forgotPassword(data).subscribe({
      next: (result)=>{
        this.userdata = result
        if(this.userdata.email){
          this.router.navigate(['otp'],{queryParams:{email:this.userdata.email}});
          this.toastr.success("Verified","",{timeOut:1900 , progressBar:true , progressAnimation:'increasing'});
        }
      },
      error: ()=> {
        this.toastr.error("Not verified","",{timeOut:1900 , progressBar:true , progressAnimation:'increasing'});
      }
    })
  }

}
