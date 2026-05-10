import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const ASSOCIATE_TAG = process.env.PUBLIC_ASSOCIATE_TAG || 'kitchenwise-20';

function rehypeAugmentProductLinks() {
  const productHrefRe = /^\/products\/([a-z0-9]+)-/i;

  function walk(node) {
    if (!node || !Array.isArray(node.children)) return;
    const out = [];
    for (const child of node.children) {
      if (
        child &&
        child.type === 'element' &&
        child.tagName === 'a' &&
        child.properties &&
        typeof child.properties.href === 'string'
      ) {
        const m = child.properties.href.match(productHrefRe);
        if (m) {
          const asin = m[1].toUpperCase();
          const amazonHref =
            'https://www.amazon.com/dp/' + asin + '?tag=' + ASSOCIATE_TAG + '&linkCode=ll1';

          out.push({
            type: 'element',
            tagName: 'span',
            properties: { className: ['product-link-pair'] },
            children: [
              child,
              {
                type: 'element',
                tagName: 'a',
                properties: {
                  href: amazonHref,
                  rel: 'nofollow sponsored noopener',
                  target: '_blank',
                  className: ['amazon-cta-inline'],
                },
                children: [{ type: 'text', value: 'Check on Amazon →' }],
              },
            ],
          });
          continue;
        }
      }
      walk(child);
      out.push(child);
    }
    node.children = out;
  }

  return (tree) => walk(tree);
}

function safeSitemap() {
  const integration = sitemap();
  const buildDone = integration.hooks?.['astro:build:done'];
  if (buildDone) {
    integration.hooks['astro:build:done'] = async (args) => {
      try {
        await buildDone(args);
      } catch (error) {
        args.logger.warn(`@astrojs/sitemap skipped; custom sitemap route remains active. ${error.message}`);
      }
    };
  }
  return integration;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://kitchenwise.app/',
  trailingSlash: 'never',
  integrations: [tailwind(), safeSitemap()],
  build: { format: 'directory' },
  markdown: {
    rehypePlugins: [rehypeAugmentProductLinks],
    shikiConfig: { theme: 'github-light' },
  },
});
