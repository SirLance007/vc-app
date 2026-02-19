"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Deterministic data generation based on company name
const getCompanyData = (name: string) => {
    const seed = name.length;
    return [
        { subject: 'Team', A: 80 + (seed % 20), B: 75, fullMark: 100 },
        { subject: 'Product', A: 70 + ((seed * 2) % 30), B: 70, fullMark: 100 },
        { subject: 'Traction', A: 60 + ((seed * 3) % 40), B: 65, fullMark: 100 },
        { subject: 'Market', A: 85 + ((seed * 4) % 15), B: 80, fullMark: 100 },
        { subject: 'Moat', A: 65 + ((seed * 5) % 35), B: 60, fullMark: 100 },
    ];
};

interface MarketRadarProps {
    companyName: string;
}

export function MarketRadar({ companyName }: MarketRadarProps) {
    const data = getCompanyData(companyName);

    return (
        <Card className="glass-panel">
            <CardHeader className="items-center pb-4">
                <CardTitle>Market Comparison</CardTitle>
                <CardDescription>
                    Performance vs Industry Average
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                            <PolarGrid stroke="var(--border)" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                            />
                            <Radar
                                name={companyName}
                                dataKey="A"
                                stroke="var(--primary)"
                                fill="var(--primary)"
                                fillOpacity={0.3}
                            />
                            <Radar
                                name="Industry Avg"
                                dataKey="B"
                                stroke="var(--muted-foreground)"
                                fill="var(--muted)"
                                fillOpacity={0.1}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--background)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    color: 'var(--foreground)'
                                }}
                                itemStyle={{ color: 'var(--foreground)' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
