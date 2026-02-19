import { mockCompanies } from "@/lib/data/mock-companies";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function CompaniesPage() {
    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
                    <p className="text-muted-foreground">
                        Discover and track promising startups.
                    </p>
                </div>
            </div>
            <DataTable columns={columns} data={mockCompanies} />
        </div>
    );
}
