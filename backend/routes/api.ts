import express, { NextFunction, Request, Response } from 'express';
import {
    fetchBasicUserDataFromUsername,
    fetchDataFromXpSummariesApi,
    getUserStatsDataFromXpSummaries
} from '../helpers/duolingoApi';

const router = express.Router();

router.get('/stats/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const basicUserData = await fetchBasicUserDataFromUsername(req.params.username);

        if (! basicUserData) {
            res.status(404).send({
                message: 'The requested user doesn\'t exist'
            });

            return;
        }

        const xpSummaries = await fetchDataFromXpSummariesApi(basicUserData.id);
        const userStats = getUserStatsDataFromXpSummaries(xpSummaries.summaries);

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
            streakLostCount: userStats.streakLostCount,
            streakRepairedCount: userStats.streakRepairedCount,
        });
    } catch (e) {
        next(e);
    }
});

export default router;
