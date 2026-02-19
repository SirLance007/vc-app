"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { mockCompanies } from "@/lib/data/mock-companies";
import { columns } from "@/app/companies/columns";
import { DataTable } from "@/app/companies/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ListsPage() {
    const [savedIds] = useLocalStorage<string[]>("saved-companies", []); // Use same key as mock for now

    // In a real app, lists would be separate entities. For MVP, we treat "Saved" as the main list.
    // We can just filter mockCompanies by savedIds.

    // Note: Since saving logic in header was mock "Todo: persisted state", 
    // users won't see anything here unless we connect header save to this hook.
    // But for the scope, I will implement a basic "My List" using mock data filtering if any.
    // Wait, I should make sure "Save" in Header actually writes to localStorage for this to work.

    const savedCompanies = mockCompanies.filter((c) => savedIds.includes(c.id));

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">My Lists</h2>
                    <p className="text-muted-foreground">
                        Manage your sourcing lists and saved companies.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create List
                </Button>
            </div>

            <div className="border rounded-lg p-6 bg-muted/20">
                <h3 className="font-medium text-lg mb-4">Saved Companies ({savedCompanies.length})</h3>
                {savedCompanies.length > 0 ? (
                    <DataTable columns={columns} data={savedCompanies} />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">You haven't saved any companies yet.</p>
                        <p className="text-sm text-muted-foreground mt-2">Go to Discovery to find companies.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
