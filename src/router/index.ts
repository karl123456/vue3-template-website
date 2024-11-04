import { createRouter, createWebHashHistory } from 'vue-router';
import { config } from '@/utils/config';
import { useLayoutStore } from '@/stores/layout';
import home from '@/views/home.vue';

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Root',
      component: home,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import('@/views/error.vue'),
      meta: {
        title: '系统错误',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/404.vue'),
      meta: {
        title: '资源不存在',
      },
    },
  ],
});

router.afterEach((to: { meta: { title: string } }) => {
  const layout = useLayoutStore();
  layout.toggleLoading(false);

  const appTitle = config.get('app.title');

  const routeTitle = to.meta.title || '';

  document.title = routeTitle ? `${appTitle} - ${routeTitle}` : appTitle;
});
