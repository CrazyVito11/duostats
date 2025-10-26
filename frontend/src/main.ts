import './style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/AuthStore';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');

useAuthStore().initialize();
