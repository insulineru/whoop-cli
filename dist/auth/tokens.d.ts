import type { TokenData, OAuthTokenResponse } from '../types/whoop.js';
export declare function saveTokens(response: OAuthTokenResponse): void;
export declare function loadTokens(): TokenData | null;
export declare function clearTokens(): void;
export declare function isTokenExpired(tokens: TokenData): boolean;
export declare function refreshAccessToken(tokens: TokenData): Promise<TokenData>;
export declare function getValidTokens(): Promise<TokenData>;
export declare function getTokenStatus(): {
    authenticated: boolean;
    expires_at?: number;
};
//# sourceMappingURL=tokens.d.ts.map