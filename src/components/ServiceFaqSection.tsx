import { FaqEntry } from '../seo/mixonSeo';
import { ProductFaqSection } from './ProductFaqSection';

/**
 * Full-width FAQ section for Mixon service pages, delegating to ProductFaqSection
 * so every Product and Service page stays visually identical to the Homepage FAQ system.
 */
export function ServiceFaqSection({ faqs }: { faqs: FaqEntry[] }) {
  return <ProductFaqSection faqs={faqs} idPrefix="service-faq" />;
}
