import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from "rxjs/operators";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../services/notification.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private userService: UserService,
              private router: Router,
              private notificationService: NotificationService) {}

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return next.handle(request).pipe(catchError( err => {
  //     if (err.status === 401) {
  //       // auto logout if 401 response returned from api
  //       this.userService.logout();
  //       this.router.navigate(['/']);
  //     }
  //
  //       const error = err.error || err.statusText;
  //       return throwError(error);
  //   }));
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          let userErrorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error

            if (error.status === 401) {
              // auto logout if 401 response returned from api
              // this.userService.logout();
              // this.router.navigate(['/']);
              userErrorMessage = 'You are not authenticated to go there.'
              this.notificationService.showError(userErrorMessage);
            } else if (error.status === 403) {
              userErrorMessage = 'You have forbidden access to this url address.'
              this.notificationService.showError(userErrorMessage);
            }

            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          return throwError(errorMessage);
        })
      )
  }
}
