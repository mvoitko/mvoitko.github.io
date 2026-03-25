import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mxvtk.dev',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
