export type ApiResponse<T = {}> = T & {
  success: boolean;
};

export type ErrorResponse = {
  success: boolean;
  error: string;
};
