<template>
    <Modal :is-open="authStore.authenticationModalIsOpen">
        <section class="w-full">
            <section class="w-full flex flex-row mb-2">
                <h1 class="text-2xl font-semibold text-white">Authentication</h1>
                <XMarkIcon
                    @click="authStore.authenticationModalIsOpen = false"
                    class="text-white h-8 my-auto ml-auto cursor-pointer hover:text-duolingo-red transition-colors"
                />
            </section>

            <p class="text-white mb-4">
                To access more detailed statistics, we need to be authenticated using your Duolingo account.
                For this we will need your JWT token, which allows us to request the data on your behalf.
                Follow the steps below
            </p>

            <ul class="text-white pl-4 mb-4 list-disc">
                <li>Visit Duolingo in another tab.</li>
                <li>Click on "Profile".</li>
                <li>Open the browser developer tools. <span class="italic">(Ctrl + Shift + I)</span></li>
                <li>Click on the "Console" tab.</li>
                <li>Copy and paste the code snippet below into the console and hit enter.</li>
                <li>Copy the resulting text into the textbox below.</li>
            </ul>

            <fieldset class="max-w-full min-w-0 flex flex-col mb-4">
                <label for="jwt_code_snippet" class="text-white font-semibold">Code snippet</label>
                <code id="jwt_code_snippet" class="block min-w-0 border border-white/10 rounded-md text-sm px-4 py-2 bg-slate-900 text-white overflow-x-scroll text-nowrap w-full">
                    document.cookie.split('; ').find(c => c.startsWith('jwt_token='))?.split('=')[1] || null; 
                </code>
            </fieldset>

            <section class="max-w-full flex flex-col mb-4">
                <label class="text-white font-semibold">Example of running the script</label>
                <img
                    class="w-auto h-auto max-w-full mr-auto"
                    src="../assets/jwt_token_browser_console.webp"
                    alt="Example of running the script inside your browsers development tools"
                >
            </section>

            <fieldset class="max-w-full min-w-0 flex flex-col mb-4">
                <label for="jwt_token" class="text-white font-semibold">JWT token</label>
                <input
                    id="jwt_token"
                    v-model="jwtToken"
                    type="text"
                    placeholder="AAAAAAAAAAAA.BBBBBBBBBBBB.CCCCCCCCCCCC"
                    class="bg-slate-900 text-white ring-1 ring-inset ring-white/10 focus:ring-duolingo focus:ring-2 focus:ring-inset outline-none transition-all rounded px-2 py-1"
                >
            </fieldset>

            <Alert alert-style="warning" title="Do not share this token">
                Make sure you keep this token safe, as it's the same as giving your login credentials.
            </Alert>

            <Alert alert-style="information" title="Privacy" class="mb-4">
                This token is stored on your device and is only transferred while fetching your statistics.
            </Alert>

            <button
                @click="saveChanges()"
                class="w-full px-4 py-2 bg-duolingo-blue hover:bg-duolingo-blue-light text-white font-semibold rounded-md transition-colors"
            >
                Save
            </button>
        </section>
    </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/AuthStore';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import Alert from './Alert.vue';
import Modal from './Modal.vue';

const authStore = useAuthStore();

const jwtToken = ref<string|null>(null);


const saveChanges = () => {
    let tokenValue = jwtToken.value ?? '';

    tokenValue = tokenValue.replaceAll('"', '');

    authStore.saveDuolingoJwtToken(tokenValue);

    // TODO: Provide user feedback that it has been saved
};

authStore.$subscribe((mutation, state) => {
    if (jwtToken.value === state.duolingoJwtToken) {
        return;
    }

    jwtToken.value = state.duolingoJwtToken;
});
</script>
