import type XpSummary from "./XpSummary";

export default interface UserStatsData {
    totalDayCount: number,
    totalTimeSpend: number,
    totalTimeSpendHours: number,
    mostRecentDay?: XpSummary,
    mostRecentDayDateFormatted: string,
    sessionCount: number,
    frozenCount: number,
    streakLostCount: number,
    streakRepairedCount: number,
};
