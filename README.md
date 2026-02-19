# VC Intelligence Interface

A powerful, modern dashboard for Venture Capitalists to discover, track, and analyze startup companies. This application combines structured mock data with real-time web scraping to provide a comprehensive view of potential investments.

## 🚀 Overview

The VC Intelligence Interface acts as a central hub for investment analysis. It features a polished, responsive UI designed for quick data consumption and deep-dive research.

### Key Features
- **Company Discovery**: A searchable, filterable dashboard of trending startups.
- **Deep-Dive Profiles**: Detailed views for each company including growth metrics, financials, and team info.
- **Live Data Enrichment**: On-demand web scraping to fetch the latest signals directly from company websites.
- **AI Analyst Simulation**: Instant "thesis generation" based on company data.

---

## 📊 Data Sources Explained

This application uses a hybrid approach to data, combining static mock data with real-time live data:

### 1. Dummy / Mock Data (The Foundation)
The core database of companies, including their initial descriptions, industry tags, growth charts, and financial projections, is **simulated**.
- **Location**: `lib/data/mock-companies.ts`
- **Usage**: Used to populate the main "Companies" list and the initial "Overview" tab on profile pages.
- **Purpose**: To demonstrate the UI/UX flows without needing a persistent database or expensive API subscriptions for the demo.
- **AI Analysis**: The "AI Investment Analyst" and "Growth Charts" generate deterministic simulated results based on the company name to mimic advanced analytics.

### 2. Real Data / Live Enrichment (The Magic)
When you click the **"Enrich Data"** button on a company profile, the app performs real-time data fetching.
- **Location**: `app/api/enrich/route.ts` & `app/companies/[id]/page.tsx`
- **Mechanism**: A server-side API route uses **Cheerio** to visit the company's public URL in real-time.
- **What is Fetched**:
  - **Live Meta Tags**: Current title, description, and keywords from the website.
  - **Signals**: Detects "Hiring", "Pricing Pages", or "Twitter/X Presence" by analyzing page content.
  - **Founders**: Attempts to scrape founder names and roles using regex patterns on "About/Team" pages.
  - **Funding**: Scans for patterns like "$XX Million" to detect funding announcements.
- **Note**: If a site blocks the scraper, the app handles it gracefully (or falls back to specific hardcoded demos for generic sites like Vercel/Linear for showcase purposes).

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Scraping**: [Cheerio](https://cheerio.js.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 💻 Getting Started

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repo-url>
   cd vc-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open the App**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🧭 How to Use

1. **Browse Companies**: Use the main dashboard to view the list of curated startups.
2. **View Profile**: Click on any company (e.g., "Vercel" or "Supabase") to see their detailed profile.
3. **Test Real Data**:
   - Go to the **"Overview"** tab.
   - Click the **"Enrich Data"** button (top right of the header).
   - Wait for the "Enrichment complete!" toast.
   - A new **"Live Signals"** tab will appear with fresh data scraped from the actual website.
