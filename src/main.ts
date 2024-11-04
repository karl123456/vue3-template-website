import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { i18n } from '@/utils/i18n';
import { boot } from '@/utils/boot';
import { global } from '@/utils/global';
import tap from '@/directive/tap';
import '@/styles/style.scss';

import { router } from './router';
import App from './App.vue';

boot().then((config) => {
  const app = createApp(App);
  global.app = app;

  app.use(i18n.core);
  i18n.useLocale(config.language);

  const pinia = createPinia();
  app.use(pinia);
  global.store = pinia;

  app.use(router);
  global.router = router;

  app.use(tap);

  app.mount('#app');
});
