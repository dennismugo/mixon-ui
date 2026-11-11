import ProductServiceHero from '../../components/ProductServiceHero';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { ServiceFaqSection } from '../../components/ServiceFaqSection';
import { PAYMENTS_SERVICE_FAQS } from '../../seo/mixonSeo';
import { ServiceCapabilities } from '../../components/ServiceCapabilities';
import { ServiceClosingCta } from '../../components/ServiceClosingCta';
import { ServicePhilosophySection } from '../../components/ServicePhilosophySection';
import { 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  Cpu, 
  Lock, 
  Check, 
  Activity, 
  AlertTriangle
} from 'lucide-react';

interface PaymentsServiceProps {
  setCurrentPage: (page: any) => void;
}

export default function PaymentsService({ setCurrentPage }: PaymentsServiceProps) {
  const deliverables = [
    {
      title: "Mobile money & regional gateways",
      desc: "Direct integration with Safaricom M-Pesa Daraja API (STK Push, C2B, B2C), Airtel Money, and regional payment aggregators."
    },
    {
      title: "Multi-currency credit & debit cards",
      desc: "Frictionless global checkout supporting Visa, Mastercard, American Express, PayPal, and Stripe with instant confirmation flows."
    },
    {
      title: "Custom API & system middleware",
      desc: "Secure REST, GraphQL, and webhook pipelines linking your web forms, accounting software (QuickBooks, Xero), and ERP tools."
    },
    {
      title: "Telco Bulk SMS gateways",
      desc: "Automated SMS receipt dispatches, transaction confirmation alerts, and two-factor authentication (2FA) verification codes."
    },
    {
      title: "Failed payment handling & retries",
      desc: "Idempotent transaction queues that catch edge-case dropouts, network timeouts, and automate customer retry prompts."
    },
    {
      title: "Automated ledger reconciliation",
      desc: "Automatic matching between incoming mobile money receipts, card batches, and customer invoice records without spreadsheets."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "System map",
      desc: "We document the systems, payment providers, data fields, and state transitions that need to move seamlessly."
    },
    {
      step: "02",
      title: "Architecture & security",
      desc: "We choose the safest, simplest integration pattern, designing webhook verification, encryption, and retry safety nets."
    },
    {
      step: "03",
      title: "Sandbox testing",
      desc: "We simulate real-world transaction scenarios: successful payments, customer cancellations, insufficient funds, and network dropouts."
    },
    {
      step: "04",
      title: "Deploy & monitor",
      desc: "We roll out to production with automated error alerts, transaction logs, and ongoing operational support."
    }
  ];

  const faqs = PAYMENTS_SERVICE_FAQS;

  return (
    <div className="mixon-interior-page mixon-service-detail bg-white text-gray-900 pt-28 pb-0 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: CreditCard,
          name: "Payments & Integrations",
          tag: "Zero Leakage"
        }}
        title="Close the gaps between your payments and your systems."
        subtitle="Direct integrations with M-Pesa Daraja STK Push, card rails, automated reconciliation queues, and robust webhooks that make cash leakage a thing of the past."
        primaryCta={{
          text: "Discuss payment rails",
          onClick: () => setCurrentPage('contact')
        }}
        secondaryCta={{
          text: "Request API feasibility check",
          onClick: () => setCurrentPage('contact')
        }}
      />

      {/* THE STORY / PHILOSOPHY */}
      <ServicePhilosophySection
        eyebrow="THE INTEGRATION IMPERATIVE"
        eyebrowColorClass="text-sky-600"
        heading="Planning for the awkward moments"
        introText="We assess the right integration approach and plan for transaction status, exceptions and reconciliation, so payments and systems work together, including the awkward moments when something fails."
        statement="A reliable integration handles the happy path effortlessly — but it earns its keep when network connections stutter, webhooks delay, or transactions need instant automated reconciliation."
        primaryButtonText="Scope a payment integration"
        secondaryButtonText="Request API feasibility check"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('contact')}
      />

      {/* CAPABILITIES */}
      <ServiceCapabilities eyebrow={'CAPABILITIES'} heading={'What you get'} description={'Proven payment architecture, encrypted API gateways, and automated reconciliation queues.'} items={deliverables} />

      {/* HOW WE WORK */}
      <HowItWorksSection eyebrow="4-STEP PROCESS" heading="How we work" description='Methodical integration engineering with thorough failure-scenario testing.' steps={steps} />

      {/* VERIFY DISCLAIMER STRIP */}
      <section className="py-10 bg-amber-500/5 border-y border-amber-500/20 px-6 sm:px-10 lg:px-14">
        <div className="w-full max-w-7xl mx-auto text-left flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-amber-700">
              A NOTE ON INTEGRATIONS &amp; THIRD-PARTY APIS
            </span>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Integrations depend on the target systems, available APIs, and provider permissions. We assess your exact technical requirements and credentials before confirming any specific connection.
            </p>
          </div>
        </div>
      </section>

      {/* COMMON QUESTIONS */}
      <ServiceFaqSection faqs={faqs} />

      {/* CLOSING CTA (FULL-WIDTH IMAGE BG LIKE IMAGE 2) */}
      <ServiceClosingCta
        title={
          <>
            Stop retyping data between tools <br className="hidden sm:inline" />
            that should talk to each other.
          </>
        }
        subtitle="Tell us which payment gateways, internal tools, or databases you need connected. A systems engineer replies within one business day."
        primaryButtonText="Discuss an integration"
        secondaryButtonText="View all services"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('services')}
      />
    </div>
  );
}
