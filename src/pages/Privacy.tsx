import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  FileText,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import RollingButtonText from '../components/RollingButtonText';

interface PrivacyProps {
  setCurrentPage: (page: string) => void;
}

export default function Privacy({ setCurrentPage }: PrivacyProps) {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections = [
    { id: 'intro', title: '1. Introduction & Company Overview' },
    { id: 'compliance', title: '2. Statutory Compliance (Kenya DPA 2019 & GDPR)' },
    { id: 'scope', title: '3. Scope of Software Services Covered' },
    { id: 'collection', title: '4. Information We Collect & Process' },
    { id: 'payments', title: '5. M-Pesa, Mobile Money & Financial Data Policy' },
    { id: 'purpose', title: '6. How We Use Information & Legal Bases' },
    { id: 'security', title: '7. Data Security, Encryption & Storage' },
    { id: 'subprocessors', title: '8. Third-Party Sub-Processors & APIs' },
    { id: 'retention', title: '9. Data Retention & Certified Destruction' },
    { id: 'rights', title: '10. Your Rights as a Data Subject' },
    { id: 'contact', title: '11. Data Protection Officer (DPO) & Inquiries' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="mixon-interior-page mixon-privacy-page bg-white text-[#04122b] pt-24 sm:pt-28 selection:bg-[#0066FF] selection:text-white">
      {/* =========================================================================
          HERO BANNER: PRIVACY & DATA PROTECTION NOTICE
         ========================================================================= */}
      <section className="w-full px-6 sm:px-10 lg:px-14 pt-10 sm:pt-14 pb-12 sm:pb-16 bg-[#f2f6fd] border-b border-slate-200/80">
        <div className="w-full max-w-7xl mx-auto text-left">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#c5daf8] rounded-none text-[#0066FF] font-mono text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>OFFICIAL DATA PROTECTION &amp; PRIVACY NOTICE</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-[54px] font-normal text-[#04122b] tracking-[-0.035em] leading-[1.08]"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              Privacy Policy &amp; Security Standards
            </h1>

            <p className="font-sans text-[15px] sm:text-base text-slate-600 font-normal leading-[1.65]">
              How Mixon Softwares Limited collects, processes, and protects personal and institutional data across our bespoke software platforms, mobile applications, USSD gateways, and Safaricom M-Pesa Daraja integration pipelines.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
              <span>Entity: Mixon Softwares Limited (Nairobi, Kenya)</span>
              <span>•</span>
              <span>Effective Date: November 2026</span>
              <span>•</span>
              <span className="text-[#0066FF] font-semibold">KDPA 2019 Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN PRIVACY DOCUMENT: TWO-COLUMN EDITORIAL LAYOUT
         ========================================================================= */}
      <section className="w-full px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* LEFT COLUMN: Sticky Table of Contents Navigation */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-6">
              <div className="p-5 sm:p-6 bg-[#f8fbff] border border-slate-200/90 rounded-none text-left">
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  DOCUMENT SECTIONS
                </h3>
                <nav className="space-y-1.5 text-xs font-sans">
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left py-1.5 px-2 rounded-none transition-colors block cursor-pointer leading-snug ${
                        activeSection === sec.id
                          ? 'bg-[#0066FF] text-white font-semibold'
                          : 'text-slate-600 hover:text-[#0066FF] hover:bg-white'
                      }`}
                    >
                      {sec.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Direct DPO Contact Box */}
              <div className="p-5 bg-white border border-slate-200 rounded-none text-left space-y-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0066FF] block">
                  DATA PROTECTION OFFICER
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Questions regarding personal data rights or compliance verification?
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-800">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <a href="mailto:privacy@mixonsoftwares.co.ke" className="hover:text-[#0066FF] transition-colors">
                      privacy@mixonsoftwares.co.ke
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>+254 713 958 492</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Full Comprehensive Policy Body */}
            <div className="lg:col-span-8 text-left space-y-12 max-w-3xl font-sans text-sm sm:text-[15px] text-slate-700 leading-[1.75]">
              
              {/* SECTION 1 */}
              <article id="intro" className="space-y-4 pt-2">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  1. Introduction &amp; Company Overview
                </h2>
                <p>
                  Mixon Softwares Limited (&ldquo;Mixon&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is an independent technology and software engineering company incorporated under the Laws of Kenya, with principal offices located at Mihrab Building, 15th Floor, Ring Road Kilimani, Nairobi.
                </p>
                <p>
                  We architect, engineer, deploy, and maintain bespoke enterprise software platforms, client portals, mobile applications, telco USSD services, automated payment pipelines, and workflow automations for East African businesses and international partners.
                </p>
                <p>
                  This Privacy Policy outlines how we treat information when you interact with our website (<a href="https://mixonsoftwares.co.ke" className="text-[#0066FF] underline font-medium">mixonsoftwares.co.ke</a>), engage us for software engineering contracts, utilize our proprietary business applications (including miRentals, miReserve, Event Yetu, and miPOS), or interact with systems engineered by Mixon on behalf of commercial clients.
                </p>
              </article>

              {/* SECTION 2 */}
              <article id="compliance" className="space-y-4">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  2. Statutory Compliance (Kenya DPA 2019 &amp; Global Standards)
                </h2>
                <p>
                  Mixon adheres strictly to the <strong>Data Protection Act, No. 24 of 2019 of the Republic of Kenya (KDPA)</strong> and guidelines established by the <strong>Office of the Data Protection Commissioner (ODPC)</strong>. Where we process personal data of individuals residing outside Kenya, we apply equivalent international standards, including the European Union General Data Protection Regulation (GDPR) and ISO/IEC 27001 information security principles.
                </p>
                <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-none text-xs sm:text-sm text-blue-950 space-y-1.5">
                  <span className="font-mono font-bold uppercase tracking-wider block text-[#0066FF]">
                    OUR DUAL OPERATING CAPACITIES
                  </span>
                  <p>
                    <strong>Data Controller:</strong> When you communicate directly with Mixon, request proposals, or contract our firm, Mixon acts as the Data Controller responsible for your contact and commercial records.
                  </p>
                  <p>
                    <strong>Data Processor:</strong> When Mixon develops, hosts, or operates software platforms on behalf of our enterprise clients (e.g. processing tenant records, hotel guests, event ticketing check-ins, or POS orders), Mixon acts strictly as a Data Processor pursuant to Data Processing Agreements (DPAs) executed with the respective client Controller.
                  </p>
                </div>
              </article>

              {/* SECTION 3 */}
              <article id="scope" className="space-y-4">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  3. Scope of Software Services Covered
                </h2>
                <p>This privacy standard applies to all software solutions engineered by Mixon, including:</p>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-1" />
                    <span><strong>Web &amp; Application Development:</strong> High-performance web applications, client administration portals, and custom APIs built on React, Next.js, Node.js, and Python.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-1" />
                    <span><strong>Mobile &amp; USSD Engineering:</strong> Native iOS and Android applications with offline-first SQLite synchronization, paired with telco USSD services (Safaricom, Airtel, Telkom).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-1" />
                    <span><strong>Financial &amp; Payment Rails:</strong> Automated Safaricom Daraja M-Pesa STK push callbacks, C2B/B2C automated payouts, card checkout gateways, and automated ledger reconciliation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-1" />
                    <span><strong>Proprietary Platforms:</strong> miRentals (property management), miReserve (hospitality &amp; booking), Event Yetu (ticketing &amp; RFID gate access), and miPOS (multi-branch retail &amp; inventory).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-1" />
                    <span><strong>Intelligent Automations:</strong> Document OCR extraction, automated receipt parsing, and operational bots for WhatsApp and Slack.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 4 */}
              <article id="collection" className="space-y-4">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  4. Information We Collect &amp; Process
                </h2>
                <p>We collect and process only the minimal necessary data required to deliver high-integrity software engineering services:</p>
                <div className="space-y-3">
                  <h4 className="font-bold text-[#04122b]">A. Information You Provide to Us</h4>
                  <p>When you fill out enquiry forms, book engineering consultations, or request technical proposals:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Full Name and Professional Title</li>
                    <li>Work Email Address and Corporate Phone Number</li>
                    <li>Company or Organization Name</li>
                    <li>Project technical scope, system specifications, and budget parameters</li>
                  </ul>

                  <h4 className="font-bold text-[#04122b] pt-2">B. Operational Data Processed for Client Deployments</h4>
                  <p>In our capacity as a systems developer and cloud infrastructure provider, our applications securely process data on behalf of commercial clients:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Customer billing profiles and service subscription records</li>
                    <li>Tenant lease information, rental payment histories, and utility meter readings (miRentals)</li>
                    <li>Guest reservation records, check-in schedules, and room allocations (miReserve)</li>
                    <li>Ticket purchaser contact numbers and QR code gate validation status (Event Yetu)</li>
                    <li>Point-of-sale transaction logs, SKU barcodes, and cashier shift audits (miPOS)</li>
                  </ul>

                  <h4 className="font-bold text-[#04122b] pt-2">C. Technical Telemetry &amp; Device Metadata</h4>
                  <p>To guarantee system uptime, identify security anomalies, and prevent malicious intrusion, our cloud servers automatically log:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>IP addresses and regional network geolocation</li>
                    <li>HTTP request headers, browser user-agent strings, and operating system identifiers</li>
                    <li>Application error stack traces and endpoint latency telemetry</li>
                    <li>Session cookies strictly necessary for authentication and CSRF token protection</li>
                  </ul>
                </div>
              </article>

              {/* SECTION 5 */}
              <article id="payments" className="space-y-4">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  5. M-Pesa, Mobile Money &amp; Financial Data Policy
                </h2>
                <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-none space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>CRITICAL PAYMENT INTEGRATION SAFEGUARDS</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                    <strong>Mixon NEVER requests, stores, or handles customer M-Pesa PINs, mobile banking passwords, or raw credit/debit card CVVs.</strong>
                  </p>
                </div>
                <p>When engineering Safaricom Daraja STK Push or C2B/B2C payment pipelines:</p>
                <ul className="space-y-2 list-disc pl-5 text-slate-600">
                  <li>Payment execution occurs entirely within Safaricom&apos;s encrypted SIM Application Toolkit (STK) or banking secure elements.</li>
                  <li>Mixon servers receive only the cryptographically signed Daraja callback payloads (MerchantRequestID, CheckoutRequestID, ResultCode, TransactionID, Amount, and Phone Number).</li>
                  <li>All payment callback webhooks are validated using cryptographic signature checks and timestamp replay-protection mechanisms before database reconciliation.</li>
                  <li>Debit and credit card payments are routed via PCI-DSS Level 1 certified gateways (e.g. Pesapal, Stripe). Mixon does not retain raw card numbers on local infrastructure.</li>
                </ul>
              </article>

              {/* SECTION 6 */}
              <article id="purpose" className="space-y-4">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  6. How We Use Information &amp; Legal Bases
                </h2>
                <p>We process information exclusively under recognized lawful bases under Section 30 of the Kenya Data Protection Act:</p>
                <div className="space-y-2">
                  <div className="p-3.5 border border-slate-200 bg-slate-50 rounded-none">
                    <strong className="text-[#04122b] block mb-0.5">Contractual Necessity:</strong>
                    <span className="text-xs sm:text-sm text-slate-600">To draft proposals, develop custom codebases, provision servers, configure payment webhooks, and fulfill client software SLAs.</span>
                  </div>
                  <div className="p-3.5 border border-slate-200 bg-slate-50 rounded-none">
                    <strong className="text-[#04122b] block mb-0.5">Legitimate Commercial Interests:</strong>
                    <span className="text-xs sm:text-sm text-slate-600">To monitor server reliability, prevent Distributed Denial of Service (DDoS) attacks, debug runtime exceptions, and safeguard infrastructure.</span>
                  </div>
                  <div className="p-3.5 border border-slate-200 bg-slate-50 rounded-none">
                    <strong className="text-[#04122b] block mb-0.5">Statutory &amp; Legal Compliance:</strong>
                    <span className="text-xs sm:text-sm text-slate-600">To maintain fiscal records, tax audits (Kenya Revenue Authority eTIMS obligations), and comply with court orders or regulatory mandates.</span>
                  </div>
                </div>
              </article>

              {/* SECTION 7 */}
              <article id="security" className="space-y-4">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  7. Data Security, Encryption &amp; Storage
                </h2>
                <p>We implement enterprise-grade technical and organizational safeguards designed to protect your systems against unauthorized access, destruction, or alteration:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 border border-slate-200 bg-white rounded-none space-y-1.5">
                    <div className="flex items-center gap-2 text-[#0066FF] font-bold text-xs font-mono uppercase">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Encryption in Transit</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      All web traffic, API webhooks, and database sync pipelines enforce TLS 1.3 encryption with strict HTTP Strict Transport Security (HSTS).
                    </p>
                  </div>
                  <div className="p-4 border border-slate-200 bg-white rounded-none space-y-1.5">
                    <div className="flex items-center gap-2 text-[#0066FF] font-bold text-xs font-mono uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Encryption at Rest</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Production databases, customer tables, and cloud snapshots are encrypted with AES-256 standard encryption keys stored in isolated secret vaults.
                    </p>
                  </div>
                  <div className="p-4 border border-slate-200 bg-white rounded-none space-y-1.5">
                    <div className="flex items-center gap-2 text-[#0066FF] font-bold text-xs font-mono uppercase">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Zero Plaintext Credentials</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      API consumer keys, Daraja Passkeys, and database credentials are never committed to version control and are managed strictly through scoped secret managers.
                    </p>
                  </div>
                  <div className="p-4 border border-slate-200 bg-white rounded-none space-y-1.5">
                    <div className="flex items-center gap-2 text-[#0066FF] font-bold text-xs font-mono uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Daily Multi-Region Backups</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Automated encrypted database snapshots are replicated across distinct geographic data centers to prevent data loss from regional outages.
                    </p>
                  </div>
                </div>
              </article>

              {/* SECTION 8 */}
              <article id="subprocessors" className="space-y-4">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  8. Third-Party Sub-Processors &amp; APIs
                </h2>
                <p>
                  Mixon engages vetted third-party sub-processors only where essential for infrastructure, payment clearing, or messaging connectivity:
                </p>
                <div className="overflow-x-auto border border-slate-200 rounded-none text-xs">
                  <table className="w-full text-left divide-y divide-slate-200">
                    <thead className="bg-slate-100 font-mono uppercase tracking-wider text-slate-700">
                      <tr>
                        <th className="p-3">Sub-Processor</th>
                        <th className="p-3">Function</th>
                        <th className="p-3">Location / Jurisdiction</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
                      <tr>
                        <td className="p-3 font-semibold text-[#04122b]">Safaricom PLC</td>
                        <td className="p-3">M-Pesa Daraja Payment Rails &amp; USSD Gateway</td>
                        <td className="p-3">Nairobi, Kenya</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#04122b]">Amazon Web Services (AWS)</td>
                        <td className="p-3">Cloud Hosting, RDS Databases &amp; Secure Storage</td>
                        <td className="p-3">Cape Town, South Africa / Ireland (EU)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#04122b]">Pesapal / Stripe</td>
                        <td className="p-3">Card Payment Processing (PCI-DSS Compliant)</td>
                        <td className="p-3">Kenya / United States / EU</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#04122b]">Twilio / Meta WhatsApp API</td>
                        <td className="p-3">Transactional SMS &amp; Automated Customer Messaging</td>
                        <td className="p-3">Global / Ireland (EU)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>

              {/* SECTION 9 */}
              <article id="retention" className="space-y-4">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  9. Data Retention &amp; Certified Destruction
                </h2>
                <p>
                  We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or to comply with statutory accounting and regulatory mandates:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li><strong>Enquiry &amp; Proposal Records:</strong> Retained for 24 months to facilitate project follow-ups, unless deletion is requested earlier.</li>
                  <li><strong>Client Operational Databases:</strong> Retained strictly during the active service contract. Upon formal termination, all client databases are exported to the client and securely destroyed within 60 days.</li>
                  <li><strong>Server &amp; API Access Logs:</strong> Rotated and permanently purged after 90 days.</li>
                  <li><strong>Tax &amp; Billing Records:</strong> Retained for 7 years in compliance with Kenya Revenue Authority (KRA) corporate requirements.</li>
                </ul>
              </article>

              {/* SECTION 10 */}
              <article id="rights" className="space-y-4">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  10. Your Rights as a Data Subject
                </h2>
                <p>Under Section 26 of the Kenya Data Protection Act, 2019, you hold fundamental rights regarding your personal information:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 border border-slate-200 bg-slate-50 rounded-none">
                    <strong className="text-[#04122b] block">Right to Access:</strong>
                    <span>Request a copy of the personal data Mixon holds about you.</span>
                  </div>
                  <div className="p-3 border border-slate-200 bg-slate-50 rounded-none">
                    <strong className="text-[#04122b] block">Right to Rectification:</strong>
                    <span>Request correction of inaccurate or incomplete personal records.</span>
                  </div>
                  <div className="p-3 border border-slate-200 bg-slate-50 rounded-none">
                    <strong className="text-[#04122b] block">Right to Erasure (Deletion):</strong>
                    <span>Request permanent deletion of your data where no overriding legal duty exists.</span>
                  </div>
                  <div className="p-3 border border-slate-200 bg-slate-50 rounded-none">
                    <strong className="text-[#04122b] block">Right to Data Portability:</strong>
                    <span>Receive your data in a structured, machine-readable format (JSON/CSV).</span>
                  </div>
                  <div className="p-3 border border-slate-200 bg-slate-50 rounded-none">
                    <strong className="text-[#04122b] block">Right to Object:</strong>
                    <span>Object to processing based on legitimate interests or direct communications.</span>
                  </div>
                  <div className="p-3 border border-slate-200 bg-slate-50 rounded-none">
                    <strong className="text-[#04122b] block">Lodge a Complaint:</strong>
                    <span>Lodge a complaint with the Office of the Data Protection Commissioner of Kenya (ODPC).</span>
                  </div>
                </div>
              </article>

              {/* SECTION 11 */}
              <article id="contact" className="space-y-4">
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#04122b] tracking-tight pb-2 border-b border-slate-200"
                  style={{ fontFamily: "'PT Serif', serif" }}
                >
                  11. Data Protection Officer (DPO) &amp; Inquiries
                </h2>
                <p>
                  To exercise any statutory right, request a compliance audit, or report a suspected security concern, contact our designated Data Protection Officer:
                </p>
                <div className="p-5 sm:p-6 bg-[#f2f6fd] border border-[#c5daf8] rounded-none space-y-2 text-xs sm:text-sm">
                  <h4 className="font-bold text-[#04122b] text-base">Mixon Softwares Limited — Privacy Desk</h4>
                  <p><strong>Physical Address:</strong> Mihrab Building, 15th Floor, Ring Road Kilimani, Nairobi, Kenya</p>
                  <p><strong>Direct DPO Email:</strong> <a href="mailto:privacy@mixonsoftwares.co.ke" className="text-[#0066FF] font-medium underline">privacy@mixonsoftwares.co.ke</a></p>
                  <p><strong>General Inquiries:</strong> <a href="mailto:info@mixonsoftwares.co.ke" className="text-[#0066FF] font-medium underline">info@mixonsoftwares.co.ke</a></p>
                  <p><strong>Telephone Desk:</strong> +254 713 958 492 / +254 741 733 878</p>
                  <p className="text-slate-500 font-mono text-xs pt-1">Response turnaround: within 48 business hours.</p>
                </div>
              </article>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM PIXEL-MOSAIC CTA BANNER (Zero Border Radius, #F2F6FD)
         ========================================================================= */}
      <section className="w-full px-6 sm:px-10 lg:px-14 pt-4 sm:pt-6 pb-8 sm:pb-10">
        <div
          id="privacy-proposal-cta"
          className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-none bg-[#f2f6fd] border border-slate-200/80 px-6 py-16 sm:px-12 sm:py-20 lg:py-24 text-center select-none shadow-[0_16px_40px_-20px_rgba(4,18,43,0.08)]"
        >
          {/* Desktop Geometric Edge SVGs */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 360"
            preserveAspectRatio="none"
            shapeRendering="crispEdges"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          >
            <rect x="0" y="0" width="56" height="56" fill="#ffffff" />
            <rect x="56" y="0" width="56" height="56" fill="#cfe2ff" />
            <rect x="112" y="0" width="56" height="56" fill="#0066FF" />
            <rect x="0" y="56" width="56" height="56" fill="#cfe2ff" />
            <rect x="56" y="56" width="56" height="56" fill="#04122b" />
            <rect x="0" y="112" width="56" height="56" fill="#0066FF" />

            <rect x="0" y="248" width="56" height="56" fill="#04122b" />
            <rect x="56" y="200" width="56" height="56" fill="#0066FF" />
            <rect x="112" y="248" width="56" height="56" fill="#ffffff" />
            <rect x="224" y="248" width="56" height="56" fill="#04122b" />
            <rect x="0" y="304" width="56" height="56" fill="#cfe2ff" />
            <rect x="168" y="304" width="56" height="56" fill="#0066FF" />
            <rect x="280" y="304" width="56" height="56" fill="#ffffff" />

            <rect x="1144" y="0" width="56" height="56" fill="#ffffff" />
            <rect x="1088" y="0" width="56" height="56" fill="#cfe2ff" />
            <rect x="1032" y="0" width="56" height="56" fill="#04122b" />
            <rect x="1088" y="56" width="56" height="56" fill="#0066FF" />

            <rect x="1144" y="200" width="56" height="56" fill="#04122b" />
            <rect x="1032" y="248" width="56" height="56" fill="#ffffff" />
            <rect x="1088" y="304" width="56" height="56" fill="#0066FF" />
            <rect x="1144" y="304" width="56" height="56" fill="#ffffff" />
          </svg>

          {/* Mobile Geometric Edge SVGs */}
          <svg
            aria-hidden="true"
            viewBox="0 0 360 280"
            preserveAspectRatio="none"
            shapeRendering="crispEdges"
            className="pointer-events-none absolute inset-0 h-full w-full md:hidden"
          >
            <rect x="0" y="0" width="28" height="28" fill="#ffffff" />
            <rect x="28" y="0" width="28" height="28" fill="#0066FF" />
            <rect x="332" y="0" width="28" height="28" fill="#ffffff" />
            <rect x="304" y="0" width="28" height="28" fill="#04122b" />
            <rect x="0" y="252" width="28" height="28" fill="#04122b" />
            <rect x="28" y="252" width="28" height="28" fill="#ffffff" />
            <rect x="332" y="252" width="28" height="28" fill="#ffffff" />
            <rect x="304" y="252" width="28" height="28" fill="#0066FF" />
          </svg>

          <div className="relative z-10 mx-auto max-w-2xl space-y-5">
            <h2
              className="pricing-proposal-heading font-ptserif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#04122b] tracking-[-0.03em] leading-[1.08]"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              Need a Data Processing Agreement (DPA)?
            </h2>
            <p className="mx-auto max-w-xl font-sans text-sm sm:text-[15px] text-[#04122b]/80 font-normal leading-[1.6]">
              For enterprise clients requiring customized Data Processing Agreements, security questionnaires, or architecture audits prior to contract commencement.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="group inline-flex items-center justify-center gap-2 rounded-none bg-[#04122b] px-6 py-3.5 text-xs sm:text-[13px] font-sans font-semibold text-white transition-colors duration-200 hover:bg-[#0066FF] cursor-pointer active:scale-[0.99]"
              >
                <RollingButtonText text="Request DPA or Consultation" icon={<ArrowRight className="w-4 h-4" />} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('faqs')}
                className="group inline-flex items-center justify-center gap-2 rounded-none border border-[#04122b]/25 bg-white px-6 py-3.5 text-xs sm:text-[13px] font-sans font-semibold text-[#04122b] transition-colors duration-200 hover:border-[#0066FF] hover:text-[#0066FF] cursor-pointer active:scale-[0.99]"
              >
                <RollingButtonText text="Explore FAQs" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
