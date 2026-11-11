import ProductServiceHero from '../../components/ProductServiceHero';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { ServiceFaqSection } from '../../components/ServiceFaqSection';
import { WEB_SERVICE_FAQS } from '../../seo/mixonSeo';
import { ServiceCapabilities } from '../../components/ServiceCapabilities';
import { ServiceClosingCta } from '../../components/ServiceClosingCta';
import { ServicePhilosophySection } from '../../components/ServicePhilosophySection';
import { 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  Search,
  Check,
  Activity
} from 'lucide-react';

interface WebServiceProps {
  setCurrentPage: (page: any) => void;
}

export default function WebService({ setCurrentPage }: WebServiceProps) {
  const deliverables = [
    {
      title: "Custom, mobile-first design",
      desc: "Designed from scratch to reflect your visual brand, typography, and personality — never a recycled generic template."
    },
    {
      title: "Built-in performance & security",
      desc: "Sub-second load speeds, optimized Core Web Vitals, enterprise SSL encryption, and high-resilience cloud hosting."
    },
    {
      title: "Clear conversion structure",
      desc: "Page layout and calls to action engineered to guide visitors to take the next step without cognitive friction."
    },
    {
      title: "Intuitive Content Management (CMS)",
      desc: "A clean editing interface your non-technical team can update confidently without breaking designs or layout."
    },
    {
      title: "Technical SEO from day one",
      desc: "Semantic HTML5, automated XML sitemaps, structured schema markups, and fast crawlability baked into every template."
    },
    {
      title: "Web apps, portals & dashboards",
      desc: "Interactive client portals, member directories, and operational dashboards when your business needs more than a brochure."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Discover",
      desc: "We clarify your commercial goals, target audience intent, and the exact actions a visitor should take on each page."
    },
    {
      step: "02",
      title: "Design",
      desc: "We structure the content wireframes, typographic hierarchy, and visual look and feel, presenting interactive designs before coding begins."
    },
    {
      step: "03",
      title: "Build and test",
      desc: "We develop with modern React & TypeScript, testing thoroughly across smartphones, tablets, laptops, and varying connection speeds."
    },
    {
      step: "04",
      title: "Launch, measure & improve",
      desc: "We deploy with zero-downtime DNS routing, configure analytics tracking, and monitor initial user sessions to refine conversion rates."
    }
  ];

  const faqs = WEB_SERVICE_FAQS;

  return (
    <div className="mixon-interior-page mixon-service-detail bg-white text-gray-900 pt-28 pb-0 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: Globe,
          name: "Web Development",
          tag: "Modern Architecture"
        }}
        title="A website that helps people understand you, and act."
        subtitle="We design and develop fast, accessible websites and custom web applications that bring your brand, content, and conversion goals together."
        primaryCta={{
          text: "Get a website proposal",
          onClick: () => setCurrentPage('contact')
        }}
        secondaryCta={{
          text: "View website packages",
          onClick: () => setCurrentPage('pricing')
        }}
      />

      {/* THE PHILOSOPHY */}
      <ServicePhilosophySection
        eyebrow="THE PHILOSOPHY"
        eyebrowColorClass="text-[#0066FF]"
        heading="Clear, dependable, built to be found"
        introText="We design and develop responsive websites that bring your brand, content and business goals together. Modern, fast, accessible and built to be found by human visitors and AI answer engines alike."
        statement="We don't build generic template placeholders. We craft responsive web platforms that guide customers straight to a clear, confident action."
        primaryButtonText="Get a website proposal"
        secondaryButtonText="View website packages"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('pricing')}
      />

      {/* CAPABILITIES */}
      <ServiceCapabilities eyebrow={'DELIVERABLES'} heading={'What you get'} description={'Six foundational commitments included with every Mixon web project.'} items={deliverables} />

      {/* HOW WE WORK */}
      <HowItWorksSection eyebrow="4-STEP PROCESS" heading="How we work" description='From discovery conversation to a live, converting website.' steps={steps} />

      {/* COMMON QUESTIONS */}
      <ServiceFaqSection faqs={faqs} />

      {/* CLOSING CTA (FULL-WIDTH IMAGE BG LIKE IMAGE 2) */}
      <ServiceClosingCta
        title={
          <>
            Ready for a website that works <br className="hidden sm:inline" />
            as hard as you do?
          </>
        }
        subtitle="Tell us about your brand and what you want visitors to do. A real engineer replies within one business day with transparent pricing and no jargon."
        primaryButtonText="Get a website proposal"
        secondaryButtonText="Explore Website Packages"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('pricing')}
      />
    </div>
  );
}
