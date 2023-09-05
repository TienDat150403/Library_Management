import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../_service/auth/authentication.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: any) => {
      if (err.status === 401) {
        // redirect to the logout route
        this.authService.logOut();
      }
      const error = err.error.message || err.statusText;
      return throwError(() => error);
    }))
  }
}
