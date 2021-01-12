import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {advertisement, imageSlider, products} from "../../mock-data";
import {of} from "rxjs/internal/observable/of";
import {Advertisement} from "../models/advertisement";
import {ImageSlider} from "../models/imageSlider";

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  private readonly apiUrl: string
  private readonly bannersApi: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.bannersApi = 'banners';
  }

  getAdvertisement(): Observable<Advertisement> {
    if (environment.server) {
      return this.http.get<Advertisement>(`api/banner/advertisement`);
    } else {
      return of( advertisement );
    }
  }

  getImageSlider(): Observable<ImageSlider> {
    if (environment.server) {
      return this.http.get<ImageSlider>(`api/banner/slider`);
    } else {
      return of( imageSlider );
    }
  }

}
