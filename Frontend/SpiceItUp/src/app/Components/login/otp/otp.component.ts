import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckOtpService } from 'src/app/services/check-otp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  nametodisplay: any;
  constructor(private fb: FormBuilder,private checkOtpService: CheckOtpService,private router:Router,private route:ActivatedRoute,private toastr: ToastrService) {}

  checkOtp: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.checkOtp = this.fb.group({
      email: [''],
      otp: ['',[Validators.required]],
    });
  }

  userOtp:any

  otp(data: any) {

    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      this.nametodisplay = params;
    });
    
    this.checkOtp.value.email = this.nametodisplay.email;
    console.log('user email: ', this.checkOtp.value.email);

    this.checkOtpService.check(this.checkOtp.value).subscribe({
      next: (result:any) => {
        const userDetails = result;
        this.userOtp = userDetails;
        if(this.userOtp.otp){
          this.router.navigate(['changepassword'],{queryParams:{email:userDetails.email}});
          // {email:userDetails.email}
          //{queryParams:userDetails.email}
          console.log(userDetails.email);
          this.toastr.success("Otp Verified","",{timeOut:1900 , progressBar:true , progressAnimation:'increasing'});
        }
      },
      error: ()=>{
        this.toastr.error("Otp not Verified","",{timeOut:1900 , progressBar:true , progressAnimation:'increasing'});
      }
    });
  }
}
  