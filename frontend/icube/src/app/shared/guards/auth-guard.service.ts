import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "../services/auth-service";
import {UserService} from "../services/user.service";
import {Role} from "../enums/Role";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate(): Observable<boolean> {

    if (!this.auth.isAuthenticated() ||
      !this.auth.isAdmin().subscribe(isAdmin => {return isAdmin})) {

      this.router.navigate(['/']);
      return of(false);
    }
    return of(true);
  }

}
