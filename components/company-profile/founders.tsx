"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter } from "lucide-react";

interface FoundersProps {
    companyName: string;
    liveData?: any[];
}

// Mock data map
const foundersData: Record<string, any[]> = {
    "Vercel": [
        { name: "Guillermo Rauch", role: "CEO", image: "https://github.com/rauchg.png", ex: "Next.js Creator" },
        { name: "Tony Kovanen", role: "CTO", image: "", ex: "ex-Google" }
    ],
    "Linear": [
        { name: "Karri Saarinen", role: "CEO", image: "https://github.com/karri.png", ex: "ex-Airbnb" },
        { name: "Jori Lallo", role: "Co-founder", image: "https://github.com/jori.png", ex: "ex-Coinbase" }
    ],
    "Supabase": [
        { name: "Paul Copplestone", role: "CEO", image: "https://github.com/kiwicopple.png", ex: "YC Alum" },
        { name: "Ant Wilson", role: "CTO", image: "https://github.com/awalias.png", ex: "YC Alum" }
    ]
};

const defaultFounders = [
    { name: "John Doe", role: "CEO", image: "", ex: "Serial Entrepreneur" },
    { name: "Jane Smith", role: "CTO", image: "", ex: "ex-Stripe" }
];

export function Founders({ companyName, liveData }: FoundersProps) {
    // definedFounders -> data from map, or default
    // We favor liveData if available and not empty
    const staticData = foundersData[companyName] || defaultFounders;
    const founders = (liveData && liveData.length > 0) ? liveData : staticData;

    return (
        <Card className="glass-panel">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg">Founding Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {founders.map((founder, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                        <Avatar className="h-10 w-10 border border-primary/20">
                            <AvatarImage src={founder.image} />
                            <AvatarFallback>{founder.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                                {founder.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {founder.role}
                            </p>
                        </div>
                        {founder.ex && (
                            <Badge variant="secondary" className="text-[10px] h-5 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                                {founder.ex}
                            </Badge>
                        )}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Linkedin className="h-3 w-3 text-muted-foreground hover:text-[#0077b5] cursor-pointer" />
                            <Twitter className="h-3 w-3 text-muted-foreground hover:text-[#1DA1F2] cursor-pointer" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
