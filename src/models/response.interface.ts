export interface IBaseResponse {
  data: any;
  status: number;
  error: string | string[];
}

export interface IMeta {
  currentPage: number;
  perPage: number;
  totalPages: number;
}
