export interface ErrorResponse {
  code: number;
  message: string;
  errors?: Record<string, string[]>;
}
