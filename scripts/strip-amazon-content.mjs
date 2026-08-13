/**
 * One-off: strip Amazon links, cards, images, and frontmatter from src/content.
 */
import fs from 'node:fs';
import path from 'node:path';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function stripFrontmatter(fm) {
  let s = fm;
  const dropKeys = [
    /^asin:\s.*$/gim,
    /^affiliateUrl:\s.*$/gim,
    /^isPrime:\s.*$/gim,
    /^commissionPerSale:\s.*$/gim,
  ];
  for (const re of dropKeys) s = s.replace(re, '');
  s = s.replace(/^imageUrl:\s*https?:\/\/[^\n]*amazon[^\n]*$/gim, 'imageUrl: ""');
  s = s.replace(/\r?\n{3,}/g, '\n\n');
  return s.trimEnd();
}

function cleanBody(text) {
  let s = text;

  s = s.replace(/<div class="amazon-inline-card[^"]*"[^>]*>[\s\S]*?<\/a>\s*<\/div>\s*\r?\n?/gi, '');
  s = s.replace(/<AffiliateCTA[^>]*\/>\s*\r?\n?/gi, '');
  s = s.replace(/<a[^>]*href="[^"]*amazon\.com[^"]*"[^>]*>[\s\S]*?<\/a>\s*\r?\n?/gi, '');
  s = s.replace(/<img[^>]*src="[^"]*(?:media-amazon|ssl-images-amazon|amazon-adsystem)[^"]*"[^>]*>\s*\r?\n?/gi, '');

  s = s.replace(/\[([^\]]+)\]\(\s*https?:\/\/(?:www\.)?amazon\.com[^)]+\)/gi, '$1');
  s = s.replace(/\[([^\]]+)\]\(\s*https?:\/\/amzn\.to[^)]+\)/gi, '$1');
  s = s.replace(/<a[^>]*href="[^"]*amazon\.com[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, '$1');

  s = s.replace(/[^\n]*(?:As an Amazon Associate|Amazon Services LLC Associates|may earn a commission|earn from qualifying purchases|Shop on Amazon|Buy on Amazon|Check (?:current )?price on Amazon|View on Amazon|Amazon link|associate tag|our Amazon)[^\n]*\r?\n?/gi, '');
  s = s.replace(/ASIN \*\*[A-Z0-9]{10}\*\*[^\n]*\r?\n?/gi, '');
  s = s.replace(/ASIN [A-Z0-9]{10}[^\n]*\r?\n?/gi, '');

  s = s.replace(/\bon Amazon\b/gi, 'online');
  s = s.replace(/\bAmazon shoppers\b/gi, 'Shoppers');
  s = s.replace(/\bAmazon listing\b/gi, 'retailer listing');
  s = s.replace(/\bAmazon category\b/gi, 'category');
  s = s.replace(/\bAmazon listings\b/gi, 'retailer listings');
  s = s.replace(/\bAmazon\b/g, 'the retailer');

  s = s.replace(/\r?\n{4,}/g, '\n\n\n');
  return s;
}

function cleanMarkdown(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return cleanBody(text);
  const fm = stripFrontmatter(m[1]);
  const body = cleanBody(m[2]);
  return `---\n${fm}\n---\n${body}`;
}

const files = walk(CONTENT_ROOT);
let changed = 0;
for (const file of files) {
  const orig = fs.readFileSync(file, 'utf8');
  const next = cleanMarkdown(orig);
  if (next !== orig) {
    fs.writeFileSync(file, next, 'utf8');
    changed++;
  }
}
console.log(`Updated ${changed} content files`);
