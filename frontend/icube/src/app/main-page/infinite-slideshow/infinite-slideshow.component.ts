import { Component, OnInit } from '@angular/core';
import {products} from "../../mock-data";

@Component({
  selector: 'app-infinite-slideshow',
  templateUrl: './infinite-slideshow.component.html',
  styleUrls: ['./infinite-slideshow.component.css']
})
export class InfiniteSlideshowComponent implements OnInit {
  products = products;

  constructor() { }

  ngOnInit(): void {

  }

  repeatLoopToLeft(){
    products.unshift(products[products.length-1]);
    products.splice(products.length-1, 1);
  }

  repeatLoopToRight(){
    products.push(products[0]);
    products.splice(0,1);
  }
}
