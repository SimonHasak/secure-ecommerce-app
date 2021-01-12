
export class Page<T> {
  content: T[] = [];
  pageable: Pageable;
  totalElements?: number;
  last: boolean = false;
  totalPages?: number;
  sort?: Sort;
  number?: number;
  numberOfElements?: number;
  first: boolean;
  size?: number;
  empty?: boolean;


  public constructor(content: any[]) {
    this.content = content;
    this.totalElements = 0;
    this.pageable = new Pageable();
    this.last = false;
    this.first = true;
  }

}

export class Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export class Pageable {
  sort?: Sort;
  pageNumber: number;
  pageSize: number;
  offset?: number;
  paged?: boolean = true;
  unpaged?: boolean = false;

  static readonly DEFAULT_PAGE_SIZE = 9;
  static readonly FIRST_PAGE_NUMBER = 0;

  public constructor() {
    this.pageSize = Pageable.DEFAULT_PAGE_SIZE;
    this.pageNumber = Pageable.FIRST_PAGE_NUMBER;
  }
}
