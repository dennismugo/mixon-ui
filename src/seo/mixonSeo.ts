export type PageId =
  | 'home'
  | 'about'
  | 'mirentals'
  | 'mireserve'
  | 'eventyetu'
  | 'mipos'
  | 'services'
  | 'service-web'
  | 'service-app'
  | 'service-seo'
  | 'service-payments'
  | 'service-ecommerce'
  | 'service-ai'
  | 'pricing'
  | 'book-demo'
  | 'demo-tracker'
  | 'contact';

export interface FaqEntry {
  q: string;
  a: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface PricingTierData {
  id: string;
  name: string;
  tagline: string;
  kesMonthly: number | null;
  usdMonthly: number | null;
  highlight: string;
  features: string[];
}

export interface RouteSeoData {
  id: PageId;
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  summary: string;
  keyFacts: string[];
  priority: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  schemaKind: 'home' | 'about' | 'contact' | 'pricing' | 'software' | 'service' | 'services-hub';
  applicationCategory?: string;
  serviceType?: string;
  breadcrumbs: BreadcrumbItem[];
  faqs?: FaqEntry[];
}

export const SITE_CONFIG = {
  brandName: 'Mixon',
  legalName: 'Mixon (Shiva Softwares Africa)',
  heritageNote: 'Mixon builds on the experience of Shiva Softwares Africa.',
  defaultSiteUrl: 'https://mixonsoftwares.co.ke',
  tagline: 'Software, run by intelligence',
  description:
    'Intelligent property, hospitality, retail POS, and event ticketing software for Africa, alongside custom web, mobile, USSD, M-Pesa, and AI engineering.',
  email: 'info@mixonsoftwares.co.ke',
  secondaryEmail: 'contact@mixonsoftwares.co.ke',
  phones: ['+254713958492', '+254741733878'],
  address: {
    streetAddress: 'Mihrab Building, 15th Floor, Ring Road Kilimani',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
    countryName: 'Kenya',
  },
  areaServed: ['Kenya', 'East Africa', 'Africa'],
  currencies: ['KES', 'USD'],
  ogImagePath: '/android-chrome-512x512.png',
  logoPath: '/mixon_logo.png',
};

export function normalizeSiteUrl(rawUrl?: string | null): string {
  const candidate = (rawUrl || '').trim();
  if (!candidate || candidate === 'MY_APP_URL' || !/^https?:\/\//i.test(candidate)) {
    return SITE_CONFIG.defaultSiteUrl;
  }
  return candidate.replace(/\/+$/, '');
}

export const ROUTE_PATHS: Record<PageId, string> = {
  home: '/',
  about: '/about',
  mirentals: '/mirentals',
  mireserve: '/mireserve',
  eventyetu: '/eventyetu',
  mipos: '/mipos',
  services: '/services',
  'service-web': '/services/web',
  'service-app': '/services/app',
  'service-seo': '/services/seo',
  'service-payments': '/services/payments',
  'service-ecommerce': '/services/ecommerce',
  'service-ai': '/services/ai',
  pricing: '/pricing',
  'book-demo': '/book-demo',
  'demo-tracker': '/demo-tracker',
  contact: '/contact',
};

const PATH_TO_PAGE: Record<string, PageId> = Object.entries(ROUTE_PATHS).reduce(
  (acc, [pageId, path]) => {
    acc[path] = pageId as PageId;
    return acc;
  },
  {} as Record<string, PageId>,
);

export function getRoutePath(page: PageId | string): string {
  return ROUTE_PATHS[page as PageId] || '/';
}

export function normalizePathname(rawPathname: string): string {
  const pathOnly = (rawPathname || '/').split('?')[0].split('#')[0];
  if (pathOnly.length > 1 && pathOnly.endsWith('/')) {
    return pathOnly.slice(0, -1).toLowerCase();
  }
  return (pathOnly || '/').toLowerCase();
}

export function getPageFromPathname(rawPathname: string): PageId | null {
  const cleanPath = normalizePathname(rawPathname);
  return PATH_TO_PAGE[cleanPath] || null;
}

export const HOME_FAQS: FaqEntry[] = [
  {
    q: 'Which Mixon platform is right for our operational scale?',
    a: 'We evaluate your daily operations and transaction volume to recommend the right fit—whether you manage rental portfolios (miRentals), short-stay hospitality (miReserve), retail stores (miPOS), or ticketed events (Event Yetu).',
  },
  {
    q: 'Can Mixon integrate with our existing banks and M-Pesa Paybill / Till?',
    a: 'Yes. Mixon connects directly to Safaricom Daraja STK Push, C2B/B2C rails, and commercial banking APIs so incoming payments reconcile automatically with instant ledger confirmation.',
  },
  {
    q: 'How does Mixon stay reliable during internet connectivity dips?',
    a: 'Our retail and field workflows run on an offline-first local engine. Teams can keep billing, checking tickets, and recording transactions without delay—everything syncs automatically once connectivity returns.',
  },
  {
    q: 'What is the implementation timeline, training, and ongoing support?',
    a: 'Standard onboarding takes 3 to 10 business days including historical data migration and guided staff training, backed by our 99.95% uptime SLA and 1-business-day technical response guarantee.',
  },
  {
    q: 'How do you handle data security, backups, and privacy compliance?',
    a: 'All data is encrypted in transit with TLS 1.3 and at rest using AES-256, supported by automated multi-region daily backups and role-based access controls aligned with regional data protection laws.',
  },
];

export const MIRENTALS_FAQS: FaqEntry[] = [
  {
    q: 'Does miRentals replace my existing Excel spreadsheets and physical rent books?',
    a: 'Yes, completely. miRentals is built to replace error-prone spreadsheets, manual receipt books, and disparate WhatsApp chats. It automatically imports your current unit roster, assigns lease terms, and maintains a real-time ledger for every unit with zero manual reconciliation required.',
  },
  {
    q: 'How does M-Pesa automated reconciliation work when tenants pay?',
    a: 'We integrate directly with Safaricom Daraja STK Push and Paybill/Till APIs. When a tenant pays via M-Pesa using their house number as reference, the payment is cryptographically matched to their lease in under 2 seconds. An instant digital SMS receipt and updated statement are issued automatically.',
  },
  {
    q: 'Can multiple caretakers, accountants, and landlords have distinct permission levels?',
    a: 'Yes. Role-based access control allows you to invite landlords, property managers, site caretakers, and external auditors with granular permissions. Site caretakers can log meter readings and incident reports without seeing financial payouts, while landlords see real-time collection dashboards.',
  },
  {
    q: 'What happens when a tenant pays rent in installments or makes a partial deposit?',
    a: "miRentals manages running balances intelligently. Partial payments are instantly credited against the oldest outstanding charges (such as prior utility arrears or base rent). The remaining balance stays clearly highlighted on the manager's dashboard and the tenant's digital statement until cleared.",
  },
  {
    q: 'How long does it take to migrate our existing tenants and units into the platform?',
    a: 'Most residential and commercial properties go live within 24 to 48 hours. Our onboarding team provides a standardized CSV template or helps you upload your existing tenant directory directly. We also verify initial lease dates and deposit balances prior to activating automated invoicing.',
  },
  {
    q: 'Can miRentals automate utility bill distribution like water meters and garbage fees?',
    a: "Yes. You can enter bulk meter readings directly or use our caretaker mobile app. miRentals calculates tiered utility charges, appends them to each tenant's monthly invoice, and separates utility disbursements from landlord rent accounts in your financial reports.",
  },
];

export const MIRESERVE_FAQS: FaqEntry[] = [
  {
    q: 'How does miReserve prevent double-bookings across Airbnb, Booking.com, and direct channels?',
    a: 'miReserve uses sub-second two-way API calendar synchronization alongside continuous iCal feeds. The millisecond a reservation is confirmed on Airbnb or your direct website, the corresponding dates are instantly locked across Booking.com, Vrbo, and all connected channels before a duplicate booking can occur.',
  },
  {
    q: 'Can we collect direct guest deposits and card or M-Pesa payments on our website?',
    a: 'Yes. miReserve provides a high-converting direct booking engine that embeds cleanly into your existing website or standalone domain. Guests can pay via M-Pesa, Visa, Mastercard, or bank transfer with zero commission paid to external travel agencies.',
  },
  {
    q: 'How does automated guest communication and self check-in work?',
    a: 'Once a booking is confirmed, miReserve triggers customized WhatsApp and email workflows. Guests automatically receive location pins, WiFi passwords, digital arrival guides, and time-sensitive smart lock keypad PINs that activate only during their booked stay and expire upon checkout.',
  },
  {
    q: 'Does miReserve support dynamic seasonal pricing and weekend surge rules?',
    a: 'Yes. You can configure seasonal yield rules, minimum night stay requirements, weekend surge premiums, and last-minute discounts. Rates update across all synchronized OTAs simultaneously without manual adjustment on individual extranets.',
  },
  {
    q: 'How are housekeeping, turnover tasks, and maintenance schedules managed?',
    a: 'Every checkout automatically generates a scheduled turnover task assigned to your housekeeping team. Housekeepers can mark rooms cleaned, report maintenance issues with photos, and verify minibar inventory before the front desk approves early check-in.',
  },
  {
    q: "Can owners of managed villas access their property's booking performance?",
    a: 'Yes. miReserve includes a dedicated Property Owner Portal. Villa and apartment owners can view live occupancy calendars, review monthly net rental income after management fees, and reserve owner-stay dates directly from their mobile phones.',
  },
];

export const EVENTYETU_FAQS: FaqEntry[] = [
  {
    q: 'How fast is ticket QR code validation at high-volume gate entrances?',
    a: 'Event Yetu gate scanners validate secure QR codes in under 120 milliseconds per attendee. Even during peak door surges at major concerts and festivals, single attendants can scan over 1,200 attendees per hour per turnstile without bottle-necking entry queues.',
  },
  {
    q: 'Does gate scanning continue to work if the venue loses internet connectivity?',
    a: 'Yes. The Event Yetu gate application features an offline-first cryptographic synchronization engine. Gate staff can download the verified attendee manifest locally prior to opening doors. Tickets scan instantly offline, and data automatically syncs across all scanners when connection is restored.',
  },
  {
    q: 'Can we configure tiered pricing like Early Bird, VIP, and complimentary guest lists?',
    a: 'Yes. You have complete control over ticket tiers, inventory limits, early-bird time triggers, group bundle discounts, and promo codes. You can also issue named complimentary tickets with digital verification to prevent unauthorized transfer.',
  },
  {
    q: 'How quickly do ticket revenue funds settle to our bank account or M-Pesa Paybill?',
    a: "Ticket proceeds can be deposited on a flexible rolling schedule or settled into your organization's bank account or M-Pesa Paybill. We provide transparent automated disbursement statements that outline gross sales, payment processor fees, and net payouts.",
  },
  {
    q: 'How does Event Yetu prevent ticket duplication and screenshot sharing fraud?',
    a: 'Each QR ticket contains time-sensitive cryptographic digital signatures. The moment a ticket is scanned at any gate, it is instantly revoked across all active scanning terminals, ensuring screenshots and copied printouts cannot be reused by multiple attendees.',
  },
  {
    q: 'Can event organizers and sponsors access real-time live attendance analytics?',
    a: 'Yes. Organizers have access to a real-time live telemetry dashboard displaying tickets sold by tier, hourly gate ingress rates, demographic velocity, and remaining venue capacity right from their mobile phones or control booth monitors.',
  },
];

export const MIPOS_FAQS: FaqEntry[] = [
  {
    q: "Does miPOS continue processing sales if our shop's internet goes down?",
    a: 'Yes. miPOS operates with full offline persistence. Cashiers can scan barcodes, ring up counter transactions, accept cash, and print receipts without an active internet connection. As soon as connectivity returns, all sales and inventory adjustments automatically sync with the cloud back-office.',
  },
  {
    q: 'Which hardware peripherals, barcode scanners, and thermal receipt printers are supported?',
    a: 'miPOS works natively on iPads, Android tablets, touch terminals, and desktop PCs. It connects seamlessly via Bluetooth, USB, or LAN to standard ESC/POS 58mm and 80mm thermal printers, 1D/2D barcode scanners, customer-facing displays, and automatic electronic cash drawers.',
  },
  {
    q: 'How does real-time multi-location inventory and warehouse transfer work?',
    a: 'Inventory is centralized in real time across all branch counters, storerooms, and central warehouses. When an item sells in one shop, total stock updates instantly. Managers can initiate, approve, and track stock transfers between branches with automated verification.',
  },
  {
    q: 'Can cashiers split payments between cash, M-Pesa STK push, and credit cards?',
    a: 'Yes. Cashiers can split a single ticket across multiple payment tenders in seconds—for example, partial cash and the balance via M-Pesa STK push. The system verifies M-Pesa confirmation codes cryptographically before finalizing the receipt, eliminating counterfeit payment risk.',
  },
  {
    q: 'How does end-of-shift reconciliation prevent till discrepancy and cashier leakage?',
    a: 'At the end of every shift, cashiers perform a blind till count. miPOS automatically matches recorded cash, card, and M-Pesa transactions against the physical count, generating a detailed X-Report or Z-Report that flags overages or shortages to store managers immediately.',
  },
  {
    q: 'Can miPOS track supplier purchase orders, deliveries, and low-stock alerts?',
    a: 'Yes. You can set minimum reorder thresholds for each product. When stock drops below minimum quantities, miPOS automatically generates purchase order drafts for your assigned vendors and tracks receipt confirmations into inventory upon arrival.',
  },
];

export const PRICING_FAQS: FaqEntry[] = [
  {
    q: 'Are the package prices fixed or are there recurring costs?',
    a: 'All website packages are fixed-price with defined milestone deliverables. Product licenses (miRentals, miReserve, miPOS, Event Yetu) are simple monthly or annual subscriptions with zero hidden transaction surcharges from Mixon.',
  },
  {
    q: 'Can Mixon integrate with tools and payment rails we already use?',
    a: 'Yes. We natively support M-Pesa Daraja STK Push & C2B, card processors (Stripe, Pesapal, DPO), bank rails, and external accounting ERPs via standard REST and GraphQL webhooks.',
  },
  {
    q: 'What happens after launch? Is maintenance included?',
    a: 'Every package includes 30 days of complimentary post-launch engineering support, telemetry monitoring, and training. Ongoing maintenance retainers and SLA tiers are available for expanding teams.',
  },
  {
    q: 'How quickly can our team go live?',
    a: 'Standard website packages deliver within 7 to 10 business days. Product deployments (miRentals, miPOS, miReserve) typically configure and go live in 1 to 3 weeks depending on asset volume and data migration requirements.',
  },
  {
    q: 'Do we own the software and source code?',
    a: 'Yes. For bespoke projects and websites, all custom code, assets, content, and deployment configurations are 100% your intellectual property upon final project settlement.',
  },
  {
    q: 'Can we upgrade plans as our transaction volume grows?',
    a: 'Seamlessly. You can upgrade or add licenses at any point with prorated billing. Concurrency limits and API rate allocations scale instantly without service downtime.',
  },
];

export const WEB_SERVICE_FAQS: FaqEntry[] = [
  {
    q: 'Can my team update the website without coding?',
    a: 'Yes. Every website we build includes an intuitive CMS tailored specifically to your content needs, plus a video walkthrough showing your staff how to publish blogs, update team profiles, and adjust text.',
  },
  {
    q: 'How fast will the website load?',
    a: 'We target sub-second initial load times and top-tier Core Web Vitals scores. High speed is critical both for user retention and search engine rankings.',
  },
  {
    q: 'Can you connect the website to our payment or CRM tools?',
    a: 'Absolutely. We specialize in connecting web forms and checkout flows to M-Pesa Daraja STK push, Stripe, WhatsApp, HubSpot, and custom internal APIs.',
  },
  {
    q: 'What is included in a website project?',
    a: 'A typical project covers discovery, content structure, visual design, responsive development, and launch preparation. The exact deliverables are agreed around your goals and the scope of the project.',
  },
  {
    q: 'Can you redesign an existing website?',
    a: 'Yes. We can review the current site, identify what is working, and plan a redesign around your audience and business goals while considering existing content and search visibility.',
  },
  {
    q: 'Who looks after the website after launch?',
    a: 'We can hand over the site and show your team how to manage its content. Hosting, maintenance, and ongoing improvements can be scoped to suit your team.',
  },
];

export const APP_SERVICE_FAQS: FaqEntry[] = [
  {
    q: 'Do you build native or cross-platform apps?',
    a: 'We choose the architecture that best fits your performance and budget goals — typically modern React Native or Flutter for high-velocity cross-platform delivery with native iOS and Android fidelity.',
  },
  {
    q: 'How does USSD integration work?',
    a: 'USSD allows any user to dial a shortcode (like *384*XX#) to access your menu, check balances, or place orders without an internet connection. We help navigate local telecom aggregators and Safaricom/Airtel shortcode registrations.',
  },
  {
    q: 'Can the app work when internet is down?',
    a: 'Yes. We engineer offline-first data stores that queue transactions locally on the device and sync cryptographically with the cloud once network connectivity returns.',
  },
  {
    q: 'Can you improve an app we already have?',
    a: 'Yes. We can review the current app, codebase, and user experience, then recommend a practical upgrade or a phased rebuild based on what is worth keeping.',
  },
  {
    q: 'How do you approach app security?',
    a: 'Security is considered from architecture through release, including access controls, secure data handling, and testing appropriate to the app and the information it processes.',
  },
  {
    q: 'Can you help publish the app?',
    a: 'Yes. We can prepare the release and support store submission. Store accounts, required approvals, and the release responsibilities are agreed at the start of the project.',
  },
];

export const SEO_SERVICE_FAQS: FaqEntry[] = [
  {
    q: 'What is AEO and GEO optimization?',
    a: "Answer-Engine Optimization (AEO) and Generative-Engine Optimization (GEO) structure your website's facts, entity relationships, and pricing so AI systems like Perplexity, ChatGPT, and Google Gemini cite your company when answering user queries.",
  },
  {
    q: 'How soon do we see results?',
    a: 'Technical fixes and AEO schema changes can be indexed within days to weeks. Organic search authority builds compounding traffic over 60 to 90 days, while Bulk SMS campaigns generate immediate responses.',
  },
  {
    q: 'Do you focus on clicks or leads?',
    a: 'Leads. We measure success by the phone calls, quote requests, and paying customers arriving at your business, not vanity traffic.',
  },
  {
    q: 'Can you guarantee a first-page search ranking?',
    a: 'No. Search rankings depend on competition, search engine changes, and other factors outside any provider’s control. We focus on sound technical and content improvements and report progress transparently.',
  },
  {
    q: 'What do you include in SEO reporting?',
    a: 'Reporting can cover technical health, search visibility, qualified visits, and conversion activity where tracking is available, so progress is connected to business outcomes.',
  },
  {
    q: 'What access do you need to get started?',
    a: 'We usually need relevant website and search analytics access to assess the current setup. Access is limited to what the agreed work requires.',
  },
];

export const PAYMENTS_SERVICE_FAQS: FaqEntry[] = [
  {
    q: 'How does M-Pesa Daraja STK Push work?',
    a: 'When a customer initiates checkout, an automated prompt pops up directly on their phone asking for their M-Pesa PIN. Once entered, Safaricom sends an encrypted webhook back to your system within seconds to automatically confirm the order.',
  },
  {
    q: 'What happens if a customer pays but the internet drops?',
    a: 'Our reconciliation queues use idempotent webhook listeners and fallback callback polling. Even if the customer closes their browser before the redirect finishes, the payment is securely recorded, the invoice marked paid, and an SMS receipt dispatched.',
  },
  {
    q: "Can you connect systems that don't have existing plugins?",
    a: 'Yes. We regularly build custom API middleware and webhooks that bridge legacy databases, custom proprietary portals, and modern third-party services.',
  },
  {
    q: 'Can you support more than one payment provider?',
    a: 'Yes, where providers support your markets and business flow. We map the payment methods, settlement needs, and system requirements before choosing integrations.',
  },
  {
    q: 'How do you handle duplicate or delayed payment notifications?',
    a: 'We design callback handling and reconciliation around the provider’s behavior, using safeguards to identify repeated notifications and transactions that need review.',
  },
  {
    q: 'Will my store need to handle card details?',
    a: 'Where possible, card details are handled by the payment provider through its approved checkout or tokenization flow. The final approach depends on your gateway and compliance requirements.',
  },
];

export const ECOMMERCE_SERVICE_FAQS: FaqEntry[] = [
  {
    q: 'Which payment gateways do you integrate into the store?',
    a: 'We support direct M-Pesa Daraja STK Push, credit/debit cards (Visa, Mastercard), PayPal, Stripe, and bank transfers, plus cash-on-delivery options if required.',
  },
  {
    q: 'Can the online store sync stock with our physical shop?',
    a: 'Yes. When paired with miPOS or connected to your existing point of sale, online and in-store stock levels sync in real time so you never oversell an item.',
  },
  {
    q: 'Is the store mobile-friendly?',
    a: 'Over 75% of online shopping happens on phones. We design mobile-first with thumb-friendly buttons, fast image compression, and streamlined payment steps.',
  },
  {
    q: 'Can you bring our existing product catalog into the store?',
    a: 'We can assess your current catalog and import options, then map product details, categories, images, and variants to the new storefront.',
  },
  {
    q: 'Can our team manage products and orders after launch?',
    a: 'Yes. We can provide an admin workflow for day-to-day catalog and order updates, shaped around the roles and tasks your team handles.',
  },
  {
    q: 'Can checkout support delivery and collection?',
    a: 'We can configure delivery areas, rates, and collection options to match your fulfillment process and the capabilities of your chosen platform.',
  },
];

export const AI_SERVICE_FAQS: FaqEntry[] = [
  {
    q: 'Does our business really need AI, or just better software?',
    a: 'That is the first question we answer. Many bottlenecks simply need a cleaner webhook or database script. We only apply AI where machine learning or natural language understanding provides a measurable, explainable advantage.',
  },
  {
    q: 'Is our business and customer data safe?',
    a: 'Yes. We use enterprise private endpoints with strict zero-data-retention policies. Your private customer records, pricing, and internal documents are never used to train public foundation models.',
  },
  {
    q: 'What is human-in-the-loop design?',
    a: 'Human-in-the-loop means the AI drafts, categorizes, or extracts information, but a designated person reviews and approves the final action before anything irreversible happens (like issuing a refund or signing a lease).',
  },
  {
    q: 'Which business tasks are good candidates for AI?',
    a: 'Tasks with repetitive inputs, clear success criteria, and manageable risk are often good candidates. We first check whether simpler automation would solve the problem more reliably.',
  },
  {
    q: 'Can staff review AI outputs before anything happens?',
    a: 'Yes. Review and approval steps can be built into workflows, especially where an action affects customers, money, or important records.',
  },
  {
    q: 'Can an AI tool use our internal documents?',
    a: 'It can be designed to retrieve answers from an approved set of internal sources, with access and data handling shaped around your security requirements.',
  },
];

export const PRICING_TIERS: PricingTierData[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For exploring & early-stage business setups',
    kesMonthly: 25000,
    usdMonthly: 200,
    highlight: 'Up to 5 custom pages included',
    features: [
      'Mobile-first responsive architecture',
      'Sub-second load times & SSL',
      'Direct inquiry capture form',
      'Delivery in 7–10 business days',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For expanding businesses & dynamic publishing',
    kesMonthly: 40500,
    usdMonthly: 325,
    highlight: 'CMS & Structured Schema included',
    features: [
      'Everything in Starter',
      'Intuitive Content Management (CMS)',
      'AEO & GEO Answer-Engine schema',
      'WhatsApp notifications & alerts',
      '30 days post-launch SLA support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For high-concurrency commercial operations',
    kesMonthly: 75500,
    usdMonthly: 600,
    highlight: 'Direct Payment Rails & Portals',
    features: [
      'Everything in Growth',
      'M-Pesa Daraja STK Push & Card Rails',
      'Custom client portals & calculators',
      'Zero-leakage settlement webhooks',
      'Dedicated technical engineer support',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'For multi-branch & high-volume teams',
    kesMonthly: 145000,
    usdMonthly: 1150,
    highlight: 'Dedicated Concurrency & APIs',
    features: [
      'Everything in Pro',
      'Custom REST & GraphQL endpoints',
      'Multi-department role permissions',
      'Hourly automated ledger backups',
      'Dedicated technical account lead',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Tailored multi-system rollout & private SLA',
    kesMonthly: 250000,
    usdMonthly: 2000,
    highlight: 'Private SLA & Telco Rails',
    features: [
      'Custom telco USSD shortcodes',
      'Dedicated staging & load tests',
      '99.95% uptime contract SLA',
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    tagline: 'Bespoke platforms & end-to-end engineering',
    kesMonthly: null,
    usdMonthly: null,
    highlight: '100% Bespoke Codebase & IP',
    features: [
      '100% client intellectual property ownership',
      'Dedicated product engineering squad',
      'Custom architecture, USSD, ERP & payment middleware',
    ],
  },
];

export const ROUTE_SEO: Record<PageId, RouteSeoData> = {
  home: {
    id: 'home',
    path: '/',
    title: 'Mixon — Property, Hospitality, POS & Event Software for Africa',
    description:
      'Mixon builds AI-native operational software and digital systems for Africa: miRentals, miReserve, Event Yetu, and miPOS with M-Pesa Daraja reconciliation.',
    h1: 'Less time managing tasks. More time to grow.',
    eyebrow: 'Mixon Software & Engineering',
    summary:
      'From rent collection and bookings to ticket sales and stock control, Mixon helps businesses across Kenya and Africa automate operations with native M-Pesa Daraja reconciliation, offline-first resilience, and custom engineering.',
    keyFacts: [
      '4 flagship platforms: miRentals (Property Ops), miReserve (Hospitality & Stays), Event Yetu (Ticketing & Gates), miPOS (Offline Retail POS).',
      '6 custom engineering services: Web Design & Development, Mobile Apps & USSD, Search/AEO/GEO, M-Pesa & Payment Integrations, E-Commerce, and AI Automation.',
      'Direct Safaricom Daraja STK Push, C2B/B2C, card rails, TLS 1.3 / AES-256 encryption, and 99.95% SLA.',
      'Headquartered in Nairobi, Kenya (Mihrab Building, 15th Floor, Ring Road Kilimani), building on the experience of Shiva Softwares Africa.',
    ],
    priority: '1.0',
    changefreq: 'weekly',
    schemaKind: 'home',
    breadcrumbs: [{ name: 'Home', path: '/' }],
    faqs: HOME_FAQS,
  },
  about: {
    id: 'about',
    path: '/about',
    title: 'About Mixon — Engineering Software That Fits Real Operations',
    description:
      'Learn about Mixon, our Nairobi engineering roots building on Shiva Softwares Africa, security standards (TLS 1.3, AES-256, PCI-DSS), and practical design values.',
    h1: 'Technology that makes business easier to run.',
    eyebrow: 'About Mixon',
    summary:
      'Mixon builds practical operational platforms, connected M-Pesa and telco rails, and modern digital systems that eliminate manual spreadsheets and fit how teams actually operate across Africa and globally.',
    keyFacts: [
      'Built on the engineering experience of Shiva Softwares Africa.',
      'Trusted by over 1,000 businesses and 2,400+ properties and operational teams.',
      'Core security & privacy standard: TLS 1.3 in transit, AES-256 at rest, multi-region daily backups, and PCI-DSS financial compliance.',
      'Values: Clarity over complexity, craft in the details, measurable client progress, access by design, and radical honesty about AI.',
    ],
    priority: '0.8',
    changefreq: 'monthly',
    schemaKind: 'about',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },
  mirentals: {
    id: 'mirentals',
    path: '/mirentals',
    title: 'miRentals — Property Management & M-Pesa Rent Reconciliation | Mixon',
    description:
      'miRentals automates rent ledgers, Safaricom M-Pesa Daraja reconciliation, water meter utility billing, tenant onboarding, and landlord reporting in Kenya.',
    h1: 'Know what is occupied. Make rent collection effortless.',
    eyebrow: 'miRentals · Property Ops',
    summary:
      'miRentals replaces manual spreadsheets and rent books with automated tenant ledgers, instant M-Pesa Paybill/Till matching under 2 seconds, tiered utility billing, and role-based landlord/caretaker portals.',
    keyFacts: [
      'Cryptographic M-Pesa Daraja STK Push & Paybill/Till matching in under 2 seconds with instant SMS receipts.',
      'Intelligent partial/installment rent balance allocation against oldest arrears and utilities.',
      'Role-based access for landlords, property managers, caretakers, and auditors.',
      'Standard property data migration and go-live within 24 to 48 hours.',
    ],
    priority: '0.9',
    changefreq: 'weekly',
    schemaKind: 'software',
    applicationCategory: 'BusinessApplication',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'miRentals', path: '/mirentals' },
    ],
    faqs: MIRENTALS_FAQS,
  },
  mireserve: {
    id: 'mireserve',
    path: '/mireserve',
    title: 'miReserve — Hospitality Channel Manager & Direct Stays | Mixon',
    description:
      'miReserve synchronizes Airbnb, Booking.com, Vrbo, and direct guest bookings in 14ms to eliminate double bookings and automate M-Pesa & card stays.',
    h1: 'Keep bookings in sync. Give guests a smoother stay.',
    eyebrow: 'miReserve · Hospitality & Short Stays',
    summary:
      'miReserve unifies multi-channel OTA calendar locking (Airbnb, Booking.com, Vrbo), commission-free direct booking engines with M-Pesa/card deposits, smart lock self check-in workflows, and owner payout portals.',
    keyFacts: [
      '14-millisecond two-way calendar sync preventing double bookings across Airbnb, Booking.com, Vrbo, and direct portals.',
      'Commission-free direct booking widget supporting M-Pesa, Visa, Mastercard, and bank transfers.',
      'Automated WhatsApp/email guest guides and stay-scoped smart lock keypad PIN delivery.',
      'Includes housekeeping turnover automation and a dedicated Villa Owner Portal.',
    ],
    priority: '0.9',
    changefreq: 'weekly',
    schemaKind: 'software',
    applicationCategory: 'BusinessApplication',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'miReserve', path: '/mireserve' },
    ],
    faqs: MIRESERVE_FAQS,
  },
  eventyetu: {
    id: 'eventyetu',
    path: '/eventyetu',
    title: 'Event Yetu — High-Speed Event Ticketing & Offline QR Gates | Mixon',
    description:
      'Event Yetu powers ticket sales, dynamic M-Pesa & card settlement, anti-screenshot QR codes, and sub-120ms offline gate scanning at scale.',
    h1: 'Sell tickets smarter. Keep every gate moving fast.',
    eyebrow: 'Event Yetu · Ticketing & Gate Access',
    summary:
      'Event Yetu equips promoters, festivals, and venues with tiered ticket sales, instant cryptographic anti-duplication QR passes, offline gate validation under 120ms, and real-time attendance telemetry.',
    keyFacts: [
      'Sub-120ms QR ticket validation supporting 1,200+ scans per hour per gate attendant.',
      'Offline-first encrypted gate manifest syncing across scanners when venue internet drops.',
      'Single-use signed QR codes preventing screenshot reuse and duplicate entry fraud.',
      'Supports Early Bird, VIP, promo codes, complimentary lists, and M-Pesa/bank settlement.',
    ],
    priority: '0.9',
    changefreq: 'weekly',
    schemaKind: 'software',
    applicationCategory: 'BusinessApplication',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Event Yetu', path: '/eventyetu' },
    ],
    faqs: EVENTYETU_FAQS,
  },
  mipos: {
    id: 'mipos',
    path: '/mipos',
    title: 'miPOS — Offline-First Retail POS & Multi-Branch Inventory | Mixon',
    description:
      'miPOS delivers offline retail checkout, split cash/M-Pesa STK/card tenders, ESC/POS thermal receipt hardware support, and real-time warehouse stock control.',
    h1: 'Know what is selling. Keep stock and sales in check.',
    eyebrow: 'miPOS · Retail & Inventory POS',
    summary:
      'miPOS combines offline-resilient counter checkout with live multi-branch stock transfers, blind X/Z shift till audits, purchase order drafts, and cryptographic M-Pesa Daraja payment verification.',
    keyFacts: [
      'Offline-first indexed POS database keeps billing and receipt printing running when internet drops.',
      'Split tender checkout across Cash, M-Pesa Daraja STK Push, and cards with automated code verification.',
      'Works on iPad, Android tablets, and desktop PCs with 58mm/80mm ESC/POS printers and 1D/2D scanners.',
      'Blind shift counts generate X-Reports and Z-Reports to stop till shrinkage and cashier variance.',
    ],
    priority: '0.9',
    changefreq: 'weekly',
    schemaKind: 'software',
    applicationCategory: 'BusinessApplication',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'miPOS', path: '/mipos' },
    ],
    faqs: MIPOS_FAQS,
  },
  services: {
    id: 'services',
    path: '/services',
    title: 'Software Engineering, Mobile, USSD, Payments & AI Services | Mixon',
    description:
      'Custom software engineering from Mixon: web platforms, iOS/Android & USSD apps, M-Pesa Daraja payment middleware, headless e-commerce, AEO/GEO search, and AI automation.',
    h1: 'Build what you need. Connect what you use. Scale faster.',
    eyebrow: 'Mixon Digital Services',
    summary:
      'Alongside our flagship SaaS platforms, Mixon designs and builds custom websites, native/cross-platform mobile & USSD apps, payment integrations, online stores, search visibility systems, and human-in-the-loop AI workflows.',
    keyFacts: [
      'Web Design & Development: sub-second Core Web Vitals, custom React/Next.js apps, and headless CMS.',
      'Mobile & USSD Engineering: offline-first iOS/Android apps and *384* telco USSD shortcodes.',
      'Payments & Integrations: M-Pesa Daraja STK Push/C2B, Stripe, Pesapal, DPO, and custom ERP webhooks.',
      'Search & Discovery (AEO/GEO), E-Commerce Stores, and Zero-Retention Human-in-the-Loop AI.',
    ],
    priority: '0.9',
    changefreq: 'monthly',
    schemaKind: 'services-hub',
    serviceType: 'Custom Software Engineering & Digital Platform Development',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ],
  },
  'service-web': {
    id: 'service-web',
    path: '/services/web',
    title: 'Custom Web Design, React & Next.js Development | Mixon',
    description:
      'Sub-second websites, custom client portals, headless CMS workflows, and M-Pesa/CRM-connected web applications built by Mixon.',
    h1: 'A website that helps people understand you, and act.',
    eyebrow: 'Web Development · Modern Architecture',
    summary:
      'We engineer responsive websites, client portals, and custom web applications with semantic HTML5, Core Web Vitals speed, CMS autonomy, and direct M-Pesa/CRM lead capture.',
    keyFacts: [
      'Sub-second load targets (<1.2s) and semantic HTML5 architecture for SEO & accessibility.',
      'Custom CMS setups with guided team training and video walkthroughs.',
      'Direct integrations to M-Pesa Daraja STK Push, Stripe, WhatsApp, and HubSpot/CRMs.',
      'Full source code and intellectual property ownership transferred upon final settlement.',
    ],
    priority: '0.8',
    changefreq: 'monthly',
    schemaKind: 'service',
    serviceType: 'Web Design & Web Application Development',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Web Development', path: '/services/web' },
    ],
    faqs: WEB_SERVICE_FAQS,
  },
  'service-app': {
    id: 'service-app',
    path: '/services/app',
    title: 'Mobile App (iOS & Android) & USSD Shortcode Development | Mixon',
    description:
      'Cross-platform iOS/Android apps with offline-first sync and Safaricom/Airtel telco USSD shortcode solutions that reach every phone without mobile data.',
    h1: 'Turn a manual process into an app people use every day.',
    eyebrow: 'Mobile Applications · iOS, Android & USSD',
    summary:
      'Mixon designs and builds offline-resilient Android and iOS apps (React Native/Flutter) alongside telco USSD menu systems so customers can transact even without data connectivity.',
    keyFacts: [
      'React Native & Flutter engineering tailored to offline-first field conditions.',
      'Telco USSD integration (*384*XX# shortcodes) for 100% phone reach with zero mobile data required.',
      'End-to-end Play Store and App Store release preparation and security hardening.',
    ],
    priority: '0.8',
    changefreq: 'monthly',
    schemaKind: 'service',
    serviceType: 'Mobile Application & USSD Engineering',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Mobile Applications & USSD', path: '/services/app' },
    ],
    faqs: APP_SERVICE_FAQS,
  },
  'service-seo': {
    id: 'service-seo',
    path: '/services/seo',
    title: 'Technical SEO, AEO & Generative Engine Optimization (GEO) | Mixon',
    description:
      'Get discovered by Google and recommended by ChatGPT, Perplexity, and Gemini through Mixon’s technical SEO, entity schemas, SSR, and lead-focused growth engineering.',
    h1: 'Be found by humans. Be recommended by AI assistants.',
    eyebrow: 'Search & Discovery · Technical SEO, AEO & GEO',
    summary:
      'We combine Core Web Vitals optimization, Schema.org knowledge graphs, llms.txt & crawlable SSR architecture, and commercial answer content so both search engines and AI assistants recommend your business.',
    keyFacts: [
      'Full technical crawlability, XML sitemaps, canonical hygiene, and Core Web Vitals tuning.',
      'Structured JSON-LD entity graphs & llms.txt implementation for ChatGPT, Perplexity, and Gemini citations.',
      'Pipeline and qualified-enquiry attribution rather than vanity click metrics.',
    ],
    priority: '0.85',
    changefreq: 'monthly',
    schemaKind: 'service',
    serviceType: 'SEO, Answer Engine Optimization (AEO) & Generative Engine Optimization (GEO)',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Search & Discovery (AEO/GEO)', path: '/services/seo' },
    ],
    faqs: SEO_SERVICE_FAQS,
  },
  'service-payments': {
    id: 'service-payments',
    path: '/services/payments',
    title: 'M-Pesa Daraja, Stripe & Custom Payment API Integrations | Mixon',
    description:
      'Idempotent Safaricom M-Pesa Daraja STK Push, C2B/B2C, card rails, and custom ERP webhook middleware engineered by Mixon with zero payment leakage.',
    h1: 'Close the gaps between your payments and your systems.',
    eyebrow: 'Payments & Integrations · Zero-Leakage Rails',
    summary:
      'Mixon builds direct payment integrations linking Safaricom M-Pesa Daraja STK Push, Pesapal, DPO, Stripe, and commercial bank feeds straight into your ledgers with idempotent webhook safety.',
    keyFacts: [
      'Direct Safaricom M-Pesa Daraja STK Push, C2B, and B2C reconciliation pipelines.',
      'Idempotent webhook listeners and fallback callback polling prevent dropped or duplicate receipts.',
      'Tokenized card checkout handling (PCI-DSS aligned) and legacy ERP/database middleware.',
    ],
    priority: '0.8',
    changefreq: 'monthly',
    schemaKind: 'service',
    serviceType: 'Payment Rail & API Middleware Integration',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Payments & Integrations', path: '/services/payments' },
    ],
    faqs: PAYMENTS_SERVICE_FAQS,
  },
  'service-ecommerce': {
    id: 'service-ecommerce',
    path: '/services/ecommerce',
    title: 'Headless E-Commerce & M-Pesa Checkout Storefronts | Mixon',
    description:
      'Mobile-first digital stores with M-Pesa Daraja STK Push, card checkout, live physical-to-online stock sync via miPOS, and delivery zone configuration.',
    h1: 'An online store that makes buying feel effortless.',
    eyebrow: 'Modern E-Commerce · High Conversion',
    summary:
      'We build fast, mobile-first online storefronts featuring one-tap M-Pesa STK Push and card checkout, real-time branch stock synchronization with miPOS, and flexible catalog and fulfillment workflows.',
    keyFacts: [
      'Supports M-Pesa Daraja STK Push, Visa, Mastercard, PayPal, Stripe, and Cash on Delivery.',
      'Real-time inventory synchronization with physical outlets when paired with miPOS.',
      'Full catalog migration, delivery zone pricing, and team admin training.',
    ],
    priority: '0.8',
    changefreq: 'monthly',
    schemaKind: 'service',
    serviceType: 'E-Commerce Storefront & Inventory Integration',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'E-Commerce Development', path: '/services/ecommerce' },
    ],
    faqs: ECOMMERCE_SERVICE_FAQS,
  },
  'service-ai': {
    id: 'service-ai',
    path: '/services/ai',
    title: 'AI Workflows & Human-in-the-Loop Process Automation | Mixon',
    description:
      'Practical enterprise AI automation with zero public training data retention, human-in-the-loop approvals, and approved-document RAG built by Mixon.',
    h1: 'Find the work genuinely worth automating.',
    eyebrow: 'AI & Automation · Human-in-the-Loop',
    summary:
      'We evaluate workflows honestly—choosing deterministic scripts when simpler, and deploying zero-retention enterprise AI assistants with strict human approval gates where language or document understanding creates real ROI.',
    keyFacts: [
      'Zero-data-retention enterprise endpoints: private company data never trains public models.',
      'Human-in-the-loop review gates before sensitive financial, refund, or contract actions.',
      'Scoped retrieval over approved internal operational documents with access controls.',
    ],
    priority: '0.8',
    changefreq: 'monthly',
    schemaKind: 'service',
    serviceType: 'AI Workflow & Process Automation Engineering',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'AI & Process Automation', path: '/services/ai' },
    ],
    faqs: AI_SERVICE_FAQS,
  },
  pricing: {
    id: 'pricing',
    path: '/pricing',
    title: 'Pricing & Software Plans (KES & USD) | Mixon',
    description:
      'Transparent monthly & annual Mixon pricing in KES and USD: Starter (KES 25,000), Growth (KES 40,500), Pro (KES 75,500), Scale (KES 145,000), Enterprise (KES 250,000), and Custom builds.',
    h1: 'Straightforward, transparent pricing',
    eyebrow: 'Pricing & Plans · 20% Off Annual Billing',
    summary:
      'Fixed-scope website builds and predictable SaaS platform licenses with zero hidden surcharges, 30 days of complimentary post-launch SLA support, and 20% savings on annual plans.',
    keyFacts: [
      'Starter: KES 25,000/mo (USD 200/mo) — up to 5 pages, SSL, inquiry form, 7–10 business day delivery.',
      'Growth: KES 40,500/mo (USD 325/mo) — CMS, AEO & GEO Answer-Engine schema, WhatsApp alerts.',
      'Pro: KES 75,500/mo (USD 600/mo) — M-Pesa Daraja STK Push, Card Rails, portals, settlement webhooks.',
      'Scale: KES 145,000/mo (USD 1,150/mo) & Enterprise: KES 250,000/mo (USD 2,000/mo) — REST/GraphQL APIs, custom USSD shortcodes, 99.95% SLA.',
    ],
    priority: '0.9',
    changefreq: 'weekly',
    schemaKind: 'pricing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ],
    faqs: PRICING_FAQS,
  },
  'book-demo': {
    id: 'book-demo',
    path: '/book-demo',
    title: 'Book a Live Demo — Guided Walkthrough & Calendar | Mixon',
    description:
      'Schedule a personalized 30-minute Mixon walkthrough tailored to miRentals, miReserve, Event Yetu, miPOS, or custom web/mobile/M-Pesa engineering via WhatsApp or Email.',
    h1: 'Book a personalized Mixon walkthrough.',
    eyebrow: 'Book a Demo · 5-Step Scheduler',
    summary:
      'Pick the Mixon software platforms and engineering services relevant to your workflow, choose a calendar slot in East Africa Time (EAT), and send your demo request straight to Mixon WhatsApp or Email.',
    keyFacts: [
      'Covers miRentals, miReserve, Event Yetu, miPOS, plus Web, Mobile/USSD, SEO/AEO/GEO, Payments, E-Commerce & AI services.',
      'Interactive calendar availability Monday–Saturday with 30-minute walkthrough slots.',
      'Direct delivery confirmation via Mixon WhatsApp (+254 741 733 878) or Email (info@mixonsoftwares.co.ke).',
    ],
    priority: '0.9',
    changefreq: 'weekly',
    schemaKind: 'contact',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Book a Demo', path: '/book-demo' },
    ],
  },
  contact: {
    id: 'contact',
    path: '/contact',
    title: 'Contact Mixon — Book a Demo or Project Consultation in Nairobi',
    description:
      'Talk to Mixon’s engineering and sales team in Kilimani, Nairobi: info@mixonsoftwares.co.ke, +254 713 958 492, +254 741 733 878, Mihrab Building 15th Floor.',
    h1: "Let's start with what you're trying to solve.",
    eyebrow: 'Contact Mixon · Nairobi & Remote',
    summary:
      'Reach Mixon directly for miRentals, miReserve, Event Yetu, miPOS demos, or custom web/mobile/USSD/M-Pesa engineering proposals. Replies within one business day.',
    keyFacts: [
      'Email: info@mixonsoftwares.co.ke | contact@mixonsoftwares.co.ke',
      'Phone / Sales & Support Desk: +254 713 958 492 | +254 741 733 878',
      'Office: Mihrab Building, 15th Floor, Ring Road Kilimani, Nairobi, Kenya',
    ],
    priority: '0.8',
    changefreq: 'monthly',
    schemaKind: 'contact',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  'demo-tracker': {
    id: 'demo-tracker',
    path: '/demo-tracker',
    title: 'Mixon Demo Tracker — Internal Schedule & Calendar Sync',
    description:
      'Internal dashboard for tracking scheduled Mixon product demos, CSV exports, and Google Calendar status.',
    h1: 'Booked Demos Tracker',
    eyebrow: 'Internal Demo Pipeline',
    summary:
      'Track scheduled demos, export schedules to CSV, update statuses, and download .ics invites.',
    keyFacts: [
      'Persistent demo booking tracking across platforms and services',
      '1-click .ics calendar import and Google Calendar API / webhook sync support',
    ],
    priority: '0.1',
    changefreq: 'monthly',
    schemaKind: 'contact',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Demo Tracker', path: '/demo-tracker' },
    ],
  },
};

export const ALL_ROUTES: RouteSeoData[] = [
  ROUTE_SEO.home,
  ROUTE_SEO.mirentals,
  ROUTE_SEO.mireserve,
  ROUTE_SEO.eventyetu,
  ROUTE_SEO.mipos,
  ROUTE_SEO.pricing,
  ROUTE_SEO.services,
  ROUTE_SEO['service-web'],
  ROUTE_SEO['service-app'],
  ROUTE_SEO['service-seo'],
  ROUTE_SEO['service-payments'],
  ROUTE_SEO['service-ecommerce'],
  ROUTE_SEO['service-ai'],
  ROUTE_SEO.about,
  ROUTE_SEO['book-demo'],
  ROUTE_SEO.contact,
];

function buildFaqSchema(faqs: FaqEntry[], pageUrl: string): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

function buildOfferObjects(tier: PricingTierData, siteUrl: string): Record<string, unknown> {
  if (tier.kesMonthly === null || tier.usdMonthly === null) {
    return {
      '@type': 'Offer',
      name: `${tier.name} Plan`,
      description: `${tier.tagline}. ${tier.highlight}.`,
      url: `${siteUrl}/pricing`,
      seller: { '@id': `${siteUrl}/#organization` },
    };
  }
  return {
    '@type': 'Offer',
    name: `${tier.name} Plan`,
    description: `${tier.tagline}. ${tier.highlight}.`,
    price: tier.kesMonthly,
    priceCurrency: 'KES',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: tier.kesMonthly,
        priceCurrency: 'KES',
        unitCode: 'MON',
      },
      {
        '@type': 'UnitPriceSpecification',
        price: tier.usdMonthly,
        priceCurrency: 'USD',
        unitCode: 'MON',
      },
    ],
    url: `${siteUrl}/pricing`,
    seller: { '@id': `${siteUrl}/#organization` },
  };
}

export function buildRouteJsonLd(pageId: PageId, rawSiteUrl?: string | null): Record<string, unknown> {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  const route = ROUTE_SEO[pageId] || ROUTE_SEO.home;
  const canonicalUrl = `${siteUrl}${route.path === '/' ? '/' : route.path}`;
  const orgId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;

  const organizationNode: Record<string, unknown> = {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': orgId,
    name: SITE_CONFIG.brandName,
    legalName: SITE_CONFIG.legalName,
    url: `${siteUrl}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}${SITE_CONFIG.logoPath}`,
    },
    image: `${siteUrl}${SITE_CONFIG.ogImagePath}`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phones[0],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phones[0],
        email: SITE_CONFIG.email,
        contactType: 'sales',
        areaServed: SITE_CONFIG.areaServed,
        availableLanguage: ['en', 'sw'],
      },
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phones[1],
        email: SITE_CONFIG.secondaryEmail,
        contactType: 'customer support',
        areaServed: SITE_CONFIG.areaServed,
        availableLanguage: ['en', 'sw'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    areaServed: SITE_CONFIG.areaServed.map((area) => ({ '@type': 'Place', name: area })),
    knowsAbout: [
      'Property Management Software',
      'Hospitality Channel Manager',
      'M-Pesa Daraja Integration',
      'Retail Point of Sale',
      'Event Ticketing Software',
      'USSD Application Development',
      'Answer Engine Optimization',
      'Generative Engine Optimization',
    ],
  };

  const websiteNode: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${siteUrl}/`,
    name: SITE_CONFIG.brandName,
    description: SITE_CONFIG.description,
    publisher: { '@id': orgId },
    inLanguage: 'en',
  };

  const webPageType =
    route.schemaKind === 'about'
      ? 'AboutPage'
      : route.schemaKind === 'contact'
        ? 'ContactPage'
        : route.schemaKind === 'services-hub'
          ? 'CollectionPage'
          : 'WebPage';

  const webPageNode: Record<string, unknown> = {
    '@type': webPageType,
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: route.title,
    description: route.description,
    isPartOf: { '@id': websiteId },
    about: { '@id': orgId },
    inLanguage: 'en',
  };

  const breadcrumbNode: Record<string, unknown> = {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: route.breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === '/' ? '/' : crumb.path}`,
    })),
  };

  const graph: Record<string, unknown>[] = [organizationNode, websiteNode, webPageNode, breadcrumbNode];

  if (route.schemaKind === 'home') {
    const productIds: PageId[] = ['mirentals', 'mireserve', 'eventyetu', 'mipos'];
    graph.push({
      '@type': 'ItemList',
      '@id': `${siteUrl}/#platforms`,
      name: 'Mixon Flagship Platforms',
      itemListElement: productIds.map((pid, idx) => {
        const prod = ROUTE_SEO[pid];
        return {
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: prod.eyebrow.split('·')[0].trim(),
            description: prod.description,
            url: `${siteUrl}${prod.path}`,
            applicationCategory: prod.applicationCategory || 'BusinessApplication',
            operatingSystem: 'Web, iOS, Android',
            provider: { '@id': orgId },
          },
        };
      }),
    });
  } else if (route.schemaKind === 'software') {
    const productName = route.eyebrow.split('·')[0].trim();
    const softwareId = `${canonicalUrl}#software`;
    webPageNode.mainEntity = { '@id': softwareId };
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': softwareId,
      name: productName,
      description: route.summary,
      url: canonicalUrl,
      applicationCategory: route.applicationCategory || 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      featureList: route.keyFacts,
      provider: { '@id': orgId },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'KES',
        lowPrice: 25000,
        highPrice: 250000,
        offerCount: 5,
        url: `${siteUrl}/pricing`,
      },
    });
  } else if (route.schemaKind === 'service' || route.schemaKind === 'services-hub') {
    const serviceId = `${canonicalUrl}#service`;
    webPageNode.mainEntity = { '@id': serviceId };
    graph.push({
      '@type': 'Service',
      '@id': serviceId,
      name: route.eyebrow.split('·')[0].trim(),
      serviceType: route.serviceType || route.title,
      description: route.summary,
      url: canonicalUrl,
      provider: { '@id': orgId },
      areaServed: SITE_CONFIG.areaServed,
      hasOfferCatalog:
        route.schemaKind === 'services-hub'
          ? {
              '@type': 'OfferCatalog',
              name: 'Mixon Digital Engineering Services',
              itemListElement: (
                [
                  'service-web',
                  'service-app',
                  'service-seo',
                  'service-payments',
                  'service-ecommerce',
                  'service-ai',
                ] as PageId[]
              ).map((sid) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: ROUTE_SEO[sid].serviceType || ROUTE_SEO[sid].eyebrow,
                  url: `${siteUrl}${ROUTE_SEO[sid].path}`,
                },
              })),
            }
          : undefined,
    });
  } else if (route.schemaKind === 'pricing') {
    const catalogId = `${canonicalUrl}#offer-catalog`;
    webPageNode.mainEntity = { '@id': catalogId };
    graph.push({
      '@type': 'OfferCatalog',
      '@id': catalogId,
      name: 'Mixon Software & Engineering Plans',
      itemListElement: PRICING_TIERS.map((tier) => buildOfferObjects(tier, siteUrl)),
    });
  }

  if (route.faqs && route.faqs.length > 0) {
    graph.push(buildFaqSchema(route.faqs, canonicalUrl));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildRobotsTxt(rawSiteUrl?: string | null): string {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  return [
    '# Robots & AI Crawler Policy for Mixon',
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /demo-tracker',
    '',
    '# Search & AI Answer Engines explicitly welcomed',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: Applebot',
    'Allow: /',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    `# AI Markdown Directory: ${siteUrl}/llms.txt`,
    `# Full AI Knowledge Base: ${siteUrl}/llms-full.txt`,
    '',
  ].join('\n');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSitemapXml(
  rawSiteUrl?: string | null,
  lastmod = new Date().toISOString().slice(0, 10),
): string {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  const urlEntries = ALL_ROUTES.map((route) => {
    const loc = `${siteUrl}${route.path === '/' ? '/' : route.path}`;
    return [
      '  <url>',
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      '  </url>',
    ].join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    '</urlset>',
    '',
  ].join('\n');
}

export function buildLlmsTxt(rawSiteUrl?: string | null): string {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  return `# Mixon

> ${SITE_CONFIG.description} Headquartered in Kilimani, Nairobi, Kenya, Mixon builds on the experience of Shiva Softwares Africa and integrates natively with Safaricom M-Pesa Daraja, card rails, and East African banking workflows.

- Canonical Site: ${siteUrl}/
- Full Documentation for AI Systems: ${siteUrl}/llms-full.txt
- XML Sitemap: ${siteUrl}/sitemap.xml
- Email: ${SITE_CONFIG.email} (${SITE_CONFIG.secondaryEmail})
- Phone: ${SITE_CONFIG.phones.join(' | ')}
- Address: ${SITE_CONFIG.address.streetAddress}, ${SITE_CONFIG.address.addressLocality}, ${SITE_CONFIG.address.countryName}

## Flagship Software Platforms

- [miRentals — Property Management & Rent Reconciliation](${siteUrl}/mirentals): Automates tenant ledgers, M-Pesa Daraja STK Push / Paybill matching in under 2 seconds, utility meter billing, and landlord reporting.
- [miReserve — Hospitality Channel Manager & Direct Booking](${siteUrl}/mireserve): Syncs Airbnb, Booking.com, Vrbo, and direct stays within 14ms to eliminate double bookings, plus self check-in smart locks and M-Pesa/card deposits.
- [Event Yetu — Event Ticketing & Offline Gate Access](${siteUrl}/eventyetu): Sub-120ms anti-screenshot QR gate scanning (1,200+ scans/hr/attendant), offline-first venue sync, tiered tickets, and M-Pesa settlement.
- [miPOS — Offline-First Retail POS & Warehouse Stock](${siteUrl}/mipos): Offline counter billing, ESC/POS thermal receipt & scanner support, split Cash/M-Pesa/card tenders, multi-branch stock transfers, and blind X/Z shift reports.

## Engineering & Growth Services

- [Services Directory](${siteUrl}/services): Overview of bespoke engineering, telco USSD, payment integration, commerce, SEO/AEO/GEO, and AI automation.
- [Web Design & Development](${siteUrl}/services/web): Sub-1.2s Core Web Vitals sites, headless CMS, and React/Next.js web applications.
- [Mobile App Development & USSD](${siteUrl}/services/app): Offline-resilient iOS/Android apps and Safaricom/Airtel *384* telco USSD shortcodes requiring zero mobile data.
- [Search & Discovery (SEO, AEO & GEO)](${siteUrl}/services/seo): Technical SEO, structured Schema.org graphs, and citation architecture for Google, Perplexity, ChatGPT, and Gemini.
- [Payments & Integrations](${siteUrl}/services/payments): Idempotent Safaricom M-Pesa Daraja STK Push, C2B/B2C, Stripe, Pesapal, DPO, and ERP middleware.
- [Modern E-Commerce](${siteUrl}/services/ecommerce): Mobile-first checkouts synced in real time with physical store inventory via miPOS.
- [AI & Process Automation](${siteUrl}/services/ai): Zero-data-retention enterprise endpoints, approved-document retrieval, and human-in-the-loop workflow automation.

## Pricing & Company

- [Pricing & Plans (KES & USD)](${siteUrl}/pricing): Starter (KES 25,000 / \$200 mo), Growth (KES 40,500 / \$325 mo), Pro (KES 75,500 / \$600 mo), Scale (KES 145,000 / \$1,150 mo), Enterprise (KES 250,000 / \$2,000 mo), and Custom builds; 20% discount on annual plans.
- [About Mixon](${siteUrl}/about): Company background (building on Shiva Softwares Africa), engineering standards, TLS 1.3 / AES-256 / PCI-DSS security posture.
- [Book a Demo](${siteUrl}/book-demo): Step-by-step interactive live demo scheduler with product/service selection, calendar slots, and WhatsApp/Email confirmation.
- [Contact Mixon](${siteUrl}/contact): Request a software proposal or reach Nairobi engineering sales and support.
`;
}

export function buildLlmsFullTxt(rawSiteUrl?: string | null): string {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  const pricingSection = PRICING_TIERS.map((tier) => {
    const priceLabel =
      tier.kesMonthly !== null && tier.usdMonthly !== null
        ? `KES ${tier.kesMonthly.toLocaleString()}/mo (\$${tier.usdMonthly}/mo USD; 20% discount annually)`
        : 'Custom quote';
    return [
      `### ${tier.name} — ${priceLabel}`,
      `- Summary: ${tier.tagline}`,
      `- Key scope: ${tier.highlight}`,
      ...tier.features.map((f) => `- ${f}`),
    ].join('\n');
  }).join('\n\n');

  const routeSections = ALL_ROUTES.map((route) => {
    const url = `${siteUrl}${route.path === '/' ? '/' : route.path}`;
    const faqBlock =
      route.faqs && route.faqs.length > 0
        ? [
            '',
            '#### Frequently Asked Questions',
            ...route.faqs.map((faq) => `- **Q: ${faq.q}**\n  A: ${faq.a}`),
          ].join('\n')
        : '';

    return [
      `## ${route.eyebrow} (${url})`,
      `**Headline:** ${route.h1}`,
      '',
      route.summary,
      '',
      '### Key Facts & Specifications',
      ...route.keyFacts.map((fact) => `- ${fact}`),
      faqBlock,
    ].join('\n');
  }).join('\n\n---\n\n');

  return `# Mixon — Complete Platform & Service Reference

> ${SITE_CONFIG.description}

## Organization Profile
- **Brand:** ${SITE_CONFIG.brandName}
- **Legal / Heritage:** ${SITE_CONFIG.legalName} (${SITE_CONFIG.heritageNote})
- **Primary Website:** ${siteUrl}/
- **Headquarters:** ${SITE_CONFIG.address.streetAddress}, ${SITE_CONFIG.address.addressLocality}, ${SITE_CONFIG.address.countryName}
- **Service Regions:** ${SITE_CONFIG.areaServed.join(', ')} (plus global remote delivery)
- **Email:** ${SITE_CONFIG.email}, ${SITE_CONFIG.secondaryEmail}
- **Telephone:** ${SITE_CONFIG.phones.join(', ')}
- **Security & Compliance:** TLS 1.3 encryption in transit, AES-256 at rest, automated multi-region daily backups, PCI-DSS aligned payment flows, and 99.95% enterprise uptime SLA.

---

## Pricing Plans (KES & USD)

${pricingSection}

---

${routeSections}
`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function renderPrerenderedBody(pageId: PageId, rawSiteUrl?: string | null): string {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  const route = ROUTE_SEO[pageId] || ROUTE_SEO.home;

  const navLinksHtml = ALL_ROUTES.map(
    (item) =>
      `<li><a href="${escapeHtml(item.path)}">${escapeHtml(item.eyebrow.split('·')[0].trim())}</a></li>`,
  ).join('');

  const keyFactsHtml = route.keyFacts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('');

  const pricingTableHtml =
    route.id === 'pricing'
      ? `<section aria-label="Pricing tiers">
          <h2>Plans &amp; Monthly Rates</h2>
          <ul>
            ${PRICING_TIERS.map((t) => {
              const rate =
                t.kesMonthly !== null && t.usdMonthly !== null
                  ? `KES ${t.kesMonthly.toLocaleString()}/mo (USD ${t.usdMonthly}/mo)`
                  : 'Custom quote';
              return `<li><strong>${escapeHtml(t.name)}</strong> (${escapeHtml(rate)}): ${escapeHtml(t.tagline)} — ${escapeHtml(t.highlight)}. ${escapeHtml(t.features.join('; '))}</li>`;
            }).join('')}
          </ul>
        </section>`
      : '';

  const faqHtml =
    route.faqs && route.faqs.length > 0
      ? `<section aria-label="Frequently Asked Questions">
          <h2>Frequently Asked Questions</h2>
          <dl>
            ${route.faqs
              .map(
                (faq) =>
                  `<div><dt><h3>${escapeHtml(faq.q)}</h3></dt><dd><p>${escapeHtml(faq.a)}</p></dd></div>`,
              )
              .join('')}
          </dl>
        </section>`
      : '';

  return `<noscript>
<div class="mixon-ssr-fallback" style="font-family:system-ui,-apple-system,sans-serif;max-width:960px;margin:0 auto;padding:32px 20px;color:#0f172a;line-height:1.6;background:#ffffff;">
  <header style="border-bottom:1px solid #e2e8f0;padding-bottom:16px;margin-bottom:24px;">
    <a href="/" style="font-weight:700;font-size:20px;color:#093173;text-decoration:none;">Mixon</a>
    <nav aria-label="Primary Navigation">
      <ul style="display:flex;flex-wrap:wrap;gap:12px;list-style:none;padding:0;margin:12px 0 0;font-size:14px;">
        ${navLinksHtml}
      </ul>
    </nav>
  </header>
  <main>
    <article>
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#0066ff;font-weight:600;margin:0 0 8px;">${escapeHtml(route.eyebrow)}</p>
      <h1 style="font-size:32px;line-height:1.15;margin:0 0 16px;">${escapeHtml(route.h1)}</h1>
      <p style="font-size:18px;color:#334155;margin:0 0 24px;">${escapeHtml(route.summary)}</p>
      <section aria-label="Key capabilities and facts">
        <h2>Key Capabilities &amp; Verified Facts</h2>
        <ul>${keyFactsHtml}</ul>
      </section>
      ${pricingTableHtml}
      ${faqHtml}
    </article>
  </main>
  <footer style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:32px;font-size:14px;color:#475569;">
    <p><strong>${escapeHtml(SITE_CONFIG.legalName)}</strong> — ${escapeHtml(SITE_CONFIG.address.streetAddress)}, ${escapeHtml(SITE_CONFIG.address.addressLocality)}, ${escapeHtml(SITE_CONFIG.address.countryName)}.</p>
    <p>Email: <a href="mailto:${escapeHtml(SITE_CONFIG.email)}">${escapeHtml(SITE_CONFIG.email)}</a> · Tel: <a href="tel:${escapeHtml(SITE_CONFIG.phones[0])}">${escapeHtml(SITE_CONFIG.phones[0])}</a> · <a href="/llms.txt">llms.txt</a> · <a href="/sitemap.xml">Sitemap</a> · Canonical: ${escapeHtml(siteUrl)}${escapeHtml(route.path)}</p>
  </footer>
</div>
</noscript>`;
}

export function buildHeadSeoTags(
  pageId: PageId,
  rawSiteUrl?: string | null,
  options?: { isNotFound?: boolean },
): string {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  const route = ROUTE_SEO[pageId] || ROUTE_SEO.home;
  const canonicalUrl = `${siteUrl}${route.path === '/' ? '/' : route.path}`;
  const ogImageUrl = `${siteUrl}${SITE_CONFIG.ogImagePath}`;
  const robotsContent =
    pageId === 'demo-tracker'
      ? 'noindex, nofollow'
      : options?.isNotFound
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const jsonLd = buildRouteJsonLd(pageId, siteUrl);

  return [
    `<meta name="robots" content="${robotsContent}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<link rel="alternate" type="text/plain" title="Mixon AI Summary (llms.txt)" href="${escapeHtml(siteUrl)}/llms.txt" />`,
    `<link rel="alternate" type="text/plain" title="Mixon Full AI Reference (llms-full.txt)" href="${escapeHtml(siteUrl)}/llms-full.txt" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_CONFIG.brandName)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />`,
    `<meta property="og:image:alt" content="Mixon — ${escapeHtml(SITE_CONFIG.tagline)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />`,
    `<script id="mixon-route-jsonld" type="application/ld+json">${serializeJsonLd(jsonLd)}</script>`,
  ].join('\n    ');
}

export function injectRouteSeoHtml(
  templateHtml: string,
  rawPathname: string,
  rawSiteUrl?: string | null,
): { html: string; status: number; pageId: PageId } {
  const matchedPage = getPageFromPathname(rawPathname);
  const pageId: PageId = matchedPage || 'home';
  const isNotFound = matchedPage === null;
  const route = ROUTE_SEO[pageId];

  const headTags = buildHeadSeoTags(pageId, rawSiteUrl, { isNotFound });
  const ssrBody = renderPrerenderedBody(pageId, rawSiteUrl);

  let html = templateHtml.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(route.title)}</title>`,
  );

  if (/<meta\s+name="description"[^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${escapeHtml(route.description)}" />`,
    );
  } else {
    html = html.replace(
      '</head>',
      `  <meta name="description" content="${escapeHtml(route.description)}" />\n  </head>`,
    );
  }

  if (html.includes('<!--MIXON_SEO_HEAD-->')) {
    html = html.replace('<!--MIXON_SEO_HEAD-->', headTags);
  } else {
    html = html.replace('</head>', `    ${headTags}\n  </head>`);
  }

  if (html.includes('<!--MIXON_SSR_BODY-->')) {
    html = html.replace('<!--MIXON_SSR_BODY-->', ssrBody);
  } else {
    html = html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${ssrBody}`);
  }

  return {
    html,
    status: isNotFound ? 404 : 200,
    pageId,
  };
}
