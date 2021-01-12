import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {BehaviorSubject, Observable, of, Subject, throwError} from "rxjs";
import {JwtResponse} from "../models/jwtResponse";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {catchError, tap} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {User} from "../models/user";
import {LoginForm} from "../models/loginForm";
import {ProductDetailDTO} from "../dto/productDetailDTO";
import {UserDTO} from "../dto/userDTO";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private errorWrongCredentialsSubject: BehaviorSubject<string>;
  private currentUserSubject: BehaviorSubject<JwtResponse>;
  public currentUser: Observable<JwtResponse>;
  public nameTerms = new Subject<string>();
  public name$ = this.nameTerms.asObservable();

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
    const userStorageData = this.getCurrentUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(userStorageData));
    this.currentUser = this.currentUserSubject.asObservable();
    this.errorWrongCredentialsSubject = new BehaviorSubject<string>(null);
    cookieService.set('currentUser', userStorageData, {expires: 14, path: '/', sameSite: 'Lax'});
  }

  getErrorWrongCredentials(): Observable<string> {
    return this.errorWrongCredentialsSubject.asObservable();
  }

  setErrorWrongCredentials(message: string) {
    return this.errorWrongCredentialsSubject.next(message);
  }

  getCurrentUserFromStorage() {
    let data = localStorage.getItem('currentUser');
    return data ? data : sessionStorage.getItem('currentUser');
  }

  get currentUserLocalStorage() {
    return localStorage.getItem('currentUser');
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(loginForm: LoginForm): Observable<JwtResponse> {
    const url = `${environment.apiUrl}user/login`;
    console.log(loginForm);
    return this.http.post<JwtResponse>(url, { username: loginForm.username, password: loginForm.password }).pipe(
      tap(user => {
        console.log(user);
        if (user && user.token) {
          this.cookieService.set('currentUser', JSON.stringify(user), {expires: 14, path: '/', sameSite: 'Lax'});

          if (loginForm.isRemembered) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.nameTerms.next(user.email);
          this.currentUserSubject.next(user);
          return user;
        }
      }),
      catchError(err => {
        console.log("wrong name or password");
        this.setErrorWrongCredentials('Wrong email or password!');
        return this.handleError('Login Failed', null)
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.cookieService.delete('currentUser');
  }

  signUp(user: UserDTO): Observable<UserDTO> {
    console.log('Registering user... service');
    return this.http.post<UserDTO>(`api/user/register`, user).pipe(
      catchError(err => { return throwError(err); })
    );
  }

  // update(user: User): Observable<User> {
  //   const url = `${environment.apiUrl}/profile`;
  //   return this.http.put<User>(url, user);
  // }
  //
  // get(email: string): Observable<User> {
  //   const url = `${environment.apiUrl}/profile/${email}`;
  //   return this.http.get<User>(url);
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('ahoj handle error');
      console.log(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
