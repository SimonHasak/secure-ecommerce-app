import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {products} from "../../mock-data";
import {ProductsService} from "../../shared/services/products-service";

@Component({
  selector: 'app-home-page-products',
  templateUrl: './home-page-products.component.html',
  styleUrls: ['./home-page-products.component.css']
})
export class HomePageProductsComponent implements OnInit {

  @Output() isLoading = new EventEmitter<boolean>();

  homePageProducts = [products[8], products[9], products[10], products[11]];

  constructor(private homePageProductService: ProductsService) { }

  ngOnInit(): void {
    // this.startLoading();
    // this.homePageProductService.getAllHomePageProducts()
    //   .subscribe(homePageProducts => {
    //     this.homePageProducts = homePageProducts;
    //   });
    // this.stopLoading();
  }

  startLoading() {
    this.isLoading.emit(true);
  }

  stopLoading() {
    this.isLoading.emit(false);
  }

}
