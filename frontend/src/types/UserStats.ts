import type BasicUserData from './BasicUserData';
import type UserStatsData from './UserStatsData';

export default interface UserStats {
    basicUserData: BasicUserData,
    userStats: UserStatsData,
}