/**
 * Formerly inserted phone-case cross-promos after selected h2s.
 * Cross-promo now lives in OwnOffer.astro (end-of-article / sidebar / homepage only),
 * so this plugin is intentionally a no-op. The registration is kept in astro.config.mjs
 * (removing registrations has broken builds on sibling sites).
 */
export function rehypeInjectPhonePromos() {
  return () => {};
}
