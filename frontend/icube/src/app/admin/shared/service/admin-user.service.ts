import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserViewDTO} from "../model/userViewDTO";
import {HttpClient} from "@angular/common/http";
import {Page, Pageable} from "../../../shared/models/page";

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) { }

  getAllUsers(pageable: Pageable): Observable<Page<UserViewDTO>> {
    const url = '?page=' + (pageable.pageNumber - 1) + '&size=' + pageable.pageSize + '&sort=';
    return this.http.get<Page<UserViewDTO>>(`api/admin/user/${url}`);
  }

  deleteUser(user: UserViewDTO) {
    return this.http.delete(`/api/admin/user/${user.id}`);
  }

}
