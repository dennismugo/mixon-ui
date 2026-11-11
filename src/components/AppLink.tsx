import React, { forwardRef } from 'react';
import { getRoutePath, PageId } from '../seo/mixonSeo';

export interface AppLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  page: PageId;
  hash?: string;
  onNavigate: (page: PageId) => void;
}

/**
 * Crawlable `<a href="/...">` anchor link that performs client-side SPA transitions on normal clicks
 * while preserving native browser middle-click, Cmd/Ctrl+click new-tab, and search crawler discovery.
 */
export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(function AppLink(
  { page, hash, onNavigate, onClick, children, ...rest },
  ref,
) {
  const basePath = getRoutePath(page);
  const normalizedHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
  const href = `${basePath}${normalizedHash}`;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    onNavigate(page);

    if (normalizedHash) {
      window.setTimeout(() => {
        const target = document.querySelector(normalizedHash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    }
  };

  return (
    <a ref={ref} href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
});

export default AppLink;
