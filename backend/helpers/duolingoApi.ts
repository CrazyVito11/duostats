import type BasicUserData from "../types/BasicUserData";
import type UserStatsData from "../types/UserStatsData";
import type XpSummariesResponse from "../types/XpSummariesResponse";
import type XpSummary from "../types/XpSummary";

export async function fetchBasicUserDataFromUsername(username: string): Promise<BasicUserData | null> {
    const response = await fetch(`https://www.duolingo.com/2017-06-30/users?username=${username}&fields=users%7Bid,name,username,streak,totalXp%7D`)

    if (! response.ok) {
        throw new Error('Unable to fetch the User Data');
    }
  
    const jsonData = await response.json();

    if (! jsonData.users[0]) {
        return null;
    }

    return jsonData.users[0];
}

export async function fetchDataFromXpSummariesApi(userId: number): Promise<XpSummariesResponse> {
    const response = await fetch(`https://www.duolingo.com/2017-06-30/users/${userId}/xp_summaries?startDate=2010-01-01`);

    if (! response.ok) {
        throw new Error('Unable to fetch the XP summary');
    }

    return await response.json();
}

export function getUserStatsDataFromXpSummaries(summaries: Array<XpSummary>): UserStatsData {
    let mostRecentDayDateFormatted = 'Never';
    let totalTimeSpend             = 0;
    let sessionCount               = 0;
    let frozenCount                = 0;
    let streakLostCount            = 0;
    let streakRepairedCount        = 0;

    summaries.forEach((summary: XpSummary) => {
        totalTimeSpend += summary.totalSessionTime;
        sessionCount += summary.numSessions;

        if (summary.frozen) {
            frozenCount++;
        }

        if (! summary.streakExtended && ! summary.frozen) {
            streakLostCount++;
        }

        if (summary.repaired) {
            streakRepairedCount++;
        }
    });

    const totalDayCount       = summaries.length;
    const totalTimeSpendHours = totalTimeSpend / 60 / 60;
    const mostRecentDay       = summaries.find((summary: XpSummary) => summary.totalSessionTime > 0);

    if (mostRecentDay) {
        const mostRecentDayDate = new Date(mostRecentDay.date * 1000);
        const dateFormattingOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };

        mostRecentDayDateFormatted = mostRecentDayDate.toLocaleString("nl-NL", dateFormattingOptions);
    }

    return {
        totalDayCount,
        totalTimeSpend,
        totalTimeSpendHours,
        mostRecentDay,
        mostRecentDayDateFormatted,
        sessionCount,
        frozenCount,
        streakLostCount,
        streakRepairedCount,
    };
}
