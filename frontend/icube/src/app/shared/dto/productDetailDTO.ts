import {Image} from "../models/image";

export class ProductDetailDTO {
  id: number;
  code: string;
  description: string;
  mainImage: string;
  name: string;
  price: number;
  quantity: number;
  urlName: string;
  visibleLabel: string;
  measurements: any[];
  images: Image[]
}
