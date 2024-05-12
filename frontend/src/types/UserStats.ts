import type XpSummary from './XpSummary';

export default interface UserStats {
    userId: number,
    name: string,
    username: string,
    streak: number,
    totalXp: number,
    totalDayCount: number,
    totalTimeSpend: number,
    totalTimeSpendHours: number,
    mostRecentDay?: XpSummary,
    mostRecentDayDateFormatted: string,
    sessionCount: number,
    frozenCount: number,
    streakLostCount: number,
    streakRepairedCount: number,
}