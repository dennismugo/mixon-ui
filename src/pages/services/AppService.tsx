import ProductServiceHero from '../../components/ProductServiceHero';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { ServiceFaqSection } from '../../components/ServiceFaqSection';
import { APP_SERVICE_FAQS } from '../../seo/mixonSeo';
import { ServiceCapabilities } from '../../components/ServiceCapabilities';
import { ServiceClosingCta } from '../../components/ServiceClosingCta';
import { ServicePhilosophySection } from '../../components/ServicePhilosophySection';
import { 
  Smartphone, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Radio, 
  Cpu, 
  Zap, 
  Check, 
  Activity
} from 'lucide-react';

interface AppServiceProps {
  setCurrentPage: (page: any) => void;
}

export default function AppService({ setCurrentPage }: AppServiceProps) {
  const deliverables = [
    {
      title: "Android and iOS applications",
      desc: "Tactile, responsive mobile applications engineered with native speed and fluid touch gestures for Google Play and Apple App Store."
    },
    {
      title: "USSD telecom solutions",
      desc: "Menu-driven USSD services that work on any basic feature phone without requiring internet data or smartphone ownership, including shortcode registration assistance."
    },
    {
      title: "Clear user journeys & interfaces",
      desc: "Thoughtfully structured UX flows mapped around the daily tasks people actually need to complete, cutting training overhead to zero."
    },
    {
      title: "Secure back-end & telemetry",
      desc: "Encrypted server infrastructure, real-time database synchronization, automated crash logging, and continuous performance analytics."
    },
    {
      title: "Offline-first resilience",
      desc: "Local SQLite caching architecture allowing field staff or customers to complete transactions even during patchy network connectivity."
    },
    {
      title: "AI-assisted features where useful",
      desc: "Intelligent optical character recognition (OCR), voice notes, or predictive text entry where there is a genuine, explainable business benefit."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Define",
      desc: "We pinpoint the core problem, user personas, operational constraints, and measurable success criteria."
    },
    {
      step: "02",
      title: "Prototype",
      desc: "We build an interactive clickable Figma prototype so you see, test, and validate the flow before a single line of code is written."
    },
    {
      step: "03",
      title: "Build and test",
      desc: "We engineer the application with real-world scenarios, testing rigorously across different devices, battery profiles, and network speeds."
    },
    {
      step: "04",
      title: "Launch and support",
      desc: "We guide App Store & Play Store approval or telco shortcode rollout, followed by ongoing updates and operational monitoring."
    }
  ];

  const faqs = APP_SERVICE_FAQS;

  return (
    <div className="mixon-interior-page mixon-service-detail bg-white text-gray-900 pt-28 pb-0 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: Smartphone,
          name: "Mobile Applications",
          tag: "iOS & Android"
        }}
        title="Turn a manual process into an app people use every day."
        subtitle="Native and cross-platform mobile apps with offline-first synchronization, intuitive touch journeys, and secure cloud backends built for real field conditions."
        primaryCta={{
          text: "Discuss your app idea",
          onClick: () => setCurrentPage('contact')
        }}
        secondaryCta={{
          text: "Explore mobile packages",
          onClick: () => setCurrentPage('pricing')
        }}
      />

      {/* THE STORY / PHILOSOPHY */}
      <ServicePhilosophySection
        eyebrow="MOBILE & TELCO REACH"
        eyebrowColorClass="text-indigo-600"
        heading="Smartphones and feature phones alike"
        introText="Where it makes sense, we also build for the reach of USSD, so customers can use your service on any phone, without needing data."
        statement="By combining high-performance native iOS and Android apps with robust USSD menus, we ensure your software reaches 100% of your addressable market across all connectivity environments."
        primaryButtonText="Request an app proposal"
        secondaryButtonText="Explore mobile packages"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('pricing')}
      />

      {/* CAPABILITIES */}
      <ServiceCapabilities eyebrow={'CAPABILITIES'} heading={'What you get'} description={'End-to-end mobile engineering with transparent telemetry and security.'} items={deliverables} />

      {/* HOW WE WORK */}
      <HowItWorksSection eyebrow="4-STEP PROCESS" heading="How we work" description='Structured sprint progression from prototype to store publishing.' steps={steps} />

      {/* COMMON QUESTIONS */}
      <ServiceFaqSection faqs={faqs} />

      {/* CLOSING CTA (FULL-WIDTH IMAGE BG LIKE IMAGE 2) */}
      <ServiceClosingCta
        title={
          <>
            Have a process that deserves <br className="hidden sm:inline" />
            a dedicated application?
          </>
        }
        subtitle="Tell us about your operational workflow. We will help map the requirements, scope feasibility, and provide a clear timeline."
        primaryButtonText="Discuss your app idea"
        secondaryButtonText="View all services"
        onPrimaryClick={() => setCurrentPage('contact')}
        onSecondaryClick={() => setCurrentPage('services')}
      />
    </div>
  );
}
