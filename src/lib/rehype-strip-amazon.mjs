/**
 * Rehype plugin: when disableAmazon is on, remove every trace of Amazon / dead
 * /products/* links from rendered markdown.
 *  - <a> to amazon.* / amzn.to / ...tag=xxx-20 / internal /products/* => unwrapped (text kept)
 *  - <img> hosted on m.media-amazon.com / images-amazon.com => removed (and emptied wrappers)
 *  - AffiliateCTA-style component tags => removed
 *  - "As an Amazon Associate ..." sentences => removed
 */
import { disableAmazon } from './site-flags.mjs';

const BAD_HREF = /(^|\/\/|\.)(amazon\.[a-z.]+|amzn\.to|a\.co)(\/|$|\?)|[?&]tag=[a-z0-9-]+-2[0-9]|^\/products(\/|$)|\/\/[^/]*castironcanon\.org\/products(\/|$)|\/\/[^/]*kitchenwise\.app\/products(\/|$)/i;
const BAD_IMG = /m\.media-amazon\.com|images-amazon\.com|ssl-images-amazon\.com/i;
const BAD_TAGS = new Set(['affiliatecta', 'curatedamazoncard', 'productcard', 'toppicksblock', 'featuredproductsblock', 'comparisontable', 'stickyproductbar']);
const ASSOC = /as an amazon associate[^.]*\.?/gi;
const DISCLOSURE = /reader-supported|associate tag|amazon associate|may earn (an )?(affiliate )?commission|earn (an )?affiliate (commission|revenue)/i;

function textOf(n) {
  if (n.type === 'text') return n.value;
  return (n.children || []).map(textOf).join('');
}

function href(node) {
  const h = node.properties && node.properties.href;
  return typeof h === 'string' ? h : '';
}

function isEmptyWrapper(node) {
  if (node.type !== 'element') return false;
  if (!['p', 'figure', 'div', 'li', 'span', 'section'].includes(node.tagName)) return false;
  return (node.children || []).every((c) => (c.type === 'text' && !c.value.trim()) || (c.type === 'comment'));
}

function clean(children) {
  const out = [];
  for (const child of children) {
    if (child.type === 'text') {
      if (ASSOC.test(child.value)) child.value = child.value.replace(ASSOC, '');
      ASSOC.lastIndex = 0;
      out.push(child);
      continue;
    }
    if (child.type !== 'element') {
      out.push(child);
      continue;
    }
    const tag = (child.tagName || '').toLowerCase();
    if (BAD_TAGS.has(tag)) continue;
    if ((tag === 'p' || tag === 'li') && DISCLOSURE.test(textOf(child)) && textOf(child).length < 500) continue;
    if (tag === 'img' && BAD_IMG.test(String(child.properties?.src || ''))) continue;
    const hadChildren = (child.children || []).length > 0;
    if (child.children) child.children = clean(child.children);
    if (tag === 'a' && BAD_HREF.test(href(child))) {
      out.push(...child.children);
      continue;
    }
    // Drop wrappers that only existed to hold a removed element.
    if (hadChildren && isEmptyWrapper(child) && child.children.length === 0) continue;
    if (hadChildren && isEmptyWrapper(child)) continue;
    out.push(child);
  }
  return out;
}

export function rehypeStripAmazon() {
  return (tree) => {
    if (!disableAmazon) return;
    tree.children = clean(tree.children || []);
  };
}
