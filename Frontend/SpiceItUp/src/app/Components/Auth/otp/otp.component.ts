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
  userOtp: any;
  checkOtp: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private checkOtpService: CheckOtpService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }
  ngOnInit(): void {
    console.log("state value bypass by forgot password component", history.state)
    this.checkOtp = this.fb.group({
      email: [''],
      otp: ['', [Validators.required]],
    });
  }

  otp(data: any) {
    if (history.state.route === 'forgot_password') {
      this.route?.queryParams?.subscribe((params: any) => {
        this.nametodisplay = params;
      });

      this.checkOtp.value.email = this.nametodisplay.email;

      this.checkOtpService.check({ otp: this.checkOtp.value, routeType: history.state.route }).subscribe({
        next: (result: any) => {
          const userDetails = result;
          this.userOtp = userDetails;
          if (this.userOtp.otp) {
            localStorage.removeItem('forgot_password')
            this.router.navigate(['changepassword'], { queryParams: { email: userDetails.email } });
            this.toastr.success("Otp Verified", "", { timeOut: 1900, progressBar: true, progressAnimation: 'increasing' });
          }
        },
        error: () => {
          this.toastr.error("Otp not Verified", "", { timeOut: 1900, progressBar: true, progressAnimation: 'increasing' });
        }
      });
    }
    else {
      this.route?.queryParams?.subscribe((params: any) => {
        this.nametodisplay = params;
      });
      this.checkOtp.value.email = this.nametodisplay.email;
      console.log({ email: this.checkOtp.value.email, otp: this.checkOtp.value, routeType: history.state.route });

      this.checkOtpService.check({ email: this.checkOtp.value.email, otp: this.checkOtp.value, routeType: history.state.route }).subscribe({
        next: (result: any) => {
          const userDetails = result;
          this.userOtp = userDetails;
          if (this.userOtp.otp) {
            this.router.navigate(['home']);
            localStorage.setItem('loginUser', result.token);
            this.toastr.success("Otp Verified", "", { timeOut: 1900, progressBar: true, progressAnimation: 'increasing' });
          }
        },
        error: () => {
          this.toastr.error("Otp not Verified", "", { timeOut: 1900, progressBar: true, progressAnimation: 'increasing' });
        }
      });
    }
  }
}
