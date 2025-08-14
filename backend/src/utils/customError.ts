export interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

export const customError = (statusCode: number, message: string): CustomError => {
  const error = new Error() as CustomError;
  error.statusCode = statusCode;
  error.message = message;
  return error;
};