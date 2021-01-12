import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../shared/models/product";
import {ProductViewDTO} from "../shared/dto/productViewDTO";

@Component({
  selector: 'app-product-outlook',
  templateUrl: './product-outlook.component.html',
  styleUrls: ['./product-outlook.component.css']
})
export class ProductOutlookComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;
  @Input() product: Product | ProductViewDTO;
  @Input() routeToRoot: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
