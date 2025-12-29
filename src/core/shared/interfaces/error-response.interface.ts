export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: Record<string, string[]>;
  timestamp: string;
  path: string;
}
