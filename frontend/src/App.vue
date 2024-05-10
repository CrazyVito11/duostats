<template>
  <section class="max-w-2xl px-4 py-6 w-full m-auto bg-slate-800 border border-white/10 rounded-md shadow-md flex flex-col">
    <DuolingoLogo class="max-w-[275px] w-full px-4 mx-auto mb-4"></DuolingoLogo>

    <section class="flex flex-col w-full max-w-sm mx-auto">
      <fieldset class="flex flex-col mb-4">
        <label for="user_name_input" class="text-white">Duolingo Username:</label>
        <input
            v-model="usernameInput"
            id="user_name_input"
            type="text"
            placeholder="Username"
            class="bg-slate-900 text-white ring-1 ring-inset ring-white/10 focus:ring-duolingo focus:ring-2 focus:ring-inset outline-none transition-all rounded px-2 py-1"
        >
        <small class="text-xs text-white/80 mt-1">Please make sure it's your username and not your profile name!</small>
      </fieldset>

      <button
          @click="fetchUserStats()"
          :disabled="isFetchingStatsData"
          class="w-full px-4 py-2 bg-duolingo-blue disabled:bg-slate-900 text-white font-semibold rounded-md transition-colors"
          :class="{ 'hover:bg-duolingo-blue-light': !isFetchingStatsData }"
      >
        <span
            v-if="! isFetchingStatsData"
            class="m-auto"
        >
          Fetch stats
        </span>
        <svg
          v-else
          class="animate-spin m-auto h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </section>

    <section v-if="! isFetchingStatsData && userStatsData" class="w-full flex flex-col">
      <div class="w-full border-t border-white/10 my-4"></div>

      <UserStats :user-stats-data="userStatsData"></UserStats>
    </section>
  </section>

  <div class="absolute bottom-5 right-5">
      <a
          href="https://github.com/CrazyVito11/duostats-2023"
          title="Visit the Duostats GitHub repository"
          target="_blank"
          class="text-white hover:text-duolingo-blue-light transition-colors"
      >
        <GithubLogo class="h-8 w-8"></GithubLogo>
      </a>
    </div>
</template>

<script setup lang="ts">
import type UserStatsType from './types/UserStats';
import { computed, ref, onMounted } from 'vue';
import axios, { AxiosResponse } from 'axios';
import DuolingoLogo from './components/logos/DuolingoLogo.vue';
import GithubLogo from './components/logos/GithubLogo.vue';
import UserStats from './components/UserStats.vue';

const isFetchingStatsData = ref<boolean>(false);
const userStatsData = ref<UserStatsType|null>(null);
const usernameInput = ref<string>('');

const fetchUserStats = () => {
  if (! usernameIsValid.value) {
    return;
  }

  isFetchingStatsData.value = true;
  userStatsData.value = null;

  axios.get(`/api/stats/${usernameInput.value}`)
  .then((response: AxiosResponse) => {
    userStatsData.value = response.data;
  })
  .finally(() => {
    isFetchingStatsData.value = false;
  });
};

const usernameIsValid = computed(() => {
  return (
    usernameInput.value.length > 0
  );
});

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlUsername = urlParams.get('username');

  if (urlUsername) {
    usernameInput.value = urlUsername;
  }
});
</script>
