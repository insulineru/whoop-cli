import type { WhoopProfile, WhoopBody, WhoopSleep, WhoopRecovery, WhoopWorkout, WhoopCycle, QueryParams, CombinedOutput, DataType } from '../types/whoop.js';
export declare function getProfile(): Promise<WhoopProfile>;
export declare function getBody(): Promise<WhoopBody>;
export declare function getSleep(params?: QueryParams, all?: boolean): Promise<WhoopSleep[]>;
export declare function getRecovery(params?: QueryParams, all?: boolean): Promise<WhoopRecovery[]>;
export declare function getWorkout(params?: QueryParams, all?: boolean): Promise<WhoopWorkout[]>;
export declare function getCycle(params?: QueryParams, all?: boolean): Promise<WhoopCycle[]>;
export declare function fetchData(types: DataType[], date: string, options?: {
    limit?: number;
    all?: boolean;
    start?: string;
    end?: string;
}): Promise<CombinedOutput>;
export declare function fetchAllTypes(date: string, options?: {
    limit?: number;
    all?: boolean;
}): Promise<CombinedOutput>;
//# sourceMappingURL=client.d.ts.map