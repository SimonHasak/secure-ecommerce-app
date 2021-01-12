import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {products} from "../../mock-data";
import {of} from "rxjs/internal/observable/of";
import {Product} from "../models/product";
import {ProductViewDTO} from "../dto/productViewDTO";
import {Page, Pageable} from "../models/page";
import {ProductDetailDTO} from "../dto/productDetailDTO";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly apiUrl: string
  private readonly productsApi: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.productsApi = 'products';
  }

  getAllHomePageProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}${this.productsApi}`;
    return of( [products[2], products[5], products[4], products[7]] );
    // return this.http.get(url).pipe();
  }

  getAllProducts(): Observable<ProductViewDTO[]> {
    return this.http.get<ProductViewDTO[]>('/api/product/all');
  }

  getAllProductsByLabel(label: string, pageable: Pageable): Observable<any> {
    const url = '?page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&sort=';

    if (environment.server) {
      return this.http.get<Page<ProductViewDTO>>(`api/label-name/${label}/${url}`);
    } else {
      return of( new Page<any>(products) );
    }
  }

  getAllByNameContaining(keyword: string, pageable: Pageable): Observable<any> {
    const url = '?page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&sort=';

    if (environment.server) {
      return this.http.get<Page<ProductViewDTO>>(`api/product/name-contains/${keyword}${url}`);
    } else {
      return of( new Page<any>(products) );
    }
  }


  getAllProductsByCategory(category: string, pageable: Pageable): Observable<any> {
    const url = '?page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&sort=';

    if (environment.server) {
      return this.http.get<Page<ProductViewDTO>>(`api/category-name/${category}/${url}`);
    } else {
      return of( new Page<any>(products.filter(p => p.category == category)) );
    }
  }

  getProductByUrlName(urlName: string): Observable<any> {
    if (environment.server) {
      return this.http.get<ProductDetailDTO>(`api/product/url-name/${urlName}`);
    } else {
      return of( products.find(p => p.urlName == urlName) );
    }
  }

  getProductById(id: number): Observable<any> {
    if (environment.server) {
      return this.http.get<ProductDetailDTO>(`api/product/${id}`);
    } else {
      return of( products.find(p => p.code == id.toString()) );
    }
  }

}
