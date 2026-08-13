import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { rehypeInjectPhonePromos } from './src/lib/rehype-inject-phone-promos.mjs';

// Sitemap temporarily disabled — @astrojs/sitemap 3.x crashes with
// our current route set. Re-enable once upstream ships a fix or we
// build a custom sitemap via pages/sitemap.xml.ts.
// import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kitchenwise.app',
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    // sitemap(),
  ],
  build: {
    format: 'directory',
  },
  markdown: {
    rehypePlugins: [
      rehypeInjectPhonePromos,
    ],
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
