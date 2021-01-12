import { Injectable } from '@angular/core';
import {Page, Pageable} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  public getNextPage(page: Page<any>): Pageable {
    if(!page.last) {
      page.pageable.pageNumber++;
    }
    return page.pageable;
  }

  public getPreviousPage(page: Page<any>): Pageable {
    if(!page.first) {
      page.pageable.pageNumber--;
    }
    return page.pageable;
  }

  public getPageInNewSize(page: Page<any>, pageSize: number): Pageable {
    page.pageable.pageSize = pageSize;
    page.pageable.pageNumber = Pageable.FIRST_PAGE_NUMBER + 1;

    return page.pageable;
  }

}
