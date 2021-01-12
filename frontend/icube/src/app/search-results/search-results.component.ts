import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ProductsService} from "../shared/services/products-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Page} from "../shared/models/page";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @ViewChild('title')
  searchResultMessage: ElementRef;

  products: any[] = [];
  currrentPage: Page<any>;
  keyword: string;
  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.initPage();
    this.fetchProducts();
  }

  fetchProducts() {
    this.routeSub = this.route.params.subscribe(params => this.keyword = params['keyword']);

    this.productsService.getAllByNameContaining(this.keyword, this.currrentPage.pageable).subscribe(page => {
      this.currrentPage = page;
      this.products = this.products.concat(page.content);
      
      this.displaySearchResultMessage();    
    });
  }

  displaySearchResultMessage(){
    if(this.products.length === 0){
      this.searchResultMessage.nativeElement.innerHTML = 'Žiadne výsledky pre výraz: ' + '"' + this.keyword + '"';
    }else if(this.products.length > 0) {
      this.searchResultMessage.nativeElement.innerHTML = 'Hľadaný výraz: ' + '"' + this.keyword + '"';
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
      first: true
    }
  }
  
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
