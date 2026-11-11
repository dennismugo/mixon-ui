import ProductServiceHero from '../../components/ProductServiceHero';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { ServiceFaqSection } from '../../components/ServiceFaqSection';
import { ECOMMERCE_SERVICE_FAQS } from '../../seo/mixonSeo';
import { ServiceCapabilities } from '../../components/ServiceCapabilities';
import { ServiceClosingCta } from '../../components/ServiceClosingCta';
import { ServicePhilosophySection } from '../../components/ServicePhilosophySection';
import { 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Store, 
  Search, 
  Check, 
  Activity, 
  CreditCard
} from 'lucide-react';

interface EcommerceServiceProps {
  setCurrentPage: (page: any) => void;
}

export default function EcommerceService({ setCurrentPage }: EcommerceServiceProps) {
  const deliverables = [
    {
      title: "Bespoke storefront design",
      desc: "Tailor-made e-commerce storefront crafted specifically around your physical catalog, photography, and brand aesthetic."
    },
    {
      title: "Frictionless, trusted checkout",
      desc: "Streamlined 1-page checkout supporting M-Pesa Daraja STK push, credit/debit cards, Apple Pay, and local mobile money."
    },
    {
      title: "Live inventory & order control",
      desc: "Real-time stock level synchronization across online orders and physical shop locations to eliminate backorders."
    },
    {
      title: "Faceted search & product discovery",
      desc: "Instant search autocomplete, multi-attribute filtering (size, color, category, price), and related product cross-sells."
    },
    {
      title: "Staff-friendly catalog management",
      desc: "Clean product management dashboard where your team can add variants, create discount codes, and print packing slips."
    },
    {
      title: "Automated customer notifications",
      desc: "Instant SMS and email order confirmation receipts, dispatch tracking links, and abandoned cart recovery sequences."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Understand",
      desc: "We analyze your catalog variants, target buyer habits, packaging logistics, and fulfillment process."
    },
    {
      step: "02",
      title: "Design the shopping journey",
      desc: "We map intuitive navigation from landing page to product specifications, cart review, and checkout."
    },
    {
      step: "03",
      title: "Build and test checkout",
      desc: "We engineer the store and test payment gateways end-to-end with real transactions, coupons, and tax rules."
    },
    {
      step: "04",
      title: "Launch & optimize",
      desc: "We deploy to production, monitor purchase funnel drop-offs with telemetry, and optimize conversion rates."
    }
  ];

  const faqs = ECOMMERCE_SERVICE_FAQS;

  return (
    <div className="mixon-interior-page mixon-service-detail bg-white text-gray-900 pt-28 pb-0 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: ShoppingBag,
          name: "Modern E-Commerce",
          tag: "High Conversion"
        }}
        title="An online store that makes buying feel effortless."
        subtitle="Fast, friction-free digital checkouts, real-time multi-location inventory synchronization, automated dispatch workflows, and native M-Pesa STK push integration."
        primaryCta={{
          text: "Build your online store",
          onClick: () => setCurrentPage('contact')
        }}
        secondaryCta={{
          text: "View e-commerce plans",
          onClick: () => setCurrentPage('pricing')
        }}
      />


      {/* THE STORY / PHILOSOPHY */}
      <ServicePhilosophySection
        eyebrow="THE SHOPPING EXPERIENCE"
        eyebrowColorClass="text-rose-600"
        heading="Shaped around your catalogue and customers"
        introText="We shape the shopping experience around your catalogue, customers and operations, from product pages to checkout, so shoppers choose with confidence and buy with less friction."
        statement="We eliminate complex multi-step checkouts, sluggish product filtering, and unexpected payment errors that cause shoppers to abandon their carts."
        primaryButtonText="Get an e-commerce proposal"
        secondaryButtonText="View e-commerce plans"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('pricing')}
      />

      {/* CAPABILITIES */}
      <ServiceCapabilities eyebrow={'DELIVERABLES'} heading={'What you get'} description={'Comprehensive digital storefront architecture from inventory intake to post-purchase tracking.'} items={deliverables} />

      {/* HOW WE WORK */}
      <HowItWorksSection eyebrow="4-STEP PROCESS" heading="How we work" description='From catalog mapping to checkout optimization with real customer telemetry.' steps={steps} />

      {/* COMMON QUESTIONS */}
      <ServiceFaqSection faqs={faqs} />

      {/* CLOSING CTA (FULL-WIDTH IMAGE BG LIKE IMAGE 2) */}
      <ServiceClosingCta
        title={
          <>
            Ready for an online store that <br className="hidden sm:inline" />
            turns visitors into repeat buyers?
          </>
        }
        subtitle="Tell us about your product catalog and how you fulfill orders. We will provide a tailored storefront proposal."
        primaryButtonText="Build your online store"
        secondaryButtonText="View all services"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('services')}
      />
    </div>
  );
}
