"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, CalendarDays } from "lucide-react";

interface FundingHistoryProps {
    companyName: string;
    liveData?: any[];
}

// Mock data
const fundingData: Record<string, any[]> = {
    "Vercel": [
        { round: "Series D", amount: "$150M", date: "May 2024", lead: "Accel" },
        { round: "Series C", amount: "$102M", date: "Jun 2022", lead: "Bedrock" },
        { round: "Series B", amount: "$40M", date: "Dec 2020", lead: "GV" },
        { round: "Series A", amount: "$21M", date: "Apr 2020", lead: "Accel" }
    ],
    "Linear": [
        { round: "Series B", amount: "$35M", date: "Sep 2023", lead: "Accel" },
        { round: "Series A", amount: "$13M", date: "Dec 2020", lead: "Sequoia" },
        { round: "Seed", amount: "$4.2M", date: "Nov 2019", lead: "Index" }
    ]
};

const defaultFunding = [
    { round: "Seed", amount: "$2.5M", date: "Jan 2023", lead: "Y Combinator" },
    { round: "Pre-Seed", amount: "$500k", date: "Jun 2022", lead: "AngelList" }
];

export function FundingHistory({ companyName, liveData }: FundingHistoryProps) {
    const staticData = fundingData[companyName] || defaultFunding;
    const rounds = (liveData && liveData.length > 0) ? liveData : staticData;

    return (
        <Card className="glass-panel">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg">Funding History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative border-l border-primary/20 ml-2 space-y-6 pb-2">
                    {rounds.map((round, i) => (
                        <div key={i} className="ml-6 relative">
                            {/* Dot */}
                            <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary border-4 border-background" />

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-sm">{round.round}</span>
                                    <Badge variant="outline" className="font-mono text-xs">{round.amount}</Badge>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground gap-2">
                                    <CalendarDays className="h-3 w-3" />
                                    <span>{round.date}</span>
                                    <span>•</span>
                                    <span className="text-primary/80">Lead: {round.lead}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                    <span>Total Raised</span>
                    <span className="font-mono font-medium text-foreground">
                        {rounds.length > 2 ? "$100M+" : "$3M+"}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
