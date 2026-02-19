import { Company } from "@/lib/data/mock-companies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Info } from "lucide-react";

interface CompanyOverviewProps {
    company: Company;
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                        {company.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Stage:</span>
                            <span>{company.stage}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Location:</span>
                            <span>{company.location}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Signals</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        {company.signals.map((signal) => (
                            <Badge key={signal} variant="secondary" className="w-fit">
                                {signal}
                            </Badge>
                        ))}
                        {company.signals.length === 0 && (
                            <span className="text-sm text-muted-foreground italic">
                                No signals detected yet.
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
