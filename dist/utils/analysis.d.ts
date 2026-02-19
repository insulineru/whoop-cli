import type { WhoopRecovery, WhoopSleep, WhoopCycle, WhoopWorkout } from '../types/whoop.js';
export interface TrendStats {
    avg: number;
    min: number;
    max: number;
    current: number;
    trend: 'up' | 'down' | 'stable';
    values: number[];
}
export interface TrendData {
    period: number;
    recovery: TrendStats | null;
    hrv: TrendStats | null;
    rhr: TrendStats | null;
    sleepPerformance: TrendStats | null;
    sleepHours: TrendStats | null;
    strain: TrendStats | null;
}
export interface Insight {
    category: 'recovery' | 'sleep' | 'strain' | 'hrv';
    level: 'good' | 'warning' | 'critical';
    title: string;
    message: string;
    action?: string;
}
export declare function analyzeTrends(recovery: WhoopRecovery[], sleep: WhoopSleep[], cycle: WhoopCycle[], period: number): TrendData;
export declare function generateInsights(recovery: WhoopRecovery[], sleep: WhoopSleep[], cycle: WhoopCycle[], workout: WhoopWorkout[]): Insight[];
export declare function formatTrends(data: TrendData, pretty: boolean): string;
export declare function formatInsights(insights: Insight[], pretty: boolean): string;
//# sourceMappingURL=analysis.d.ts.map