import { createApp } from 'vue';
import '@unocss/reset/tailwind.css';
import 'uno.css';

import App from './App.vue';
import './styles/base.css';
import { start } from './mocks/worker';

// Router
import { Router } from '/@/router';

import { Theme, themeKey } from './data/theme';

start();

const theme: Theme = {
  light: {
    primary: '#1e232d',
    secondary: '#2d281e',
    background: '#fff',
    text: '#1e232d',
    highlight: '#61dafb',
  },
  dark: {
    primary: '#1e232d',
    secondary: '#fff',
    background: '#1e232d',
    text: '#fff',
    highlight: '#2d281e',
  },
};

const app = createApp(App);

app.use(Router);

app.provide(themeKey, theme);

app.mount('#app');
