import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Page, Pageable} from "../../../shared/models/page";
import {ProductAdminViewDTO} from "../model/productAdminViewDTO";
import {ProductCreateDTO} from "../model/productCreateDTO";

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(pageable: Pageable): Observable<Page<ProductAdminViewDTO>> {
    const url = '?page=' + (pageable.pageNumber - 1) + '&size=' + pageable.pageSize + '&sort=';
    return this.http.get<Page<ProductAdminViewDTO>>(`api/admin/product/${url}`);
  }

  deleteProduct(product: ProductAdminViewDTO) {
    return this.http.delete(`/api/admin/product/${product.id}`);
  }

  createProduct(product: ProductCreateDTO): Observable<any> {
    return this.http.post<any>(`api/admin/product/`, product);
  }

  getProduct(id: number): Observable<ProductCreateDTO> {
    return this.http.get<ProductCreateDTO>(`api/admin/product/${id}`);
  }

  updateProduct(id: number, productData: ProductCreateDTO): Observable<any> {
    return this.http.put<any>(`api/admin/product/${id}`, productData);
  }

}
