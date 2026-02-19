export interface CallbackResult {
    code: string;
    state: string;
}
export declare function findAvailablePort(startPort?: number): Promise<number>;
export declare function startCallbackServer(port: number): Promise<CallbackResult>;
//# sourceMappingURL=server.d.ts.map