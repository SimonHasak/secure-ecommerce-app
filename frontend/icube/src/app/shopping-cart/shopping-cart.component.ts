import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {CartItem} from "../shared/models/cartItem";
import {cartItems} from "../mock-data";
import {PaymentMethods} from "../shared/enums/PaymentMethods";
import {ShipmentMethods} from "../shared/enums/ShipmentMethods";
import {CartService} from "../shared/services/cart-service";
import {Cart} from "../shared/models/cart";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[] = [];
  priceSum: string;
  priceWithoutDPH: string;
  activeTabType = ActiveTab;
  activeTab: ActiveTab;
  selectedPayment: PaymentMethods;
  selectedShipment: ShipmentMethods;

  constructor(private cartService: CartService) {
    this.activeTab = ActiveTab.Cart;
  }

  ngOnInit(): void {
    this.fetchData();
    this.fetchRemovedCartItemLately();
  }

  fetchData() {
    this.cartService.getCart().subscribe(data => {
      if (data) {
        this.cartItems = data;
        this.cartItems.sort((a,b) => a.product_id - b.product_id);
        this.updatePriceSum();
      }
    })
  }

  fetchRemovedCartItemLately() {
    this.cartService.removedCartItemListener().subscribe(removedCartItem => {
      if (removedCartItem) {
        this.cartItems = this.cartItems.filter(item => item.product_id !== removedCartItem.product_id);
        this.updatePriceSum();
      }
    });
  }

  plus(cartItem: CartItem) {
    this.cartService.changeQuantityOfCartItem(cartItem, true);
    this.updatePriceSum();
  }

  minus(cartItem: CartItem) {
    if(cartItem.quantity > 1){
      this.cartService.changeQuantityOfCartItem(cartItem, false);
      this.updatePriceSum();
    }
  }

  receivePaymentMethod($event){
    this.selectedPayment = $event;
  }

  receiveShipmentMethod($event){
    this.selectedShipment = $event;
  }

  activatePaymentTab(){
    let cart = <HTMLElement>document.querySelector('.products');
    cart.style.display = "none";
  }

  updatePriceSum(){
    let sum = 0;

    if(this.cartItems.length > 0){
      this.cartItems.forEach(item => sum += item.price * item.quantity);
    }

    this.priceWithoutDPH = Number(sum * 0.80).toFixed(2);
    this.priceSum = Number(sum).toFixed(2);
  }

  removeCartItem(id: number, cartItem: CartItem){
    this.cartService.removeCartItem(cartItem).subscribe(cartItemBack => {
      console.log('remove cart item shopping cart');
    });
    this.cartItems.splice(id, 1);
    this.updatePriceSum();
    this.cartService.removeCartItemLately(cartItem);
  }

  checkoutShoppingCart() {
    this.cartService.clearLocalCart();
  }

}

enum ActiveTab {
  Cart,
  PaymentAndShipment,
  CustomerDetails
}
