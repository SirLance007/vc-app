"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, List, Bookmark, Settings, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
    { label: "Companies", href: "/companies", icon: Building2 },
    { label: "Lists", href: "/lists", icon: List },
    { label: "Saved", href: "/saved", icon: Bookmark },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="glass-panel w-64 border-r hidden md:block h-[calc(100vh-2rem)] sticky top-4 ml-4 rounded-xl my-4">
            <div className="flex h-14 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
                    <Search className="h-5 w-5 text-primary" />
                    <span>VC Scout</span>
                </Link>
            </div>
            <div className="flex flex-col gap-2 p-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Button
                            key={item.href}
                            variant="ghost"
                            className={cn(
                                "justify-start gap-3 transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary font-medium shadow-sm hover:bg-primary/15"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                            asChild
                        >
                            <Link href={item.href}>
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        </Button>
                    );
                })}
            </div>

        </aside>
    );
}
