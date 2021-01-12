import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'X', {panelClass: ['alert-success']});
  }

  showInfo(message: string): void {
    this.snackBar.open(message, 'X', {panelClass: ['alert-info']});
  }

  showError(message: string): void {
    this.snackBar.open(message, 'X', {panelClass: ['alert-danger']});
  }

  // https://getbootstrap.com/docs/4.0/components/alerts/
  // List of all possible bootstrap alerts
}
