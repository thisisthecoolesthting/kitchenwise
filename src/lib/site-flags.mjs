// Single source of truth for per-site feature flags.
// disableAmazon: policy "no Amazon on content sites" — injectors become no-ops,
// /products/* is not generated, links/images to Amazon are stripped from rendered markdown.
import fs from 'node:fs';
import path from 'node:path';

let cfg = {};
try {
  cfg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/spawn-home.json'), 'utf8'));
} catch {
  cfg = {};
}

export const disableAmazon = cfg.disableAmazon === true;
