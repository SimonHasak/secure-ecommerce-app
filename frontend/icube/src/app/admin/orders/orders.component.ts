import { Component, OnInit } from '@angular/core';
import {UserViewDTO} from "../shared/model/userViewDTO";
import {Page} from "../../shared/models/page";
import {AdminUserService} from "../shared/service/admin-user.service";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = ['order1', 'order2', 'order3', 'order4'];

  currrentPage: Page<any> = new Page<any>([]);

  isLoading: boolean = false;

  previousPage = 1;

  sortingValues: string[] = ['Najnovšie', 'Najlacnejšie', 'Najdrahšie', 'Abecedne a-z', 'Abecedne z-a'];
  filter: string = this.sortingValues[0];

  constructor(private adminUserService: AdminUserService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initPage();
    // this.fetchOrdersData();
  }

  fetchOrdersData() {
    this.isLoading = true;
    this.adminUserService.getAllUsers(this.currrentPage.pageable).subscribe( page => {
      if (page) {
        this.currrentPage = page;
        this.orders = page.content;

        this.isLoading = false;
      }
    })
  }

  onDelete(order: any) {
    console.log('delete order ' + order.id);
    // this.adminUserService.deleteUser(order).subscribe(() => {
    //   this.orders = this.orders.filter(o => o.id !== order.id);
    //   this.notificationService.showInfo(`Order ${order.id} was successfully deleted.`);
    // }, error => console.log('error on delete order ' + error));
  }

  loadPage() {
    if (this.currrentPage.pageable.pageNumber == this.previousPage) return;

    this.previousPage = this.currrentPage.pageable.pageNumber;
    this.fetchOrdersData();
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
