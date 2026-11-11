import ProductServiceHero from '../../components/ProductServiceHero';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { ServiceFaqSection } from '../../components/ServiceFaqSection';
import { SEO_SERVICE_FAQS } from '../../seo/mixonSeo';
import { ServiceCapabilities } from '../../components/ServiceCapabilities';
import { ServiceClosingCta } from '../../components/ServiceClosingCta';
import { ServicePhilosophySection } from '../../components/ServicePhilosophySection';
import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  MessageSquare, 
  Cpu, 
  Check, 
  Activity, 
  Filter, 
  Terminal
} from 'lucide-react';

interface SeoServiceProps {
  setCurrentPage: (page: any) => void;
}

export default function SeoService({ setCurrentPage }: SeoServiceProps) {
  const deliverables = [
    {
      title: "Comprehensive technical SEO audits",
      desc: "Deep crawl audits analyzing indexation bottlenecks, Core Web Vitals performance, canonical tagging, and internal link architecture."
    },
    {
      title: "Answer-Engine & Generative-Engine (AEO & GEO)",
      desc: "Structured semantic entity modeling and structured facts ensuring AI engines like ChatGPT, Perplexity, and Gemini cite and recommend your business."
    },
    {
      title: "High-intent customer content",
      desc: "Authoritative editorial content and FAQs written directly around the exact commercial questions your prospective buyers ask."
    },
    {
      title: "Targeted digital campaigns",
      desc: "Campaign strategy and conversion rate optimization across Google Search, LinkedIn, and Meta focusing on qualified business pipeline."
    },
    {
      title: "High-deliverability Bulk SMS",
      desc: "Direct telco SMS pipelines for instant customer reach, promotional announcements, and transactional verification updates."
    },
    {
      title: "Plain-English conversion reporting",
      desc: "Transparent monthly reporting showing actual leads, phone calls, and revenue generated — not vanity impression graphs."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Audit",
      desc: "We analyze your current visibility footprint across Google search, AI answer engines, and competitor authority."
    },
    {
      step: "02",
      title: "Plan",
      desc: "We prioritize high-intent search terms, entity schemas, and content gaps for maximum commercial return."
    },
    {
      step: "03",
      title: "Execute",
      desc: "We deploy technical fixes, structured schema data, authoritative conversion pages, and targeted distribution campaigns."
    },
    {
      step: "04",
      title: "Report and refine",
      desc: "We monitor keyword shifts, AI citations, and lead volume, refining content strategy based on real sales outcomes."
    }
  ];

  const faqs = SEO_SERVICE_FAQS;

  return (
    <div className="mixon-interior-page mixon-service-detail bg-white text-gray-900 pt-28 pb-0 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: Search,
          name: "Search & Discovery",
          tag: "AEO & GEO Ready"
        }}
        title="Be found by humans. Be recommended by AI assistants."
        subtitle="Modern search visibility built for Google, Perplexity, and ChatGPT. We combine technical SEO, generative schema, and authoritative content that drives qualified customer enquiries."
        primaryCta={{
          text: "Plan your digital growth",
          onClick: () => setCurrentPage('contact')
        }}
        secondaryCta={{
          text: "Request SEO & AEO audit",
          onClick: () => setCurrentPage('contact')
        }}
      />

      {/* THE STORY / PHILOSOPHY */}
      <ServicePhilosophySection
        eyebrow="MODERN DISCOVERY"
        eyebrowColorClass="text-emerald-600"
        heading="From search engines to AI assistants"
        introText="We support search visibility and digital campaigns with clear messaging, useful content and a focus on meaningful conversions, so the right audience finds you and has a reason to act."
        statement="When someone asks an AI assistant for the best service in your city or industry, your business should be the clear, factual, and verified answer."
        primaryButtonText="Get an organic search proposal"
        secondaryButtonText="Request SEO & AEO audit"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('contact')}
      />

      {/* CAPABILITIES */}
      <ServiceCapabilities eyebrow={'DELIVERABLES'} heading={'Where search pressure turns into close control.'} description={'Autonomous indexation, generative AI positioning, and direct revenue attribution built for sustainable customer acquisition.'} items={[{ title: 'Autonomous Continuous Reconciliation', desc: 'Deep crawl audits analyzing indexation bottlenecks, Core Web Vitals performance, canonical tagging, and internal link architecture so engines discover and rank every page.' }, { title: 'Centralized Close Management', desc: 'Move beyond spreadsheets and fragmented reports by centralizing search tasks in a single system where AI engines like ChatGPT, Perplexity, and Gemini cite and recommend your business.' }, { title: 'Real-Time Flux & Anomaly Detection', desc: 'Continuous monitoring of commercial search queries, impression dips, and SERP shifts as they happen, helping teams catch drop-offs early instead of discovering them at the end of the month.' }, { title: 'Automated audit trails & traceability', desc: 'Every content deployment, schema modification, and telco SMS broadcast is automatically logged with transparent conversion metrics showing actual revenue, calls, and qualified pipeline.' }]} />

      {/* HOW WE WORK */}
      <HowItWorksSection eyebrow="4-STEP PROCESS" heading="How we work" description='Disciplined optimization cycle focused on commercial pipeline generation.' steps={steps} />

      {/* COMMON QUESTIONS */}
      <ServiceFaqSection faqs={faqs} />

      {/* CLOSING CTA (FULL-WIDTH IMAGE BG LIKE IMAGE 2) */}
      <ServiceClosingCta
        title={
          <>
            Ready for customers to find you <br className="hidden sm:inline" />
            without paying for every click?
          </>
        }
        subtitle="Let's evaluate your current search and answer-engine presence and build a roadmap for qualified inbound enquiries."
        primaryButtonText="Plan your digital growth"
        secondaryButtonText="View all services"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('services')}
      />
    </div>
  );
}
