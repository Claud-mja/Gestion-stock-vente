export interface Paginated<T> {
    content: T[];
    pageNumber: number;
    perPage: number;
    totalPage: number;
    contentCount: number;
  }
  