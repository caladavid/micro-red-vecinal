export interface CustomError extends Error {
    statusCode?: number;
    message: string;
}
export declare const customError: (statusCode: number, message: string) => CustomError;
//# sourceMappingURL=customError.d.ts.map