export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface IPaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
