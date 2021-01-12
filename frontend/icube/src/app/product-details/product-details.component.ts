import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {Product} from "../shared/models/product";
import {products} from "../mock-data";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CartItem} from "../shared/models/cartItem";
import { NgbCarouselConfig } from  '@ng-bootstrap/ng-bootstrap';
import {ProductsService} from "../shared/services/products-service";
import {ProductDetailDTO} from "../shared/dto/productDetailDTO";
import {NgxSpinnerService} from "ngx-spinner";
import {CartService} from "../shared/services/cart-service";
import {NotificationService} from "../shared/services/notification.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [NgbCarouselConfig]
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild('activeImage')
  activeImage: ElementRef;

  product: any;
  productUrlName: string;
  productQuantityToShoppingCart: number = 1;

  private routeSub: Subscription;
  showSliderBtn: boolean = false;
  imageSliderContainer: HTMLElement;

  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private config: NgbCarouselConfig,
              private productService: ProductsService,
              private spinner: NgxSpinnerService,
              private cartService: CartService,
              private notificationService: NotificationService) {
    config.interval = -1;
    config.keyboard = true;
    config.showNavigationIndicators = false;
   }

  ngOnInit(): void {
    this.fetchProduct();
    this.imageSliderContainer = document.querySelector('.mini-pics');
  }

  ngAfterViewInit(): void {
    this.toggleSliderButtonsVisibility();

  }

  fetchProduct() {
    this.spinner.show('product-details-spinner');

    this.routeSub = this.route.params.subscribe(params => {
      this.productUrlName = params['id'];
    });
    this.productService.getProductByUrlName(this.productUrlName).subscribe(data => {
      this.product = data;
      // console.log(this.product);

      this.spinner.hide('product-details-spinner');
    }, error => this.spinner.hide('product-details-spinner'));
  }

  setImageAsActive(image: String) {
    this.activeImage.nativeElement.src = image;
  }

  addProductToShoppingCart(product: Product|ProductDetailDTO) {

    let cartItem = {
      product_id: product.id,
      code: product.code,
      imageUrl: product.mainImage,
      name: product.name,
      quantity: this.productQuantityToShoppingCart,
      price: product.price,
      size: 'small'
    };
    this.isLoading = true;
    this.cartService.addItem(cartItem).subscribe(data => {
      if (data) {
        this.isLoading = false;
        this.notificationService.showSuccess(`Produkt ${product.name} bol pridany do kosika.`)
      }
    }, error => {this.isLoading = false; console.log('Add item failed.')});
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  imgSliderUp(){
    this.imageSliderContainer.scrollBy(0, -250);
  }

  imgSliderDown(){
    this.imageSliderContainer.scrollBy(0, 250);
  }

  toggleSliderButtonsVisibility() {
    if(this.imageSliderContainer.scrollHeight > this.imageSliderContainer.clientHeight)
      this.showSliderBtn = true;
  }

}
