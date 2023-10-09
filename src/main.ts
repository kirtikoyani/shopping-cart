/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import '@/assets/style.css';
import "vue-toast-notification/dist/theme-default.css";
import "vue-toast-notification/dist/theme-sugar.css";
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
