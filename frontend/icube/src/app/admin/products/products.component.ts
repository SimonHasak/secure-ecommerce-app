import { Component, OnInit } from '@angular/core';
import {Page} from "../../shared/models/page";
import {NotificationService} from "../../shared/services/notification.service";
import {AdminProductService} from "../shared/service/admin-product.service";
// import { CommonModule } from '@angular/common'; //do not delete
// import { BrowserModule } from '@angular/platform-browser';
import {ProductAdminViewDTO} from "../shared/model/productAdminViewDTO";
import {delay} from "rxjs/operators";
import {PageService} from "../../shared/services/page.service"; //do not delete

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: ProductAdminViewDTO[];

  currrentPage: Page<any> = new Page<any>([]);

  isLoading: boolean = true;

  previousPage = 1;
  previousPageSizeIndex = 1;

  sortingValues: string[] = ['3', '9', '15', '25', '35'];
  filter: string = this.sortingValues[1];

  constructor(private adminProductService: AdminProductService,
              private notificationService: NotificationService,
              private pageService: PageService) { }

  ngOnInit(): void {
    this.initPage();
    this.fetchUsersData();
  }

  fetchUsersData() {
    this.isLoading = true;
    this.adminProductService.getAllProducts(this.currrentPage.pageable).subscribe( page => {
      if (page) {
        this.currrentPage = page;
        this.products = page.content;

        this.isLoading = false;
      }
    })
  }

  onDelete(product: ProductAdminViewDTO) {
    console.log('delete product ' + product.id);
    this.adminProductService.deleteProduct(product).subscribe(result => {
      this.products = this.products.filter(u => u.id !== product.id);
      this.notificationService.showInfo(`Product ${product.name} was successfully deleted.`);
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
    if (this.previousPageSizeIndex !== index) {
      this.products = [];
      this.previousPageSizeIndex = index;
      this.filter = this.sortingValues[index];
      this.pageService.getPageInNewSize(this.currrentPage, parseInt(this.filter, 10))
      this.fetchUsersData();
    }
  }
}
