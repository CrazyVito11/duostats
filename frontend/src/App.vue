<template>
  <section class="m-auto w-full max-w-2xl">
    <section class="px-4 py-6 mt-4 mb-16 bg-slate-800 border border-white/10 rounded-md shadow-md flex flex-col">
      <DuolingoLogo class="max-w-[275px] w-full px-4 mx-auto mb-4" />

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

        <small
            v-if="errorMessage"
            v-text="errorMessage"
            class="text-sm text-red-500 mt-2"
        ></small>
      </section>

      <section v-if="! isFetchingStatsData && userStatsData" class="w-full flex flex-col">
        <div class="w-full border-t border-white/10 my-4"></div>

        <UserStats :user-stats-data="userStatsData" />
      </section>

      <AuthenticationModal />
    </section>
  </section>

  <section class="absolute bottom-5 right-5 grid grid-cols-2 space-x-2">
      <a
          href="#"
          title="Duolingo authentication"
          class="text-white hover:text-duolingo-blue-light transition-colors"
          @click="authStore.authenticationModalIsOpen = true"
      >
        <UserIcon class="h-8 w-8" />
      </a>
      <a
          href="https://github.com/CrazyVito11/duostats"
          title="Visit the Duostats GitHub repository"
          target="_blank"
          class="text-white hover:text-duolingo-blue-light transition-colors"
      >
        <GithubLogo class="h-8 w-8" />
      </a>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { UserIcon } from '@heroicons/vue/24/solid';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from './stores/AuthStore';
import type UserStatsType from './types/UserStats';
import type ApiErrorResponse from './types/ApiErrorResponse';
import DuolingoLogo from './components/logos/DuolingoLogo.vue';
import GithubLogo from './components/logos/GithubLogo.vue';
import UserStats from './components/UserStats.vue';
import AuthenticationModal from './components/AuthenticationModal.vue';

const authStore = useAuthStore();

const isFetchingStatsData = ref<boolean>(false);
const errorMessage = ref<string|null>(null);
const userStatsData = ref<UserStatsType|null>(null);
const usernameInput = ref<string>('');

const fetchUserStats = () => {
  if (! usernameIsValid.value) {
    return;
  }

  isFetchingStatsData.value = true;
  errorMessage.value = null;
  userStatsData.value = null;

  const params: Record<string, string> = {
    username: usernameInput.value,
  };

  axios.get('/api/stats', { params })
    .then((response: AxiosResponse<UserStatsType>) => {
      userStatsData.value = response.data;
    })
    .catch((error: AxiosError<ApiErrorResponse>) => {
      const message = error.response?.data.message;

      errorMessage.value = message ? message : 'An unknown error occurred';
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

    fetchUserStats();
  }
});
</script>
