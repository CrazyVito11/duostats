
export async function fetchUserIdFromUsername(username: string): Promise<number> {
    const response = await fetch(`https://www.duolingo.com/2017-06-30/users?username=${username}&fields=users%7Bid,name,username%7D`)

    if (! response.ok) {
        throw new Error('Unable to fetch the User Data');
    }
  
    const jsonData = await response.json();

    if (! jsonData.users[0]) {
        throw new Error('User not found');
    }

    return jsonData.users[0].id;
}

export async function fetchDataFromXpSummariesApi(userId: number): Promise<XpSummariesResponse> {
    const response = await fetch(`https://www.duolingo.com/2017-06-30/users/${userId}/xp_summaries?startDate=2010-01-01`);

    if (! response.ok) {
        throw new Error('Unable to fetch the XP summary');
    }
  
    return await response.json();
}

export function getUserStatsDataFromXpSummaries(summaries: Array<XpSummary>): UserStatsData {
    let totalTimeSpend = 0;
    let sessionCount   = 0;
    let frozenCount    = 0;

    summaries.forEach((summary: XpSummary) => {
        totalTimeSpend += summary.totalSessionTime;
        sessionCount += summary.numSessions;

        if (summary.frozen) {
            frozenCount++;
        }
    });

    const totalDayCount       = summaries.length;
    const totalTimeSpendHours = totalTimeSpend / 60 / 60;
    const mostRecentDay       = summaries.find((summary: XpSummary) => summary.totalSessionTime > 0);

    return {
        totalDayCount,
        totalTimeSpend,
        totalTimeSpendHours,
        mostRecentDay,
        sessionCount,
        frozenCount
    }
}
