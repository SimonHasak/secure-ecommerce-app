import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "./user.service";
import {Role} from "../enums/Role";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService,
              private userService: UserService) { }


  public getToken(): string {
    const currentUser = this.userService.currentUserValue;
    return currentUser ? currentUser.token : null;
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin(): Observable<boolean> {
    const currentUser = this.userService.currentUserValue;
    return currentUser ? of(currentUser.role === Role.ADMIN) : of(false);
  }

}
