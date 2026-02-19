"use client";

import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface FinancialsChartProps {
    companyName: string;
}

// Deterministic data generation
const getFinancialData = (name: string) => {
    const seed = name.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    const baseRevenue = (seed % 50) + 10; // $10M - $60M base

    return [
        { year: '2020', revenue: baseRevenue, profit: baseRevenue * -0.5, valuation: baseRevenue * 10 },
        { year: '2021', revenue: baseRevenue * 1.5, profit: baseRevenue * -0.4, valuation: baseRevenue * 15 },
        { year: '2022', revenue: baseRevenue * 2.2, profit: baseRevenue * -0.2, valuation: baseRevenue * 20 },
        { year: '2023', revenue: baseRevenue * 3.5, profit: baseRevenue * 0.1, valuation: baseRevenue * 25 }, // Turned profitable
        { year: '2024', revenue: baseRevenue * 5.0, profit: baseRevenue * 0.8, valuation: baseRevenue * 40 },
    ].map(item => ({
        ...item,
        // Add some noise
        revenue: Math.round(item.revenue + (seed % 5)),
        profit: Math.round(item.profit),
        valuation: Math.round(item.valuation)
    }));
};

export function FinancialsChart({ companyName }: FinancialsChartProps) {
    const data = getFinancialData(companyName);
    const currentValuation = data[data.length - 1].valuation;
    const currentRevenue = data[data.length - 1].revenue;
    const isProfitable = data[data.length - 1].profit > 0;

    return (
        <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-xl">Financial Performance</CardTitle>
                    <CardDescription>Revenue vs. Net Profit (YoY)</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className="flex items-center gap-1 font-mono">
                        <DollarSign className="h-3 w-3" />
                        Valuation: ${currentValuation}M
                    </Badge>
                    <Badge
                        variant="secondary"
                        className={`flex items-center gap-1 font-mono ${isProfitable ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}
                    >
                        {isProfitable ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {isProfitable ? "Profitable" : "Cash Burn"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
                            <XAxis
                                dataKey="year"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                                tickFormatter={(value) => `$${value}M`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--background)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    color: 'var(--foreground)'
                                }}
                                formatter={(value: any) => [`$${value}M`, '']}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar
                                name="Revenue"
                                dataKey="revenue"
                                fill="url(#colorRevenue)"
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                            />
                            <Line
                                type="monotone"
                                name="Net Profit"
                                dataKey="profit"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ r: 4, strokeWidth: 2, fill: "var(--background)" }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                name="Valuation (Ref)"
                                dataKey="valuation"
                                stroke="#8b5cf6"
                                strokeDasharray="5 5"
                                strokeWidth={2}
                                dot={false}
                                hide={true} // Hidden in chart but useful for potential future use or tooltip
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
