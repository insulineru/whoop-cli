export var ExitCode;
(function (ExitCode) {
    ExitCode[ExitCode["SUCCESS"] = 0] = "SUCCESS";
    ExitCode[ExitCode["GENERAL_ERROR"] = 1] = "GENERAL_ERROR";
    ExitCode[ExitCode["AUTH_ERROR"] = 2] = "AUTH_ERROR";
    ExitCode[ExitCode["RATE_LIMIT"] = 3] = "RATE_LIMIT";
    ExitCode[ExitCode["NETWORK_ERROR"] = 4] = "NETWORK_ERROR";
})(ExitCode || (ExitCode = {}));
export class WhoopError extends Error {
    code;
    statusCode;
    constructor(message, code, statusCode) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = 'WhoopError';
    }
}
export function handleError(error) {
    if (error instanceof WhoopError) {
        const status = error.statusCode ? ` (${error.statusCode})` : '';
        console.error(`Error: ${error.message}${status}`);
        process.exit(error.code);
    }
    if (error instanceof Error) {
        if (error.message.includes('fetch failed') || error.message.includes('ECONNREFUSED')) {
            console.error('Error: Network connection failed');
            process.exit(ExitCode.NETWORK_ERROR);
        }
        console.error(`Error: ${error.message}`);
        process.exit(ExitCode.GENERAL_ERROR);
    }
    console.error('Error: Unknown error occurred');
    process.exit(ExitCode.GENERAL_ERROR);
}
//# sourceMappingURL=errors.js.map