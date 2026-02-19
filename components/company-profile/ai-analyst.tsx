"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIAnalystProps {
    companyName: string;
    industry: string;
}

export function AIAnalyst({ companyName, industry }: AIAnalystProps) {
    const [isThinking, setIsThinking] = useState(false);
    const [analysis, setAnalysis] = useState<{
        thesis: string;
        risks: string;
        tam: string;
        exit: string;
        verdict: string;
    } | null>(null);

    const generateAnalysis = () => {
        setIsThinking(true);
        setAnalysis(null);

        // Simple deterministic random based on string
        const seed = companyName.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
        const getRandom = (offset: number, max: number) => (seed + offset) % max;

        const theses = [
            `${companyName} is positioned to capture significant market share in the ${industry} sector. Their product velocity indicates a strong engineering culture.`,
            `Disrupting the ${industry} landscape, ${companyName} shows exceptional retention metrics that suggest high switching costs for customers.`,
            `By vertically integrating properties of ${industry}, ${companyName} has built a defensive moat that competitors will find hard to cross.`,
            `${companyName}'s approach to ${industry} is contrarian but data-backed. Early signals suggest they are crossing the chasm to mainstream adoption.`
        ];

        const risksList = [
            "Competition is heating up from legacy incumbents. CAC may rise as they scale.",
            "Regulatory headwinds in the ${industry} space could slow down expansion plans in Q4.",
            "Heavy reliance on a single acquisition channel poses a systemic risk to long-term growth.",
            "Technological shifts in AI could commoditize their core value proposition within 18 months."
        ];

        const tams = [
            "$14.5B (growing at 12% CAGR)",
            "$8.2B (growing at 24% CAGR)",
            "$50B+ (Global Addressable Market)",
            "$2.1B (Niche but highly profitable)"
        ];

        const exits = [
            "Potential acquisition target for major cloud providers within 3-5 years.",
            "Strong IPO candidate if they maintain >80% growth YoY.",
            "likely consolidation target for private equity firms looking for cash-flow positive assets.",
            "Strategic merger opportunity with a legacy fintech player."
        ];

        const thesis = theses[getRandom(1, theses.length)];
        const risks = risksList[getRandom(2, risksList.length)].replace("${industry}", industry);
        const tam = tams[getRandom(3, tams.length)];
        const exit = exits[getRandom(4, exits.length)];
        const score = getRandom(5, 100);
        const verdict = score > 60 ? "Strong Buy" : score > 30 ? "Due Diligence" : "Watchlist";

        // Simulate AI thinking and streaming
        setTimeout(() => {
            setIsThinking(false);
            setAnalysis({
                thesis,
                risks,
                tam,
                exit,
                verdict
            });
        }, 2000);
    };

    return (
        <Card className="glass-panel border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Brain className="w-24 h-24 text-primary" />
            </div>

            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Investment Analyst
                </CardTitle>
                <CardDescription>
                    Generate an instant investment thesis based on real-time signals.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!analysis && !isThinking && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <Button onClick={generateAnalysis} size="lg" className="gap-2 relative overflow-hidden group">
                            <span className="relative z-10 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Generate Report
                            </span>
                            <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors" />
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">
                            Powered by VC-GPT-4o
                        </p>
                    </div>
                )}

                {isThinking && (
                    <div className="flex flex-col items-center justify-center py-8 gap-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <Brain className="w-12 h-12 text-primary" />
                        </motion.div>
                        <p className="text-sm font-medium animate-pulse">Analyzing market signals...</p>
                    </div>
                )}

                <AnimatePresence>
                    {analysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                                    <h4 className="text-xs font-semibold uppercase text-primary mb-1">Market (TAM)</h4>
                                    <p className="text-sm font-medium">{analysis.tam}</p>
                                </div>
                                <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                                    <h4 className="text-xs font-semibold uppercase text-primary mb-1">Exit Strategy</h4>
                                    <p className="text-sm font-medium">{analysis.exit}</p>
                                </div>
                            </div>

                            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                <h4 className="flex items-center gap-2 font-semibold text-primary mb-2">
                                    <CheckCircle2 className="w-4 h-4" /> Investment Thesis
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {analysis.thesis}
                                </p>
                            </div>

                            <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/10">
                                <h4 className="flex items-center gap-2 font-semibold text-destructive mb-2">
                                    <AlertTriangle className="w-4 h-4" /> Key Risks
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {analysis.risks}
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">AI Verdict:</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${analysis.verdict === "Strong Buy"
                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                    }`}>
                                    {analysis.verdict}
                                </span>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={generateAnalysis}
                                className="w-full mt-4 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all shadow-sm"
                            >
                                <Sparkles className="w-3 h-3 mr-2" />
                                Regenerate Analysis
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
