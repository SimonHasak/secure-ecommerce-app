import {CartItem} from "./cartItem";

export class QuantityModel {

  cartItem: CartItem;
  plus: boolean;

  constructor(cartItem: CartItem, plus: boolean) {
    this.cartItem = cartItem;
    this.plus = plus;
  }
}
