import { fileURLToPath, URL } from 'url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './');
  return {
    base: env.VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        [env.VITE_BASE_API]: {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          autoRewrite: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_BASE_API}`), ''),
        },
      },
    },
  };
});
