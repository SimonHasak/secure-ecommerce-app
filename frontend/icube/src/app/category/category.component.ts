import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../shared/services/products-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Page} from "../shared/models/page";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {PageService} from "../shared/services/page.service";

@Component({
  selector: 'app-products-collections',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products: any[] = [];

  sortingValues: string[] = ['Najnovšie', 'Najlacnejšie', 'Najdrahšie', 'Abecedne a-z', 'Abecedne z-a'];
  filter: string = this.sortingValues[0];

  category: string;
  routeSub: Subscription;

  mainLabel: string = 'new';

  currrentPage: Page<any>;

  isLoading: boolean = false;

  // page = {
  //   pageNumber: 0,
  //   pageSize: 9
  // }

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService,
              private pageService: PageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit(): void {
    this.products = [];
    this.initPage();
    this.updateCategory();
  }

  ngOnChanges() {
    this.updateCategory();
  }

  onChange(index: number) {
    this.filter = this.sortingValues[index];
    this.doSort()
  }

  updateCategory() {
    this.routeSub = this.route.params.subscribe(params => {

      this.category = params['id'] == undefined ? 'byLabel' : params['id'];
      this.fetchProducts();

    });
  }

  fetchProducts() {
    this.isLoading = true;
    // this.spinner.show('caregory-spinner');
    if (this.category === 'byLabel') {
      this.productsService.getAllProductsByLabel(this.mainLabel, this.currrentPage.pageable).subscribe(page => {
        this.currrentPage = page;
        this.products = this.products.concat(page.content);
        this.isLoading = false;
        this.spinner.hide('caregory-spinner');
      });
    } else {
      this.productsService.getAllProductsByCategory(this.category, this.currrentPage.pageable).subscribe(page => {
        this.currrentPage = page;
        this.products = this.products.concat(page.content);
        this.isLoading = false;
        this.spinner.hide('caregory-spinner');
      });
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onScroll() {
    console.log('scrolled!!');
    if (!this.currrentPage.last) {
      this.currrentPage.pageable = this.pageService.getNextPage(this.currrentPage);
      this.fetchProducts();
    }
  }

  doSort() {
    switch (this.filter) {
      case this.sortingValues[0]:
        break;
      case this.sortingValues[1]:
        this.products.sort((a,b) => a.price - b.price);
        break;
      case this.sortingValues[2]:
        this.products.sort((a,b) => b.price - a.price);
        break;
      case this.sortingValues[3]:
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case this.sortingValues[4]:
        this.products.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }

  initPage() {
    this.currrentPage = {
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 9
      },
      last: false,
      first: true,
      totalElements: 0
    }
  }
}
