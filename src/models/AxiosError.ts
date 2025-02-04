export interface AxiosErrorResponse {
  detail: string;
}
export interface AxiosError extends Error {
  response?: {
    data: AxiosErrorResponse;
    status: number;
    headers: unknown;
  };
  request?: unknown;
  message: string;
}
