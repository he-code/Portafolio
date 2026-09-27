import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import router from './router/index.js';
import './assets/styles/main.css';

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);

// Modo oscuro único: eliminar la preferencia de tema guardada por versiones anteriores
localStorage.removeItem('theme');

app.mount('#app');
