import {Category} from "../enums/Category";
import {Image} from "./image";
import {Measurement} from "./measurement";

export class Product {

  id: number;
  code: string;
  urlName: string;
  mainImage: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: Category = Category.NONE;
  measurements: Measurement[]
  images: Image[]

  // public Product() {
  //   this.category = Category.NONE;
  // }

}
