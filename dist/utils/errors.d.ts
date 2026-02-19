export declare enum ExitCode {
    SUCCESS = 0,
    GENERAL_ERROR = 1,
    AUTH_ERROR = 2,
    RATE_LIMIT = 3,
    NETWORK_ERROR = 4
}
export declare class WhoopError extends Error {
    code: ExitCode;
    statusCode?: number | undefined;
    constructor(message: string, code: ExitCode, statusCode?: number | undefined);
}
export declare function handleError(error: unknown): never;
//# sourceMappingURL=errors.d.ts.map