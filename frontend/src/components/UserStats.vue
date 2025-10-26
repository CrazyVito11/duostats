<template>
    <section class="flex flex-col w-full">
        <h2 class="text-2xl font-semibold text-white mb-2">General user info</h2>
        <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem
                name="Total days"
                :value="userStatsData.userStats.totalDayCount"
            >
                <template v-slot:icon>
                    <CalendarIcon class="w-full my-auto"></CalendarIcon>
                </template>
            </StatItem>

            <StatItem
                name="Lesson(s)"
                :value="userStatsData.userStats.sessionCount"
            >
                <template v-slot:icon>
                    <LessonIcon class="w-full my-auto"></LessonIcon>
                </template>
            </StatItem>

            <StatItem
                name="Total XP"
                :value="userStatsData.basicUserData.totalXp"
            >
                <template v-slot:icon>
                    <XpIcon class="w-full my-auto"></XpIcon>
                </template>
            </StatItem>

            <StatItem
                name="Total time"
                :value="secondsToFormattedString(userStatsData.userStats.totalTimeSpend)"
            >
                <template v-slot:icon>
                    <ClockIcon class="w-full my-auto"></ClockIcon>
                </template>
            </StatItem>

            <StatItem
                name="Streak"
                :value="userStatsData.basicUserData.streak"
            >
                <template v-slot:icon>
                    <StreakIcon class="w-full my-auto"></StreakIcon>
                </template>
            </StatItem>

            <StatItem
                name="Freezes"
                :value="userStatsData.userStats.frozenCount"
            >
                <template v-slot:icon>
                    <StreakFreezeIcon class="w-full my-auto"></StreakFreezeIcon>
                </template>
            </StatItem>

            <StatItem
                name="Lost"
                :value="userStatsData.userStats.streakLostCount"
            >
                <template v-slot:icon>
                    <StreakLostIcon class="w-full my-auto"></StreakLostIcon>
                </template>
            </StatItem>

            <StatItem
                name="Repaired"
                :value="userStatsData.userStats.streakRepairedCount"
                :tooltip="'This number might be higher than the actual repairs that you used yourself.\nMy best guess is that Duolingo marks the streak as repaired after an outage.'"
            >
                <template v-slot:icon>
                    <StreakRepairedIcon class="w-full my-auto"></StreakRepairedIcon>
                </template>
            </StatItem>
        </section>

        <h2 class="text-2xl font-semibold text-white mt-6 mb-2">Most recent day</h2>
        <section
            v-if="userStatsData.userStats.mostRecentDay"
            class="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
            <StatItem
                name="Date"
                :value="userStatsData.userStats.mostRecentDayDateFormatted"
            >
                <template v-slot:icon>
                    <CalendarIcon class="w-full my-auto"></CalendarIcon>
                </template>
            </StatItem>

            <StatItem
                name="Time spend"
                :value="secondsToFormattedString(userStatsData.userStats.mostRecentDay.totalSessionTime)"
            >
                <template v-slot:icon>
                    <ClockIcon class="w-full my-auto"></ClockIcon>
                </template>
            </StatItem>

            <StatItem
                name="Lesson(s)"
                :value="userStatsData.userStats.mostRecentDay.numSessions"
            >
                <template v-slot:icon>
                    <LessonIcon class="w-full my-auto"></LessonIcon>
                </template>
            </StatItem>

            <StatItem
                name="XP gained"
                :value="userStatsData.userStats.mostRecentDay.gainedXp"
            >
                <template v-slot:icon>
                    <XpIcon class="w-full my-auto"></XpIcon>
                </template>
            </StatItem>
        </section>
    </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { secondsToFormattedString } from '../helpers/timeHelper';
import type UserStats from '../types/UserStats';
import StreakIcon from './icons/StreakIcon.vue';
import StreakFreezeIcon from './icons/StreakFreezeIcon.vue';
import StreakLostIcon from './icons/StreakLostIcon.vue';
import StreakRepairedIcon from './icons/StreakRepairedIcon.vue';
import XpIcon from './icons/XpIcon.vue';
import CalendarIcon from './icons/CalendarIcon.vue';
import ClockIcon from './icons/ClockIcon.vue';
import LessonIcon from './icons/LessonIcon.vue';
import StatItem from './StatItem.vue';

defineProps<{
  userStatsData: UserStats
}>();
</script>