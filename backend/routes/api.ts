import express, { Request, Response } from 'express';
import {
    fetchBasicUserDataFromUsername,
    fetchDataFromXpSummariesApi,
    getUserStatsDataFromXpSummaries
} from '../helpers/duolingoApi';

const router = express.Router();

router.get('/stats/:username', async (req: Request, res: Response) => {
    const basicUserData = await fetchBasicUserDataFromUsername(req.params.username);
    const xpSummaries = await fetchDataFromXpSummariesApi(basicUserData.id);
    const userStats = getUserStatsDataFromXpSummaries(xpSummaries.summaries);

    // TODO: Catch errors and return them properly to the client
    res.status(200).send({
        userId: basicUserData.id,
        name: basicUserData.name,
        username: basicUserData.username,
        streak: basicUserData.streak,
        totalXp: basicUserData.totalXp,
        totalDayCount: userStats.totalDayCount,
        totalTimeSpend: userStats.totalTimeSpend,
        totalTimeSpendHours: userStats.totalTimeSpendHours,
        mostRecentDay: userStats.mostRecentDay,
        mostRecentDayDateFormatted: userStats.mostRecentDayDateFormatted,
        sessionCount: userStats.sessionCount,
        frozenCount: userStats.frozenCount,
    });
});

export default router;
