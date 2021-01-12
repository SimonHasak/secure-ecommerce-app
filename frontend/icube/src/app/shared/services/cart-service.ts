import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {of} from "rxjs/internal/observable/of";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "./user.service";
import {CartItem} from "../models/cartItem";
import {JwtResponse} from "../models/jwtResponse";
import {catchError, map, tap} from "rxjs/operators";
import {Cart} from "../models/cart";
import {cartItems} from "../../mock-data";
import {QuantityModel} from "../models/quantityModel";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly apiUrl: string
  private readonly cartApi: string;

  private localMap = {};

  private addedItemSubject: BehaviorSubject<CartItem>;
  private removedCartItemSubject: BehaviorSubject<CartItem>;
  private quantityCartItemSubject: BehaviorSubject<QuantityModel>;

  private currentUser: JwtResponse;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private userService: UserService) {
    this.addedItemSubject = new BehaviorSubject<CartItem>(null);
    this.removedCartItemSubject = new BehaviorSubject<CartItem>(null);
    this.quantityCartItemSubject = new BehaviorSubject<QuantityModel>(null);

    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user
      }
    });
    this.localMap = {};

    this.apiUrl = environment.apiUrl;
    this.cartApi = 'cart';
  }

  changeQuantityOfCartItem(cartItem: CartItem, plus: boolean) {
    plus ? this.localMap[cartItem.product_id].quantity++ : this.localMap[cartItem.product_id].quantity--;
    this.storeLocalCart();
    this.quantityCartItemSubject.next(new QuantityModel(cartItem, plus));
  }

  removeCartItemLately(cartItem: CartItem) {
    this.removedCartItemSubject.next(cartItem);
  }

  removedCartItemListener(): Observable<CartItem> {
    return this.removedCartItemSubject.asObservable();
  }

  quantityCartItemListener(): Observable<QuantityModel> {
    return this.quantityCartItemSubject.asObservable();
  }

  currentAddedItemListener(): Observable<CartItem> {
    return this.addedItemSubject.asObservable();
  }

  getLocalCart() {
    if (this.cookieService.check('cart')) {
      this.localMap = JSON.parse(this.cookieService.get('cart'));
      console.log('Geting cart from cookies...');
    } else {
      console.log('Creating new localmap...');
      this.localMap = {};
    }
    return this.localMap;
  }

  private getLocalCartLength(): number {
    return Object.values(this.getLocalCart()).length;
  }

  getCart(): Observable<CartItem[]> {
    const localCart = this.getLocalCart();
    // const localCartLength = this.getLocalCartLength();
    console.log('Getting cart');

    return of(Object.values(localCart));
  }

  addItem(cartItem): Observable<boolean> {
    if (this.cookieService.check('cart')) {
      this.localMap = this.getLocalCart();
    }

    if (!this.localMap[cartItem.product_id]) {
      console.log('item is not in the cart')
      this.localMap[cartItem.product_id] = cartItem;
    } else {
      console.log('item is in the cart, quantity++')
      this.localMap[cartItem.product_id].quantity++;
    }

    this.addedItemSubject.next(cartItem);

    this.storeLocalCart();
    console.log('new cart: ');
    console.log(this.localMap);
    return of(true);
  }

  update(productInOrder): Observable<CartItem> {
    if (this.currentUser) {
      const url = `${environment.apiUrl}${this.cartApi}/${productInOrder.productId}`;
      return this.http.put<CartItem>(url, productInOrder.count);
    }
  }

  removeCartItem(cartItem): Observable<any> {
    if (cartItem) {
      delete this.localMap[cartItem.product_id];
      this.storeLocalCart();
    }
    return of(cartItem);
  }

  checkout(): Observable<any> {
    const url = `${environment.apiUrl}${this.cartApi}/checkout`;
    return this.http.post(url, null).pipe();
  }

  storeLocalCart() {
    this.cookieService.delete('cart', '/', 'Lax');
    this.cookieService.set('cart', JSON.stringify(this.localMap), {expires: 14, path: '/', sameSite: 'Lax'});
  }

  clearLocalCart() {
    console.log('clearing local cart');
    this.cookieService.delete('cart', '/', 'Lax');
    this.localMap = {};
    location.reload();
  }

}
