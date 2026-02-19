"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Company } from "@/lib/data/mock-companies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ExternalLink, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Company>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="flex flex-col">
                    <Link
                        href={`/companies/${row.original.id}`}
                        className="font-medium hover:underline text-primary"
                    >
                        {row.getValue("name")}
                    </Link>
                    <a
                        href={row.original.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground"
                    >
                        {new URL(row.original.url).hostname}
                        <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            );
        },
    },
    {
        accessorKey: "matchScore",
        header: "Smart Match",
        cell: ({ row }) => {
            // Mocking a match score (Deterministic to avoid hydration mismatch)
            // Using name length + id char code as a simple seed
            const name = row.getValue("name") as string;
            const seed = name.length + (row.original.id.charCodeAt(0) || 0);
            const score = 70 + (seed % 30); // Score between 70 and 99

            let colorClass = "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
            if (score < 80) colorClass = "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";

            return (
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colorClass}`}>
                        {score}%
                    </span>
                    <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-current opacity-70 rounded-full"
                            style={{ width: `${score}%`, color: score >= 80 ? 'var(--green-500)' : 'var(--yellow-500)' }}
                        />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "industry",
        header: "Industry",
        cell: ({ row }) => <Badge variant="secondary">{row.getValue("industry")}</Badge>,
    },
    {
        accessorKey: "stage",
        header: "Stage",
        cell: ({ row }) => <span className="text-sm font-medium">{row.getValue("stage")}</span>,
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("location")}</span>,
    },
    {
        accessorKey: "signals",
        header: "Signals",
        cell: ({ row }) => {
            const signals = row.getValue("signals") as string[];
            return (
                <div className="flex flex-wrap gap-1">
                    {signals.slice(0, 2).map((signal) => (
                        <Badge key={signal} variant="outline" className="text-[10px] px-1 py-0 h-5">
                            {signal}
                        </Badge>
                    ))}
                    {signals.length > 2 && (
                        <Badge variant="outline" className="text-[10px] px-1 py-0 h-5">
                            +{signals.length - 2}
                        </Badge>
                    )}
                </div>
            );
        },
    },
];
