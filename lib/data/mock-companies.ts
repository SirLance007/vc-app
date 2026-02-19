export interface Company {
  id: string;
  name: string;
  url: string;
  industry: string;
  stage: "Seed" | "Series A" | "Series B" | "Series C" | "Growth";
  location: string;
  description: string;
  signals: string[];
  liveData?: any; // To be populated by enrichment
}

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Vercel",
    url: "https://vercel.com",
    industry: "DevTools",
    stage: "Series B",
    location: "San Francisco, CA",
    description: "Develop. Preview. Ship. For the best frontend teams.",
    signals: ["Hiring Engineers", "Recent Series C", "Launched V0"],
  },
  {
    id: "2",
    name: "Supabase",
    url: "https://supabase.com",
    industry: "Database",
    stage: "Series B",
    location: "Singapore",
    description: "The Open Source Firebase Alternative.",
    signals: ["Y Combinator Alumni", "High GitHub Activity"],
  },
  {
    id: "3",
    name: "Linear",
    url: "https://linear.app",
    industry: "Productivity",
    stage: "Series A",
    location: "Remote",
    description: "The issue tracking tool you'll actually love using.",
    signals: ["Design-led", "Viral growth"],
  },
  {
    id: "4",
    name: "Resend",
    url: "https://resend.com",
    industry: "DevTools",
    stage: "Seed",
    location: "San Francisco, CA",
    description: "Email for developers.",
    signals: ["Y Combinator S23", "Rapid adoption"],
  },
  {
    id: "5",
    name: "Midjourney",
    url: "https://www.midjourney.com",
    industry: "AI/ML",
    stage: "Growth",
    location: "San Francisco, CA",
    description: "Expanding the imaginative powers of the human species.",
    signals: ["Bootstrapped", "Discord Community"],
  },
  {
    id: "6",
    name: "PostHog",
    url: "https://posthog.com",
    industry: "Analytics",
    stage: "Series B",
    location: "Cambridge, UK",
    description: "The open source Product OS.",
    signals: ["Open Source", "Transparency"],
  },
  {
    id: "7",
    name: "Hugging Face",
    url: "https://huggingface.co",
    industry: "AI/ML",
    stage: "Series C",
    location: "New York, NY",
    description: "The AI community building the future.",
    signals: ["Open Science", "Community driven"],
  },
  {
    id: "8",
    name: "Raycast",
    url: "https://www.raycast.com",
    industry: "Productivity",
    stage: "Series A",
    location: "London, UK",
    description: "A blazingly fast, extendable launcher.",
    signals: ["Product Hunt Maker of the Year", "Extension Ecosystem"],
  },
  {
    id: "9",
    name: "Perplexity",
    url: "https://www.perplexity.ai",
    industry: "Search",
    stage: "Series A",
    location: "San Francisco, CA",
    description: "Where knowledge begins.",
    signals: ["Jeff Bezos backed", "AI Search"],
  },
  {
    id: "10",
    name: "Mistral AI",
    url: "https://mistral.ai",
    industry: "AI/ML",
    stage: "Series A",
    location: "Paris, France",
    description: "Frontier AI in your hands.",
    signals: ["Open Source Models", "European Tech"],
  }
];
