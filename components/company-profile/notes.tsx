"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CompanyNotesProps {
    companyId: string;
}

export function CompanyNotes({ companyId }: CompanyNotesProps) {
    const [note, setNote] = useState("");

    useEffect(() => {
        // Load from local storage
        const savedNotes = localStorage.getItem(`notes-${companyId}`);
        if (savedNotes) {
            setNote(savedNotes);
        }
    }, [companyId]);

    const handleSave = () => {
        localStorage.setItem(`notes-${companyId}`, note);
        toast.success("Notes saved successfully");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea
                    placeholder="Add private notes about this company..."
                    className="min-h-[150px]"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex justify-end">
                    <Button onClick={handleSave} size="sm">Save Note</Button>
                </div>
            </CardContent>
        </Card>
    );
}
