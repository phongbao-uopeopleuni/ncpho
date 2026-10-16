import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {cspMetaPlugin} from './security/csp';
import {menuPagesPlugin} from './scripts/menu-pages';
import {blogPagesPlugin} from './scripts/blog-pages';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const basePath = env.VITE_BASE_PATH || '/';
  return {
    base: basePath,
    // cspMetaPlugin is build-only: production gets the CSP meta tag, dev/HMR does not.
    plugins: [react(), tailwindcss(), cspMetaPlugin(), menuPagesPlugin(), blogPagesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      sourcemap: false,
      minify: 'esbuild',
      target: 'es2020',
      cssMinify: true,
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        "/api": {
          target: `http://127.0.0.1:${env.PORT || 8787}`,
          changeOrigin: true,
        },
      },
    },
  };
});
