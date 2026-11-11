import ProductServiceHero from '../../components/ProductServiceHero';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { ServiceFaqSection } from '../../components/ServiceFaqSection';
import { AI_SERVICE_FAQS } from '../../seo/mixonSeo';
import { ServiceCapabilities } from '../../components/ServiceCapabilities';
import { ServiceClosingCta } from '../../components/ServiceClosingCta';
import { ServicePhilosophySection } from '../../components/ServicePhilosophySection';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Check, 
  Activity, 
  BotOff, 
  Lock, 
  Workflow
} from 'lucide-react';

interface AiServiceProps {
  setCurrentPage: (page: any) => void;
}

export default function AiService({ setCurrentPage }: AiServiceProps) {
  const deliverables = [
    {
      title: "Opportunity discovery workshop",
      desc: "Structured audit with your department leads to pinpoint where hours get lost in copy-pasting, routine calculations, or manual data entry."
    },
    {
      title: "Risk, data & feasibility scoping",
      desc: "Clear upfront evaluation of failure modes, private customer data exposure, Hallucination risks, and measurable success metrics."
    },
    {
      title: "Deterministic workflow automation",
      desc: "Reliable background automation connecting emails, WhatsApp inquiries, Google Sheets, and databases that executes without human friction."
    },
    {
      title: "Intelligent domain assistants",
      desc: "Custom-trained AI agents that read documents, extract invoice metadata, and prepare drafted responses for staff to review."
    },
    {
      title: "Human-in-the-loop safeguards",
      desc: "Architectural guardrails ensuring financial disbursements, contract sign-offs, and customer escalations always require human authorization."
    },
    {
      title: "Ongoing telemetry & cost control",
      desc: "Real-time token cost monitoring, latency telemetry, and monthly metrics reporting on actual business hours saved."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Identify",
      desc: "We pinpoint where time and information get stuck in your daily operations."
    },
    {
      step: "02",
      title: "Evaluate",
      desc: "We assess tangible benefits, data security risks, and feasibility, choosing whether rule-based automation or AI is best."
    },
    {
      step: "03",
      title: "Pilot a focused use case",
      desc: "We build and deploy a tightly scoped pilot with human-in-the-loop oversight to verify accuracy and time savings."
    },
    {
      step: "04",
      title: "Scale what works",
      desc: "Only once reliability is proven do we integrate the automation into your team's core daily tools and scale across departments."
    }
  ];

  const faqs = AI_SERVICE_FAQS;

  return (
    <div className="mixon-interior-page mixon-service-detail bg-white text-gray-900 pt-28 pb-0 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: Sparkles,
          name: "AI & Automation",
          tag: "Human-in-the-Loop"
        }}
        title="Find the work genuinely worth automating."
        subtitle="Not every task needs AI. We identify repetitive tasks and data bottlenecks, deploying deterministic workflows and domain-trained assistants with strict human oversight."
        primaryCta={{
          text: "Explore an AI use case",
          onClick: () => setCurrentPage('contact')
        }}
        secondaryCta={{
          text: "Book an Opportunity Workshop",
          onClick: () => setCurrentPage('contact')
        }}
      />


      {/* THE STORY / PHILOSOPHY */}
      <ServicePhilosophySection
        eyebrow="HONESTY OVER HYPE"
        eyebrowColorClass="text-amber-700"
        heading="Open about what is automated, assisted, and human"
        introText="We help define a practical use case, understand the risks and scope an AI or automation solution where the capability is available, being open about what is automated, what is assisted and what still needs a human."
        statement="We never promise that AI is magic. We build grounded assistants and deterministic pipelines that eliminate hours of routine administrative drudgery while keeping you in full control."
        primaryButtonText="Scope an AI workflow"
        secondaryButtonText="Book an Opportunity Workshop"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('contact')}
      />

      {/* CAPABILITIES */}
      <ServiceCapabilities eyebrow={'CAPABILITIES'} heading={'What you get'} description={'Pragmatic artificial intelligence and deterministic automation shaped around your operations.'} items={deliverables} />

      {/* HOW WE WORK */}
      <HowItWorksSection eyebrow="4-STEP PROCESS" heading="How we work" description='From identifying bottlenecks to focused pilots and production scaling.' steps={steps} />

      {/* COMMON QUESTIONS */}
      <ServiceFaqSection faqs={faqs} />

      {/* CLOSING CTA (FULL-WIDTH IMAGE BG LIKE IMAGE 2) */}
      <ServiceClosingCta
        title={
          <>
            Ready to find the tasks <br className="hidden sm:inline" />
            worth automating in your business?
          </>
        }
        subtitle="Tell us where your team spends too many hours doing repetitive manual work. We will scope a practical pilot."
        primaryButtonText="Explore an AI use case"
        secondaryButtonText="View all services"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('services')}
      />
    </div>
  );
}
