/* export interface CustomError extends Error {
  statusCode?: number;
  message: string;
}
 */
export const customError = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};
//# sourceMappingURL=customError.js.map