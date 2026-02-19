# VC Intelligence Interface + Live Enrichment

A premium VC discovery dashboard allowing users to browse startup data and enrich it with live web data using real-time scraping.

![VC App](https://via.placeholder.com/800x400?text=VC+Intelligence+Interface)

## Features

- **Discovery Engine**: Browse, filter, and sort companies by Industry, Stage, and Location.
- **Company Profiles**: Detailed views with overview, notes, and signals.
- **Live Enrichment**: Real-time server-side scraping of company websites to extract metadata (Title, Description, Keywords) and derive signals (e.g., "Hiring", "Pricing").
- **Lists & Persistence**: functional "Save" button to bookmark companies and saved searches (persisted to LocalStorage).
- **Responsive Design**: Mobile-friendly sidebar and layout.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Icons**: Lucide React
- **Scraping**: Cheerio (Server Actions/API)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd vc-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to [http://localhost:3000](http://localhost:3000).

## Enrichment API

The app includes a live enrichment API route at `/api/enrich`.
- **Method**: POST
- **Body**: `{ "url": "https://example.com" }`
- **Response**: JSON with title, description, keywords, and heuristic signals.

## Deployment

This app is ready to check deployed on Vercel.
1. Push to GitHub.
2. Import project in Vercel.
3. No environment variables required for the base version.

## Key Decisions
- **Mock Data**: Started with static mock data for speed, but architected to support real API easily.
- **Cheerio vs LLM**: Used Cheerio for the "Enrichment" to ensure reliability and speed without needing paid API keys for the demo.
- **Client-side State**: Used `useState` and `localStorage` for Lists to keep the app lightweight and serverless-ready.
