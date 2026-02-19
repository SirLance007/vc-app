"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCompanies } from "@/lib/data/mock-companies";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SimilarCompaniesProps {
    currentCompanyId: string;
    industry: string;
}

export function SimilarCompanies({ currentCompanyId, industry }: SimilarCompaniesProps) {
    // Basic recommendation logic: same industry, excluding current
    const similar = mockCompanies
        .filter(c => c.industry === industry && c.id !== currentCompanyId)
        .slice(0, 3);

    if (similar.length === 0) return null;

    return (
        <Card className="glass-panel">
            <CardHeader>
                <CardTitle>Similar Companies</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {similar.map(company => (
                    <Link key={company.id} href={`/companies/${company.id}`} className="group block">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-transparent bg-white/5 hover:bg-white/10 hover:border-primary/20 transition-all duration-200">
                            <div className="flex flex-col gap-1">
                                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{company.name}</h4>
                                <span className="text-xs text-muted-foreground">{company.industry} • {company.location}</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
}
