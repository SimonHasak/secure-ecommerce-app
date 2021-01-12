import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import {LoginComponent} from "../../user/login/login.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {Category} from "../../shared/enums/Category";
import {LoginForm} from "../../shared/models/loginForm";
import { Subject} from "rxjs";
import {CartItem} from "../../shared/models/cartItem";
import { products} from "../../mock-data";
import {AuthService} from "../../shared/services/auth-service";
import {CartService} from "../../shared/services/cart-service";
import {CartItemAddedToCartModalComponent} from "../../modals/cart-item-added-to-cart-modal/cart-item-added-to-cart-modal.component";
import {error} from "@angular/compiler/src/util";


@Component({
  selector: 'app-navigation-panel-user',
  templateUrl: './navigation-panel-user.component.html',
  styleUrls: ['./navigation-panel-user.component.css']
})
export class NavigationPanelUserComponent implements OnInit, AfterViewInit {

  @Output()
  loginEvent = new EventEmitter();

  @Output()
  logOutEvent = new EventEmitter();

  @Input()
  isAdmin: boolean = false;

  @Input()
  isAuthenticated: boolean = false;


  cartItems: CartItem[] = [];

  priceSum: string;
  isCollapsed = false;
  faUser = faUser;
  faSearch = faSearch;
  searchWord: string;
  categories: String[] = ['none', 'women', 'men', 'accessories'];
  subject: Subject<any> = new Subject();
  cartPreviewProducts: HTMLElement;

  isScrollUp = false;
  isScrollDown = true;

  isEmptyShoppingCart = true;
  itemsInShoppingCartCounter: number = 0;

  constructor(private modalService: NgbModal,
              private router: Router,
              private authService: AuthService,
              private cartService: CartService,) {
    this.stickyNavbarToggle();
  }

  ngOnInit(): void {
    this.fetchData();
    this.fetchCurrentAddedItem();
    this.fetchChangedQuantityOfCartItem();
    this.fetchRemovedCartItemLately();
    this.createMobileNavbar();
    this.setScrollUpButton();
    this.showShoppingCartPreview();
  }

  ngAfterViewInit(): void {
    this.cartPreviewProducts = document.querySelector('.products-list');
  }

  fetchRemovedCartItemLately() {
    this.cartService.removedCartItemListener().subscribe(removedCartItem => {
      if (removedCartItem) {
        this.cartItems = this.cartItems.filter(item => item.product_id !== removedCartItem.product_id);
        this.itemsInShoppingCartCounter--;
        this.updatePriceSum();
      }
    });
  }

  navigateTo(category: String) {
    if  (category == Category.NONE) {
      this.router.navigate(['category']);
    } else {
      this.router.navigate(['category/', category]);
    }
  }

  openLoginModalEvent() {
    this.loginEvent.emit();
  }

  logOutMethodEvent() {
    this.logOutEvent.emit();
  }

  fetchChangedQuantityOfCartItem() {
    this.cartService.quantityCartItemListener().subscribe(quantityModel => {
      if (quantityModel) {
        let cartItem = this.cartItems.find(item => item.product_id === quantityModel.cartItem.product_id);

        if (quantityModel.plus) {
          cartItem.quantity++;
        } else {
          cartItem.quantity--;
        }

        this.updatePriceSum();
      }
    });
  }

  fetchData() {
    this.cartService.getCart().subscribe(data => {
      if (data) {
        this.cartItems = data;
        this.itemsInShoppingCartCounter = this.cartItems.length;
        this.updatePriceSum();
      }
    });
  }

  fetchCurrentAddedItem() {
    this.cartService.currentAddedItemListener().subscribe(addedItem => {
      if (addedItem) {
        let foundItem = this.cartItems.find(arrItem => arrItem.product_id === addedItem.product_id);

        if (foundItem == undefined) {
          this.cartItems.unshift(addedItem);
          this.itemsInShoppingCartCounter++;
        } else {
          foundItem.quantity++;
        }

        this.updatePriceSum();
        let cartPreviewElement = <HTMLElement>document.querySelector('#shopping-cart-preview');
        cartPreviewElement.style.display = "flex";
        this.cartPreviewProducts.scrollTo(0,0);
        this.isScrollDown = true;
        this.isScrollUp = false;
        setTimeout(function(){
          cartPreviewElement.style.display = "none";
         }, 2000);
        // this.openVerticallyCentered(addedItem);
      }
    });
  }

  showCartPreviewWithAddedItem() {
    if(this.cartPreviewProducts != null){
      let cartPreviewElement = <HTMLElement>document.querySelector('#shopping-cart-preview');

      cartPreviewElement.style.display = "flex";
      this.cartPreviewProducts.scrollTo(0,0);
      this.isScrollDown = true;
      this.isScrollUp = false;

      setTimeout(function(){
        cartPreviewElement.style.display = "none";
        }, 2000);
    }
  }

  openVerticallyCentered(cartItem: CartItem) {
    const modalRef = this.modalService.open(CartItemAddedToCartModalComponent, { centered: true });
    modalRef.componentInstance.cartItem = cartItem;
  }

  updateItemsInShoppingCartCounter(decrementValue: number) {
    if (decrementValue == 0) {
      this.itemsInShoppingCartCounter = 0;
    } else {
      this.itemsInShoppingCartCounter -= decrementValue;
    }
  }

  onKey(event) {
    this.searchWord = event.target.value;
    console.log(this.searchWord);
    this.searchWord = '';
  }

  stickyNavbarToggle(){
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 100) {
        $('#header').addClass('header-fixed');
      } else {
        $('#header').removeClass('header-fixed');
      }
    });
  }

  setScrollUpButton(){
    let btn = <HTMLElement>document.querySelector('.scroll-to-top');
    if(btn == null)
      return;

    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 300) {
        $('.scroll-to-top').css('visibility', 'visible');
      } else {
        $('.scroll-to-top').css('visibility', 'hidden');
      }
    });

    this.scrollUpButtonAction(btn);
  }

  scrollUpButtonAction(btn: HTMLElement) {
    btn.onclick = () => {
      window.scrollTo(0,0);
    }
  }

  showShoppingCartPreview(){
    let cartButton = <HTMLElement>document.querySelector('#cart-btn');
    let cartPreviewElement = <HTMLElement>document.querySelector('#shopping-cart-preview');

    cartButton.onmouseover = () => {
      cartPreviewElement.style.display = "flex";
    }
    cartButton.onmouseout = () => {
      cartPreviewElement.style.display = "none";
    }
  }

  updatePriceSum(){
    let sum = 0;

    if(this.cartItems.length > 0){
      this.cartItems.forEach(item => sum += item.price * item.quantity);
    }
    this.priceSum = Number(sum).toFixed(2);
  }

  removeCartItem(id: number, cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem);
    this.cartItems.splice(id, 1);
    this.updatePriceSum();
    this.cartService.removeCartItemLately(cartItem);
  }

  createMobileNavbar(){
    if ($('#nav-menu-container').length) {

      $('#mobile-nav').find('> ul').attr({
        'class': '',
        'id': ''
      });

      $('header').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
      $('header').append('<div id="mobile-body-overly"></div>');
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function(e) {
        $(this).next().toggleClass('menu-item-active');
        $(this).nextAll('ul').eq(0).slideToggle();
        $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });

      $(document).on('click', '#mobile-nav-toggle', function (e) {
        $('header').toggleClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').toggle();
      });

      $(document).on('click',function (e) {
        var container = $("#mobile-nav, #mobile-nav-toggle");

        if (!container.is(<any>e.target) && container.has(<any>e.target).length === 0) {
          if ($('header').hasClass('mobile-nav-active')) {
            $('header').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
          }
        }
      });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
    }
  }

  cartPreviewScrollUp(){
    this.cartPreviewProducts.scrollBy(0, -200);

    this.toggleCartPreviewSliderButtons();
  }

  cartPreviewScrollDown(){
    this.cartPreviewProducts.scrollBy(0, 200);

    this.toggleCartPreviewSliderButtons();
  }

  toggleCartPreviewSliderButtons() {
    let _this = this;

    setTimeout(function(){
      _this.isScrollDown = _this.cartPreviewProducts.scrollHeight - _this.cartPreviewProducts.offsetHeight >= _this.cartPreviewProducts.scrollTop;
      _this.isScrollUp = _this.cartPreviewProducts.scrollTop > 0;

     }, 500);
  }

  displaySearchWindow(){
    this.subject.next();
  }


  redirectToShoppingCart() {
    this.router.navigate(['/shopping-cart']);
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

  redirectToMyProfile() {
    this.router.navigate(['/user/profile', 1]);
  }

}








