Working directory is already this site's repo. git pull origin main first (if that fails, keep local and continue).

GOAL: remove ALL Amazon presence from this Astro site - not just clickable links. That means: outbound amazon.com/amzn.to links, ASIN identifiers (data-asin, ?tag=, /dp/ patterns, asin fields in content/data files), and Amazon product IMAGES (any m.media-amazon.com or images-na.ssl-images-amazon.com hotlink), plus "Amazon Associate"/"as an Amazon Associate" disclosure text. Replace removed product cards/CTAs with internal links to our own /products/ pages, or with our CaseAdSlot / SiteSectionAds fleet-ad component if one is already imported elsewhere in this repo (grep for "CaseAdSlot" and "SiteSectionAds" to see if they exist in this repo; if not present, just drop the Amazon card and leave the surrounding layout intact - do not invent a new ad component).

STEPS:
1. grep -ri "amazon" and "asin" and "amzn.to" across src/ (astro.config.mjs, layouts, components, pages, content/*.md) to find every touch point.
2. Remove rehype plugins that inject Amazon cards/links (look for names like rehypeFixAmazonInline, rehypeAugmentProductLinks, rehypeInjectAmazonMidPicks in astro.config.mjs).
3. Remove/replace components (AffiliateCTA, CuratedAmazonCard, amazon-inline-card divs, ProductCard "View on Amazon" links) with internal-only equivalents.
4. Strip Amazon JSON-LD fields (offers.url, seller, brand tied to Amazon).
5. Sweep content/*.md files removing amazon-inline-card divs, [text](amazon url) markdown links, raw <a href="amazon..."> cards, "Buy on Amazon" labels, Amazon image hotlinks (<img src="...m.media-amazon.com...">), "may earn a commission" sentences.
6. Rewrite disclosure/privacy/methodology pages and footer to drop Amazon Associates Program language.
7. Run: npm run build (retry once if it OOM-crashes with exit 137). Fix any build errors caused by your edits.
8. If build passes: git add -A && git commit -m "Remove all Amazon links, ASINs, and product images - fleet ads only" && git push origin main
9. Report: final commit hash, build pass/fail, and a count of how many files you changed.

Do NOT touch unrelated files. Do NOT invent new pages. This mirrors the already-completed inkledger.org fix - same pattern, this site's specific file structure.