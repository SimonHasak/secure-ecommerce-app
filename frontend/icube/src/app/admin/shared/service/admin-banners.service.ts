import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserViewDTO} from "../model/userViewDTO";
import {HttpClient} from "@angular/common/http";
import {Page, Pageable} from "../../../shared/models/page";
import {LabelDTO} from "../model/labelDTO";

@Injectable({
  providedIn: 'root'
})
export class AdminBannersService {

  constructor(private http: HttpClient) { }

  getAllLabels(): Observable<LabelDTO[]> {
    return this.http.get<LabelDTO[]>(`/api/admin/banners/label`);
  }

  deleteLabel(label: any) {
    return this.http.delete(`/api/admin/banners/label/${label.id}`);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`/api/admin/banners/category`);
  }

  deleteCategory(category: any) {
    return this.http.delete(`/api/admin/banners/category/${category.id}`);
  }

  getAllMeasurements(): Observable<LabelDTO[]> {
    return this.http.get<LabelDTO[]>(`/api/admin/banners/measurement`);
  }

  deleteMasurement(measurement: any) {
    return this.http.delete(`/api/admin/banners/measurement/${measurement.id}`);
  }

}
