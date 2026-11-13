import React from 'react';
import {
  ArrowRight,
  Code2,
  Smartphone,
  Search,
  CreditCard,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import RollingButtonText from '../RollingButtonText';

interface FleetoraServicesStackProps {
  setCurrentPage?: (page: string) => void;
}

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  pageId: string;
  icon: React.ElementType;
}

const servicesData: ServiceCardData[] = [
  {
    id: 'web-dev',
    title: 'Web Design & Development',
    description:
      'High-conversion web platforms, bespoke React & Next.js applications, and interactive digital interfaces built for speed, accessibility, and measurable commercial action.',
    pageId: 'service-web',
    icon: Code2,
  },
  {
    id: 'app-dev',
    title: 'App Development & USSD',
    description:
      'Tactile native iOS & Android mobile applications with offline-first SQLite synchronization, paired with telco USSD rails so customers can interact anywhere without data barriers.',
    pageId: 'service-app',
    icon: Smartphone,
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Digital Marketing',
    description:
      'Semantic entity schemas, Core Web Vitals performance tuning, and programmatic indexing engineered to command Google rankings and dominate emerging AI answer engines.',
    pageId: 'service-seo',
    icon: Search,
  },
  {
    id: 'payments',
    title: 'Payments & Integrations',
    description:
      'Automated M-Pesa Daraja STK push pipelines, multi-currency card checkouts, and real-time cryptographic reconciliation that eliminates manual accounting discrepancies.',
    pageId: 'service-payments',
    icon: CreditCard,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Development',
    description:
      'Ultra-fast headless digital stores, real-time multi-channel inventory sync, dynamic localized carts, and frictionless checkout flows optimized for peak transaction volume.',
    pageId: 'service-ecommerce',
    icon: ShoppingBag,
  },
  {
    id: 'ai-automation',
    title: 'AI & Process Automation',
    description:
      'Practical intelligent workflow automation, automated document and receipt OCR parsing, and smart operational assistants that eliminate repetitive manual bottlenecks.',
    pageId: 'service-ai',
    icon: Sparkles,
  },
];

export const FleetoraServicesStack: React.FC<FleetoraServicesStackProps> = ({ setCurrentPage }) => {
  return (
    <section
      id="services-stack"
      data-scroll-no-reveal=""
      className="py-20 sm:py-28 lg:py-32 bg-[#0246c6] text-white relative select-none w-full px-6 sm:px-10 lg:px-14"
      style={{
        background: 'linear-gradient(140deg, #0350dd 0%, #0246c6 42%, #033798 78%, #032d7a 100%)',
      }}
    >
      {/* Subtle architectural ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          background:
            'radial-gradient(circle at 14% 28%, rgba(56, 189, 248, 0.22) 0%, transparent 46%)',
        }}
      />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* LEFT COLUMN: Sticky editorial eyebrow, oversized PT Serif headline & concise description */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start text-left">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] font-semibold text-sky-200 block mb-5">
              BUILT FOR EVERY WORKFLOW
            </span>

            <h2
              data-scroll-no-reveal=""
              className="services-editorial-heading font-ptserif font-normal text-white"
            >
              Mixon Services are Designed Differently
            </h2>

            <p
              data-scroll-no-reveal=""
              className="mt-6 font-sans text-[15px] sm:text-base text-blue-100/90 font-normal leading-[1.6] max-w-[38ch]"
            >
              We don’t just write code and disappear. We architect, connect, and proactively maintain resilient digital infrastructure built around your exact commercial operations.
            </p>
          </div>

          {/* RIGHT COLUMN: 2-Column Crisp White Rectangular Cards Grid */}
          <div data-scroll-no-reveal="" className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {servicesData.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  type="button"
                  id={`service-card-${service.id}`}
                  onClick={() => setCurrentPage?.(service.pageId)}
                  className="group bg-white border border-white/25 rounded-none p-6 sm:p-7 min-h-[252px] flex flex-col justify-between text-left transition-all duration-200 shadow-[0_18px_38px_-14px_rgba(2,18,58,0.38)] hover:border-sky-200 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-14px_rgba(2,18,58,0.52)] cursor-pointer select-text"
                >
                  <div>
                    {/* Square sky-blue icon badge matching Design 1 */}
                    <div className="w-7 h-7 rounded-[2px] bg-[#93C5FD]/85 text-[#04122B] flex items-center justify-center mb-6 transition-colors duration-200 group-hover:bg-[#0066FF] group-hover:text-white">
                      <Icon className="w-3.5 h-3.5 stroke-[2]" />
                    </div>

                    <h3
                      data-scroll-no-reveal=""
                      className="service-card-title font-ptserif text-[20px] sm:text-[22px] text-[#04122B] tracking-[-0.02em] leading-[1.2] mb-2.5"
                    >
                      {service.title}
                    </h3>

                    <p className="font-sans text-[13.5px] sm:text-[14px] text-[#475569] font-normal leading-[1.55]">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-7 pt-1 flex items-center text-[13px] font-sans font-semibold text-[#04122B]">
                    <RollingButtonText
                      text="Learn more"
                      icon={
                        <ArrowRight className="w-3.5 h-3.5 text-[#04122B] stroke-[2]" />
                      }
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
