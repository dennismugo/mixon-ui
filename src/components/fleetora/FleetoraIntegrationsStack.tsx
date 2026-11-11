import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface FleetoraIntegrationsStackProps {
  setCurrentPage?: (page: any) => void;
}

interface IntegrationCard {
  name: string;
  subtitle: string;
  logo: string;
}

interface PillTool {
  name: string;
  logo: string;
}

/**
 * Top 6 Featured Core Integrations tailored to Mixon's software capabilities:
 * - M-Pesa Daraja (East Africa / Kenya mobile payments)
 * - WhatsApp Business (Automated receipts, guest PINs, customer pings)
 * - HubSpot (Lead routing, customer profiles, CRM telemetry)
 * - Salesforce (Enterprise pipeline & record sync)
 * - Stripe (Global card processing & Apple Pay)
 * - Slack (Real-time operational alerts & system health logs)
 */
const FEATURED_INTEGRATIONS: IntegrationCard[] = [
  {
    name: 'M-Pesa Daraja',
    subtitle: 'STK push & instant ledger reconciliation',
    logo: '/assets/integrations/mpesa.svg',
  },
  {
    name: 'WhatsApp Business',
    subtitle: 'Automated receipts, PINs & customer alerts',
    logo: '/assets/integrations/whatsapp.svg',
  },
  {
    name: 'HubSpot',
    subtitle: 'Automated lead routing & CRM sync',
    logo: '/assets/integrations/hubspot.svg',
  },
  {
    name: 'Salesforce',
    subtitle: 'Enterprise records & deal activity logs',
    logo: '/assets/integrations/salesforce.svg',
  },
  {
    name: 'Stripe',
    subtitle: 'Global card rails & automated billing',
    logo: '/assets/integrations/stripe.svg',
  },
  {
    name: 'Slack',
    subtitle: 'Real-time transaction alerts & error traces',
    logo: '/assets/integrations/slack.svg',
  },
];

const PILL_TOOLS: PillTool[] = [
  { name: 'Gmail', logo: '/assets/integrations/gmail.svg' },
  { name: 'Outlook', logo: '/assets/integrations/outlook.svg' },
  { name: 'Microsoft Teams', logo: '/assets/integrations/microsoft_teams.svg' },
  { name: 'Notion', logo: '/assets/integrations/notion.svg' },
  { name: 'Jira', logo: '/assets/integrations/jira.svg' },
  { name: 'Confluence', logo: '/assets/integrations/confluence.svg' },
  { name: 'Google Sheets', logo: '/assets/integrations/google_sheets.svg' },
  { name: 'Linear', logo: '/assets/integrations/linear.svg' },
  { name: 'Zendesk', logo: '/assets/integrations/zendesk.svg' },
  { name: 'Intercom', logo: '/assets/integrations/intercom.svg' },
  { name: 'Calendly', logo: '/assets/integrations/calendly.svg' },
];

export const FleetoraIntegrationsStack: React.FC<FleetoraIntegrationsStackProps> = ({
  setCurrentPage,
}) => {
  return (
    <section className="py-24 sm:py-32 bg-white text-gray-900 border-b border-gray-200/80 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Header Container with Fade-Up Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4 text-center max-w-4xl mx-auto mb-14 sm:mb-16"
        >
          {/* Eyebrow Badge */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-none inline-block shrink-0" />
            <span className="font-mono text-[#0066FF] text-xs sm:text-[13px] uppercase tracking-[0.14em] font-bold">
              PLAYS WITH YOUR STACK
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-[46px] font-bold text-gray-950 tracking-[-0.03em] leading-[1.12] text-balance">
            From payment clearance to CRM sync, connected to your stack
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            Connect your payment gateways, mobile money, messaging, and CRM.{' '}
            <span className="font-medium text-gray-950">100+ native integrations</span> — from
            M-Pesa Daraja to WhatsApp, Salesforce, and Slack — working seamlessly with your custom software.
          </p>
        </motion.div>

        {/* 6 Feature Integration Cards: Staggered Fade-Up Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 max-w-5xl mx-auto">
          {FEATURED_INTEGRATIONS.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -3 }}
              className="flex h-full items-start gap-3.5 rounded-[8px] border border-black/[0.08] bg-white p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#0066FF]/40 hover:shadow-[0_12px_28px_-6px_rgba(0,102,255,0.09)] transition-all cursor-pointer group"
              onClick={() => setCurrentPage?.('contact')}
            >
              <div className="flex size-13 sm:size-14 shrink-0 items-center justify-center rounded-[6px] bg-slate-50 ring-1 ring-black/[0.04] p-2.5 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  loading="lazy"
                  width={36}
                  height={36}
                  className="size-8 sm:size-9 object-contain"
                />
              </div>
              <div className="min-w-0 pt-0.5 text-left">
                <div className="truncate font-sans font-semibold text-[15px] sm:text-base text-gray-950 leading-tight group-hover:text-[#0066FF] transition-colors">
                  {tool.name}
                </div>
                <div className="mt-1 truncate font-sans text-xs sm:text-[13px] text-gray-500 leading-snug">
                  {tool.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider Meta Bar with Fade-Up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 sm:mt-14 max-w-5xl mx-auto flex items-center justify-between text-xs font-mono uppercase tracking-wider text-gray-400 px-1 border-t border-gray-100 pt-6"
        >
          <span className="font-mono text-gray-400 text-xs tracking-wider">
            — AND 100+ OPERATIONAL INTEGRATIONS
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage?.('contact')}
            className="group inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-gray-800 hover:text-[#0066FF] transition-colors cursor-pointer"
          >
            <span>BROWSE THE LIBRARY</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Infinite Running Marquee of Pills with Hover Pause */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-6 max-w-5xl mx-auto overflow-hidden relative py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] select-none"
        >
          <div className="flex w-max items-center animate-[mixon-logo-drift_32s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {[0, 1].map((copyIdx) => (
              <div key={copyIdx} className="flex items-center gap-3 shrink-0 pr-3">
                {PILL_TOOLS.map((pill) => (
                  <div
                    key={`${pill.name}-${copyIdx}`}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200/90 bg-white shadow-2xs hover:border-[#0066FF]/50 hover:shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    <img
                      src={pill.logo}
                      alt={pill.name}
                      loading="lazy"
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="font-sans text-xs font-medium text-gray-800">
                      {pill.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FleetoraIntegrationsStack;
