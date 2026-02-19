"use client";

import { mockCompanies } from "@/lib/data/mock-companies";
import { CompanyHeader } from "@/components/company-profile/header";
import { CompanyOverview } from "@/components/company-profile/overview";
import { CompanyNotes } from "@/components/company-profile/notes";
import { GrowthChart } from "@/components/company-profile/growth-chart";
import { SimilarCompanies } from "@/components/company-profile/similar-companies";
import { AIAnalyst } from "@/components/company-profile/ai-analyst";
import { MarketRadar } from "@/components/company-profile/market-radar";
import { Founders } from "@/components/company-profile/founders";
import { FundingHistory } from "@/components/company-profile/funding-history";
import { FinancialsChart } from "@/components/company-profile/financials-chart";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, use } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Globe, Calendar, Sparkles } from "lucide-react";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

// Since this is a client component for state, we can't use generateStaticParams efficiently here 
// without major architectural changes (e.g., fetching data in layout or parent SC). 
// For now, we'll keep it as Client Component but remove generateStaticParams export 
// or move the data fetching logic to a Server Component wrapper. 
// Given the deadline, I'll convert this to a pure client component handling internal logic.
// Accessing Params directly in client component is okay in Next.js 13/14 via props if page is client.

export default function CompanyProfilePage({ params }: PageProps) {
    const { id } = use(params);
    const company = mockCompanies.find((c) => c.id === id);
    const [isEnriching, setIsEnriching] = useState(false);
    const [enrichmentData, setEnrichmentData] = useState<any>(null);

    if (!company) {
        notFound();
    }

    const handleEnrich = async () => {
        setIsEnriching(true);
        toast.info("Connecting to live data source...");

        try {
            const response = await fetch("/api/enrich", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: company.url }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Enrichment failed: ${response.status} ${response.statusText}`, errorText);
                throw new Error(errorText || `Failed to fetch data: ${response.status}`);
            }

            const data = await response.json();
            setEnrichmentData(data);
            toast.success("Enrichment complete! Live signals acquired.");
        } catch (error) {
            toast.error("Enrichment failed. Please check the URL or try again.");
            console.error(error);
        } finally {
            setIsEnriching(false);
        }
    };

    return (
        <div className="container mx-auto py-6 space-y-8 max-w-5xl">
            <CompanyHeader company={company} onEnrich={handleEnrich} isEnriching={isEnriching} />

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="signals">Live Signals {enrichmentData && <Badge variant="default" className="ml-2 text-[10px] h-4">New</Badge>}</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <CompanyOverview company={company} />
                </TabsContent>
                <TabsContent value="signals">
                    {!enrichmentData ? (
                        <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-muted/20 text-center">
                            <Globe className="h-10 w-10 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No Live Data Yet</h3>
                            <p className="text-muted-foreground mb-4 max-w-sm">
                                Click the "Enrich Data" button above to fetch real-time signals from the company's website.
                            </p>
                            <Badge variant="outline">Server-side Scraper Ready</Badge>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-green-500" />
                                        Live Enrichment Results
                                    </CardTitle>
                                    <CardDescription>
                                        Fetched from {enrichmentData.source} at {new Date(enrichmentData.extractedAt).toLocaleTimeString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Meta Title</h4>
                                        <p className="text-lg font-medium">{enrichmentData.title}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Meta Description</h4>
                                        <p className="text-muted-foreground leading-relaxed">{enrichmentData.description}</p>
                                    </div>
                                    {enrichmentData.keywords && enrichmentData.keywords.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">Keywords</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {enrichmentData.keywords.map((k: string, i: number) => (
                                                    <Badge key={i} variant="secondary">{k}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Derived Signals</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-2">
                                        {enrichmentData.derivedSignals?.map((signal: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20">
                                                <Sparkles className="h-4 w-4" />
                                                <span className="text-sm font-medium">{signal}</span>
                                            </div>
                                        ))}
                                        {(!enrichmentData.derivedSignals || enrichmentData.derivedSignals.length === 0) && (
                                            <p className="text-sm text-muted-foreground">No specific signals detected from homepage text.</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Source Metadata</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                        <span className="text-muted-foreground">Status</span>
                                        <span className="font-mono text-green-600">200 OK</span>

                                        <span className="text-muted-foreground">Method</span>
                                        <span className="font-mono">Server-side Cheerio</span>

                                        <span className="text-muted-foreground">Timestamp</span>
                                        <span className="font-mono">{new Date(enrichmentData.extractedAt).toISOString().split('T')[0]}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="notes">
                    <div className="md:w-2/3">
                        <CompanyNotes companyId={company.id} />
                    </div>
                </TabsContent>
            </Tabs>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <AIAnalyst companyName={company.name} industry={company.industry} />
                    <FinancialsChart companyName={company.name} />
                    <GrowthChart />
                </div>
                <div className="space-y-6">
                    <MarketRadar companyName={company.name} />
                    <FundingHistory companyName={company.name} liveData={enrichmentData?.fundingInfo} />
                    <Founders companyName={company.name} liveData={enrichmentData?.founders} />
                    <SimilarCompanies currentCompanyId={company.id} industry={company.industry} />
                </div>
            </div>
        </div>
    );
}
