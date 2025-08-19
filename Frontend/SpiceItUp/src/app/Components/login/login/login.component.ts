import { Component, OnInit, NgZone } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const MINUTES_UNITL_AUTO_LOGOUT = 1; // in Minutes
const CHECK_INTERVALL = 1000; // in ms
const STORE_KEY = 'lastAction';

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  // private tokenTimer: any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private loginCheck: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone
  ) {
    this.check();
    this.initListener();
    this.initInterval();
  }
  loginForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  userdata: any;

  login() {
    const { email, password } = this.loginForm?.value;
    this.loginCheck.loginForm({ email, password }).subscribe({
      next: (result: any) => {
        console.log(result.data);
        const { user } = result.data;
        const { token } = result.data;
        this.userdata = user;
        console.log(this.userdata);
        if (this.userdata.email && this.userdata.password) {
          console.log(user._id);
          localStorage.setItem('loginUser', token);
          localStorage.setItem('userId', user._id);
          localStorage.setItem('userRole', user.user_role)
          this.router.navigate(['home']);
          this.toastr.success('Login successfull', '', {
            timeOut: 1000, progressBar: true, progressAnimation: 'increasing',
          });
        }
      },
      error: (err) => {
        if (err.error.message === "Invalid password") {
        this.toastr.error(`The email or password is incorrect. Account will lock after ${err.error.remainAttempt - 1} incorrect attempts(s).`, '' ,{
          timeOut: 1000, progressBar: true, progressAnimation: 'increasing'
        })
        }
        else { 
          this.toastr.error(err.error.message, '', {
            timeOut: 1000, progressBar: true, progressAnimation: 'increasing',
          });
        }
      },
    });
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

  get lastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  set lastAction(value: any) {
    localStorage.setItem(STORE_KEY, value);
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, CHECK_INTERVALL);
    });
  }

  reset() {
    this.lastAction = Date.now();
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    this.ngZone.run(() => {
      if (isTimeout) {
        console.log(`You were automatically logged out after ${MINUTES_UNITL_AUTO_LOGOUT} minutes of inactivity.`);
        this.onLogOut();
        this.router.navigate(['']);
      }
    });
  }
}
