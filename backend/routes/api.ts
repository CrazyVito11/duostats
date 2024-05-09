import express, { Request, Response } from 'express';
import {
    fetchUserIdFromUsername,
    fetchDataFromXpSummariesApi,
    getUserStatsDataFromXpSummaries
} from '../helpers/duolingoApi';

const router = express.Router();

// TODO: Implement this API on the front-end
router.get('/stats/:username', async (req: Request, res: Response) => {
    const userId = await fetchUserIdFromUsername(req.params.username);
    const xpSummaries = await fetchDataFromXpSummariesApi(userId);
    const userStats = getUserStatsDataFromXpSummaries(xpSummaries.summaries);

    // TODO: Catch errors and return them properly to the client
    res.status(200).send({
        userId: userId,
        totalDayCount: userStats.totalDayCount,
        totalTimeSpend: userStats.totalTimeSpend,
        totalTimeSpendHours: userStats.totalTimeSpendHours,
        mostRecentDay: userStats.mostRecentDay,
        sessionCount: userStats.sessionCount,
        frozenCount: userStats.frozenCount,
    });
});

export default router;
