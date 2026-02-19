"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
    return (
        <header className="glass-panel sticky top-4 z-30 flex h-14 items-center gap-4 px-6 mx-4 rounded-xl mb-4">
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search companies, signals, or lists..."
                            className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
        </header>
    );
}
