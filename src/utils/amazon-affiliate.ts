/** Amazon Associates link helpers for KitchenWise. */

export const DEFAULT_ASSOCIATE_TAG = 'kitchenwise-20';

export function amazonAffiliateUrlFromAsin(
  asin: string,
  associateTag = import.meta.env.PUBLIC_ASSOCIATE_TAG ?? DEFAULT_ASSOCIATE_TAG,
): string {
  const id = asin.trim().toUpperCase();
  if (!id) return '#';
  // Amazon Associates retired 2026-08 -- never return a live Amazon URL.
  return '#';
}

export type BottomAmazonPick = {
  asin: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  badge?: string;
  imageUrl?: string;
};
