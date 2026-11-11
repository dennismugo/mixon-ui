import fs from 'fs';
import path from 'path';
import {
  ALL_ROUTES,
  buildLlmsFullTxt,
  buildLlmsTxt,
  buildRobotsTxt,
  buildSitemapXml,
  injectRouteSeoHtml,
  normalizeSiteUrl,
} from '../src/seo/mixonSeo';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');
const siteUrl = normalizeSiteUrl(process.env.APP_URL || process.env.VITE_SITE_URL);
const prerenderDist = process.argv.includes('--prerender-dist');

function writePublicAssets() {
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), buildRobotsTxt(siteUrl), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildSitemapXml(siteUrl), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), buildLlmsTxt(siteUrl), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), buildLlmsFullTxt(siteUrl), 'utf8');
  console.log(`Generated static SEO/AI assets in public/ for ${siteUrl}`);
}

function prerenderDistRoutes() {
  const distIndexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(distIndexPath)) {
    throw new Error(`Expected built index.html at ${distIndexPath}`);
  }

  const rawTemplate = fs.readFileSync(distIndexPath, 'utf8');
  const templateCopyPath = path.join(distDir, '_template.html');
  fs.writeFileSync(templateCopyPath, rawTemplate, 'utf8');

  for (const route of ALL_ROUTES) {
    const { html } = injectRouteSeoHtml(rawTemplate, route.path, siteUrl);
    if (route.path === '/') {
      fs.writeFileSync(distIndexPath, html, 'utf8');
    } else {
      const routeDir = path.join(distDir, route.path.replace(/^\/+/, ''));
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
    }
  }

  console.log(`Prerendered ${ALL_ROUTES.length} static HTML routes into dist/`);
}

writePublicAssets();
if (prerenderDist) {
  prerenderDistRoutes();
}
