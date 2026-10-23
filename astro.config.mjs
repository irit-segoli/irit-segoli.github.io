// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://irit-segoli.github.io',
  // Emit /page.html instead of /page/index.html so GitHub Pages serves /page without a redirect
  build: { format: 'file' },
  vite: {
    plugins: [tailwindcss()]
  }
});