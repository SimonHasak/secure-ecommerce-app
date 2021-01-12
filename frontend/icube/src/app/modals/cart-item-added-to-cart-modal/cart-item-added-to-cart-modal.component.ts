import {Component, Input, OnInit} from '@angular/core';
import {CartItem} from "../../shared/models/cartItem";
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-item-added-to-cart-modal',
  templateUrl: './cart-item-added-to-cart-modal.component.html',
  styleUrls: ['./cart-item-added-to-cart-modal.component.css']
})
export class CartItemAddedToCartModalComponent implements OnInit {

  @Input()
  public cartItem: CartItem;

  constructor(public activeModal: NgbActiveModal,
              private router: Router) { }

  ngOnInit(): void {
  }

  redirectToShoppingCart() {
    this.router.navigate(['/shopping-cart']);
    this.activeModal.close();
  }

}
