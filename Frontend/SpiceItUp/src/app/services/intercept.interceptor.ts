import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {
  
  constructor(private router: Router,
    private toastr: ToastrService, ) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403 || err.status === 502) {
      //navigate /delete cookies or whatever
      localStorage.removeItem('loginUser');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('bookingId');
      localStorage.removeItem('lastAction');
      this.router.navigate(['']);
      this.toastr.error('Access denied', '', {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing',
      });
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      // return of("hsdgfyggdgfg",err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Authentication Token
    const token: any = localStorage.getItem('loginUser');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', token),
      });
    }

    return next
      .handle(request)
      .pipe(catchError((x) => this.handleAuthError(x)));
  }
}
