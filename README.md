# Mixon

**Software, run by intelligence.**

Mixon builds operational software platforms and custom digital systems tailored for property management, hospitality, retail point-of-sale, and live event ticketing—engineered with Safaricom M-Pesa Daraja reconciliation, offline-first resilience, and human-in-the-loop automation. Headquartered in Kilimani, Nairobi, Kenya, Mixon builds on the experience of Shiva Softwares Africa.

---

## Core Platforms

| Platform | Focus | Route |
| :--- | :--- | :--- |
| **miRentals** | Property operations, automated rent ledgers, utility metering, and M-Pesa Paybill/STK Push matching | `/mirentals` |
| **miReserve** | Multi-channel hospitality sync (Airbnb, Booking.com, Vrbo), direct stays checkout, smart locks, and housekeeping | `/mireserve` |
| **Event Yetu** | Tiered event ticketing, cryptographic anti-duplication QR passes, and sub-120ms offline gate scanning | `/eventyetu` |
| **miPOS** | Offline-first retail POS, split Cash/M-Pesa/card tenders, ESC/POS thermal receipt hardware, and branch inventory | `/mipos` |

## Engineering & Growth Services

* **Services Directory** (`/services`)
  * **Web Design & Development** (`/services/web`)
  * **Mobile App & USSD Development** (`/services/app`)
  * **Search & Discovery — Technical SEO, AEO & GEO** (`/services/seo`)
  * **Payments & API Integrations** (`/services/payments`)
  * **Modern E-Commerce** (`/services/ecommerce`)
  * **AI & Process Automation** (`/services/ai`)
* **Company Pages:** `/` (Home), `/about`, `/pricing`, `/contact`

---

## Tech Stack

* **Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion (`motion/react`), GSAP (`ScrollTrigger`, `SplitText`), Lenis smooth scrolling, OGL (WebGL backgrounds), Lucide React
* **Server & APIs:** Node.js + Express (`server.ts`), Google GenAI SDK (`@google/genai`), `esbuild` production server bundle
* **SEO, AEO & GEO:** Single-source metadata/Schema.org catalog ([`src/seo/mixonSeo.ts`](src/seo/mixonSeo.ts)), per-route `JSON-LD` (`Organization`, `LocalBusiness`, `SoftwareApplication`, `Service`, `OfferCatalog`, `FAQPage`, `BreadcrumbList`), [`scripts/generate-seo-assets.ts`](scripts/generate-seo-assets.ts), and server-side/static HTML prerendering

---

## Local Development

### Prerequisites

* Node.js 20+ and npm

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (copy [`.env.example`](.env.example) to `.env` if needed):
   * `PORT` — server port (defaults to `3001`)
   * `GEMINI_API_KEY` — optional; enables live Gemini responses on `/api/gemini/simulate` (falls back to structured simulation mode when omitted)
   * `APP_URL` / `VITE_SITE_URL` — canonical site origin used in sitemaps, `llms.txt`, and structured metadata (defaults to `https://mixonsoftwares.co.ke`)

3. Start the full-stack development server (Express + Vite middleware on `http://localhost:3001`):
   ```bash
   npm run dev
   ```

### Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts `server.ts` with `tsx` + Vite dev middleware on port `3001` |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run seo:generate` | Generates `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, and `public/llms-full.txt` |
| `npm run build` | Generates SEO/AI assets, builds Vite bundle, prerenders all 15 static HTML routes into `dist/`, and bundles `dist/server.cjs` |
| `npm start` | Runs the production server (`node dist/server.cjs`) |
| `npm run clean` | Removes build output directories |

---

## Crawler, AI & API Endpoints

* **`GET /robots.txt`**, **`GET /sitemap.xml`**, **`GET /llms.txt`**, **`GET /llms-full.txt`** — Search engine and AI answer-engine discovery manifests
* **`GET /api/leads`** / **`POST /api/leads`** — Lead submission and CRM demo stream endpoints
* **`POST /api/gemini/simulate`** — Interactive product simulation endpoint supporting `mirentals`, `mireserve`, `eventyetu`, and `mipos`

---

## Contact

* **Location:** Mihrab Building, 15th Floor, Ring Road Kilimani, Nairobi, Kenya
* **Email:** `info@mixonsoftwares.co.ke` · `contact@mixonsoftwares.co.ke`
* **License:** Apache-2.0
