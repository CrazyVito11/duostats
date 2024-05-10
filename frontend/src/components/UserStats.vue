<template>
    <section class="flex flex-col w-full">
        <h2 class="text-2xl font-semibold text-white mb-2">General user info</h2>
        <section class="flex flex-col md:flex-row">
            <StatItem
                name="Total days"
                :value="userStatsData.totalDayCount"
            >
                <template v-slot:icon>
                    <CalendarIcon class="h-full"></CalendarIcon>
                </template>
            </StatItem>

            <StatItem
                name="Streak"
                :value="userStatsData.streak"
            >
                <template v-slot:icon>
                    <StreakIcon class="h-full"></StreakIcon>
                </template>
            </StatItem>

            <StatItem
                name="Total XP"
                :value="userStatsData.totalXp"
            >
                <template v-slot:icon>
                    <XpIcon class="h-full"></XpIcon>
                </template>
            </StatItem>

            <StatItem
                name="Total time"
                :value="secondsToFormattedString(userStatsData.totalTimeSpend)"
            >
                <template v-slot:icon>
                    <ClockIcon class="h-full"></ClockIcon>
                </template>
            </StatItem>
        </section>

        <h2 class="text-2xl font-semibold text-white mt-6 mb-2">Most recent day</h2>
        <section
            v-if="userStatsData.mostRecentDay"
            class="flex flex-col md:flex-row"
        >
            <StatItem
                name="Date"
                :value="userStatsData.mostRecentDayDateFormatted"
            >
                <template v-slot:icon>
                    <CalendarIcon class="h-full"></CalendarIcon>
                </template>
            </StatItem>

            <StatItem
                name="Time spend"
                :value="secondsToFormattedString(userStatsData.mostRecentDay.totalSessionTime)"
            >
                <template v-slot:icon>
                    <ClockIcon class="h-full"></ClockIcon>
                </template>
            </StatItem>

            <StatItem
                name="Lesson(s)"
                :value="userStatsData.mostRecentDay.numSessions"
            >
                <template v-slot:icon>
                    <LessonIcon class="h-full"></LessonIcon>
                </template>
            </StatItem>

            <StatItem
                name="XP gained"
                :value="userStatsData.mostRecentDay.gainedXp"
            >
                <template v-slot:icon>
                    <XpIcon class="h-full"></XpIcon>
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
import XpIcon from './icons/XpIcon.vue';
import CalendarIcon from './icons/CalendarIcon.vue';
import ClockIcon from './icons/ClockIcon.vue';
import LessonIcon from './icons/LessonIcon.vue';
import StatItem from './StatItem.vue';

defineProps<{
  userStatsData: UserStats
}>();
</script>