import { useEffect } from 'react';
import {
  buildRouteJsonLd,
  normalizeSiteUrl,
  PageId,
  ROUTE_SEO,
  serializeJsonLd,
} from '../seo/mixonSeo';

interface SeoHeadManagerProps {
  currentPage: PageId;
}

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonicalLink(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Synchronizes document title, meta description, canonical URL, Open Graph/Twitter cards,
 * and Schema.org JSON-LD graph whenever the active client route changes.
 */
export function SeoHeadManager({ currentPage }: SeoHeadManagerProps) {
  useEffect(() => {
    const route = ROUTE_SEO[currentPage] || ROUTE_SEO.home;
    const siteUrl = normalizeSiteUrl(
      typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_SITE_URL : undefined,
    );
    const canonicalUrl = `${siteUrl}${route.path === '/' ? '/' : route.path}`;

    document.title = route.title;
    upsertMetaTag('name', 'description', route.description);
    upsertCanonicalLink(canonicalUrl);

    upsertMetaTag('property', 'og:title', route.title);
    upsertMetaTag('property', 'og:description', route.description);
    upsertMetaTag('property', 'og:url', canonicalUrl);

    upsertMetaTag('name', 'twitter:title', route.title);
    upsertMetaTag('name', 'twitter:description', route.description);

    const jsonLd = buildRouteJsonLd(currentPage, siteUrl);
    let scriptEl = document.getElementById('mixon-route-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'mixon-route-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.text = serializeJsonLd(jsonLd);
  }, [currentPage]);

  return null;
}

export default SeoHeadManager;
