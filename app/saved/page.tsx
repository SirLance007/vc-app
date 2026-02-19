"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SavedSearchesPage() {
    // Mock saved searches for MVP
    const savedSearches = [
        { id: 1, name: "Series B AI Companies in SF", query: "AI/ML, Series B, San Francisco" },
        { id: 2, name: "Crypto Startups Hiring", query: "Crypto, Hiring" },
        { id: 3, name: "SaaS under $10M ARR", query: "SaaS, <$10M ARR" },
    ];

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Saved Searches</h2>
                    <p className="text-muted-foreground">
                        Quickly access your frequent discovery criteria.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {savedSearches.map((search) => (
                    <Card key={search.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                {search.name}
                            </CardTitle>
                            <CardDescription>{search.query}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>Last run: 2 days ago</span>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/companies">
                                        Run <ArrowRight className="ml-2 h-3 w-3" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
