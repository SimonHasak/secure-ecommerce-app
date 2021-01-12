import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; //do not delete
import { BrowserModule } from '@angular/platform-browser';
import {NotificationService} from "../../shared/services/notification.service"; //do not delete

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  names: string[] = ['carousel', 'advertisement', 'labels', 'sizes', 'images']

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  notify() {
    this.notificationService.showError('Not implemented yet!');
  }

}
