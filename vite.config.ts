import { defineConfig } from 'vite';

export default defineConfig({
  // Ruta relativa: funciona en GitHub Pages (https://usuario.github.io/fuc-preview/) sin hardcodear el nombre del repo.
  base: './',
  server: {
    port: 5180,
    strictPort: true,
  },
});
