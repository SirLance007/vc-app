"use client";

import { Company } from "@/lib/data/mock-companies";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Bookmark, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CompanyHeaderProps {
    company: Company;
    onEnrich: () => void;
    isEnriching: boolean;
}

export function CompanyHeader({ company, onEnrich, isEnriching }: CompanyHeaderProps) {
    // Use local storage to persist saved companies
    const [savedIds, setSavedIds] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("saved-companies");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const isSaved = savedIds.includes(company.id);

    const handleSave = () => {
        let newSavedIds;
        if (isSaved) {
            newSavedIds = savedIds.filter((id) => id !== company.id);
            toast.success("Removed from saved items");
        } else {
            newSavedIds = [...savedIds, company.id];
            toast.success("Added to saved items");
        }
        setSavedIds(newSavedIds);
        localStorage.setItem("saved-companies", JSON.stringify(newSavedIds));
    };

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
                    <Badge variant="outline" className="text-sm font-normal">
                        {company.industry}
                    </Badge>
                </div>
                <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-sm"
                >
                    {new URL(company.url).hostname}
                    <ExternalLink className="h-3 w-3" />
                </a>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handleSave}>
                    <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                    {isSaved ? "Saved" : "Save"}
                </Button>
                <Button onClick={onEnrich} disabled={isEnriching}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isEnriching ? "Enriching..." : "Enrich Data"}
                </Button>
            </div>
        </div>
    );
}
