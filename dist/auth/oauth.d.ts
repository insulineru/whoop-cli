export declare function login(): Promise<void>;
export declare function logout(): void;
export declare function status(): void;
/**
 * Proactively refresh the access token.
 * Use this in cron jobs to keep tokens fresh.
 */
export declare function refresh(): Promise<void>;
//# sourceMappingURL=oauth.d.ts.map