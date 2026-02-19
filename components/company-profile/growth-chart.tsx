"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { name: "Jan", visits: 2400, employees: 12 },
    { name: "Feb", visits: 1398, employees: 14 },
    { name: "Mar", visits: 9800, employees: 18 },
    { name: "Apr", visits: 3908, employees: 24 },
    { name: "May", visits: 4800, employees: 30 },
    { name: "Jun", visits: 3800, employees: 35 },
];

export function GrowthChart() {
    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle>Growth Signals</CardTitle>
                <CardDescription>Estimated web traffic and headcount growth over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                        />
                        <Line type="monotone" dataKey="visits" stroke="var(--primary)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="Web Visits" />
                        <Line type="monotone" dataKey="employees" stroke="var(--chart-2)" strokeWidth={2} dot={false} name="Headcount" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
