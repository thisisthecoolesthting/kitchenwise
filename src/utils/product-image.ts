/** Product image URLs — curated catalog URL first, optional local asset, SVG last. */

import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

const FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>` +
      `<rect width='120' height='120' fill='#EBE6DF'/>` +
      `<g fill='none' stroke='#64748B' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'>` +
      `<rect x='28' y='34' width='64' height='52' rx='6'/>` +
      `<circle cx='46' cy='52' r='5'/>` +
      `<path d='m34 78 16-16 14 12 10-8 12 14'/>` +
      `</g></svg>`,
  );

const MIN_IMAGE_BYTES = 512;

const AMAZON_HOST_RE = /amazon\.com|media-amazon|ssl-images-amazon|amazon-adsystem/i;

export function localProductImagePath(slug: string): string {
  return `/images/products/${slug}.jpg`;
}

export function isAmazonImageUrl(url: string): boolean {
  return AMAZON_HOST_RE.test(url.trim());
}

export function productImageCandidates(
  slug: string,
  imageUrl?: string | null,
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const add = (candidate?: string | null) => {
    const value = (candidate ?? '').trim();
    if (!value || seen.has(value) || isAmazonImageUrl(value)) return;
    seen.add(value);
    out.push(value);
  };

  if (imageUrl?.trim()) add(imageUrl.trim());
  add(localProductImagePath(slug));
  add(FALLBACK_SVG);
  return out;
}

function localFileOk(publicRoot: string, src: string): boolean {
  const full = path.join(publicRoot, src.replace(/^\//, ''));
  if (!existsSync(full)) return false;
  try {
    return statSync(full).size >= MIN_IMAGE_BYTES;
  } catch {
    return false;
  }
}

async function remoteUrlOk(url: string): Promise<boolean> {
  if (url.startsWith('data:')) return true;
  if (isAmazonImageUrl(url)) return false;
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'KitchenWiseBuild/1.0' },
      redirect: 'follow',
    });
    if (!res.ok) return false;
    const len = Number(res.headers.get('content-length') || 0);
    return len >= MIN_IMAGE_BYTES;
  } catch {
    return false;
  }
}

/** Pick the first candidate that exists locally or responds with a real image body. */
export async function resolveProductImageSources(
  slug: string,
  imageUrl: string | null | undefined,
  publicRoot: string,
): Promise<{ primary: string; fallbacks: string[] }> {
  const candidates = productImageCandidates(slug, imageUrl);
  const valid: string[] = [];

  for (const src of candidates) {
    if (src.startsWith('/images/')) {
      if (localFileOk(publicRoot, src)) valid.push(src);
      continue;
    }
    if (src.startsWith('data:')) {
      valid.push(src);
      continue;
    }
    if (await remoteUrlOk(src)) valid.push(src);
  }

  if (!valid.length) {
    return { primary: FALLBACK_SVG, fallbacks: [] };
  }

  return { primary: valid[0], fallbacks: valid.slice(1) };
}

export function primaryProductImage(
  slug: string,
  imageUrl?: string | null,
): string {
  return productImageCandidates(slug, imageUrl)[0] ?? FALLBACK_SVG;
}

export { FALLBACK_SVG, MIN_IMAGE_BYTES };
