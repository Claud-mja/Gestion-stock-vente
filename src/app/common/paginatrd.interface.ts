export interface Paginated<T> {
    reulstat: T[];
    desc : PageDetails
}

export interface PageDetails {
  page_now : number;
  page_max : number;
  data_now : number;
  data_count : number;
  data_limit : number;
}
  