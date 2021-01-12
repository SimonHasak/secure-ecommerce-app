import { Component, OnInit } from '@angular/core';
import {AdminUserService} from '../shared/service/admin-user.service';
import {UserViewDTO} from '../shared/model/userViewDTO';
import {Page} from "../../shared/models/page";
import { CommonModule } from '@angular/common'; //do not delete
import { BrowserModule } from '@angular/platform-browser'; //do not delete
import {NotificationService} from "../../shared/services/notification.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserViewDTO[];

  currrentPage: Page<any> = new Page<any>([]);

  isLoading: boolean = true;

  sortingValues: string[] = ['Najnovšie', 'Najlacnejšie', 'Najdrahšie', 'Abecedne a-z', 'Abecedne z-a'];
  filter: string = this.sortingValues[0];

  previousPage = 1;

  constructor(private adminUserService: AdminUserService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initPage();
    this.fetchUsersData();
  }

  fetchUsersData() {
    this.isLoading = true;
    this.adminUserService.getAllUsers(this.currrentPage.pageable).subscribe( page => {
      if (page) {
        this.currrentPage = page;
        this.users = page.content;

        this.isLoading = false;
      }
    })
  }

  onDelete(user: UserViewDTO) {
    console.log('delete user ' + user.id);
    this.adminUserService.deleteUser(user).subscribe(result => {
      this.users = this.users.filter(u => u.id !== user.id);
      this.notificationService.showInfo(`User ${user.email} was successfully deleted.`);
    }, error => console.log('error on delete user ' + error));
  }

  loadPage() {
    if (this.currrentPage.pageable.pageNumber == this.previousPage) return;

    this.previousPage = this.currrentPage.pageable.pageNumber;
    this.fetchUsersData();
  }

  initPage() {
    //for different page indexing
    this.currrentPage.pageable.pageNumber++;
  }

  onChange(index: number) {
    this.filter = this.sortingValues[index];
    // this.doSort()
  }

}
