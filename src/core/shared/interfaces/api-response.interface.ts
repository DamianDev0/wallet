export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

export interface IPaginationResponse<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
