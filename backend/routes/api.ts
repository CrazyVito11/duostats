import express, { NextFunction, Request, Response } from 'express';
import {
    fetchBasicUserDataFromUsername,
    fetchDataFromXpSummariesApi,
    getUserStatsDataFromXpSummaries
} from '../helpers/duolingoApi';

const router = express.Router();

const VALID_USERNAME_REGEX = /^(?=.{3,30}$)[A-Za-z0-9_-]+$/;


router.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.query.username as string|null ?? '';

        if (! VALID_USERNAME_REGEX.test(username)) {
            res.status(400).send({
                message: 'The entered username is invalid'
            });
        }

        const basicUserData = await fetchBasicUserDataFromUsername(username);

        if (! basicUserData) {
            res.status(404).send({
                message: 'The requested user doesn\'t exist'
            });

            return;
        }

        const xpSummaries = await fetchDataFromXpSummariesApi(basicUserData.id);
        const userStats = getUserStatsDataFromXpSummaries(xpSummaries.summaries);

        res.status(200).send({
            basicUserData,
            userStats,
        });
    } catch (e) {
        next(e);
    }
});

export default router;
