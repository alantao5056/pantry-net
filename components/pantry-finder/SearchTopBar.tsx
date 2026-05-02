"use client";

import { useState } from "react";
import { Button } from "@/components/tailgrids/core/button";
import { List, MapIcon, MapPin, Search } from "./icons";

export interface SearchTopBarProps {
    view?: "list" | "map";
    defaultView?: "list" | "map";
    onViewChange?: (view: "list" | "map") => void;
    initialAddress?: string;
    initialRadius?: string;
    onSearch?: (address: string, radius: string) => void;
}

export function SearchTopBar({
    view,
    defaultView = "list",
    onViewChange,
}: SearchTopBarProps) {
    const [internalView, setInternalView] = useState<"list" | "map">(
        defaultView,
    );
    const currentView = view ?? internalView;

    const handleViewChange = (nextView: "list" | "map") => {
        onViewChange?.(nextView);
        if (view === undefined) {
            setInternalView(nextView);
        }
    };

    return (
        <div className="border-b border-pantry-stone bg-white px-6 py-3">
            <div className="mx-auto flex max-w-[1200px] items-center gap-2.5">
                <label className="flex flex-1 items-center gap-2.5 rounded-lg border border-pantry-stone bg-pantry-cream px-3.5">
                    <MapPin size={16} className="text-pantry-bright" />
                    <input
                        defaultValue="Boston, MA"
                        placeholder="Address or city..."
                        className="flex-1 bg-transparent py-2.5 text-sm text-pantry-ink placeholder:text-gray-400 outline-none"
                    />
                </label>

                <select
                    defaultValue="10"
                    className="rounded-lg border border-pantry-stone bg-pantry-cream px-3.5 py-2.5 text-sm text-pantry-ink outline-none"
                >
                    {["2", "5", "10", "25", "50"].map((r) => (
                        <option key={r} value={r}>
                            {r} miles
                        </option>
                    ))}
                </select>

                <Button
                    size="sm"
                    className="bg-pantry-dark hover:bg-pantry-medium"
                >
                    <Search size={15} /> Search
                </Button>

                <span className="h-8 w-px bg-gray-200" />

                <button
                    type="button"
                    onClick={() => handleViewChange("list")}
                    className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[13px] font-medium ${
                        currentView === "list"
                            ? "border-pantry-dark bg-pantry-dark text-white"
                            : "border-gray-200 bg-white text-gray-500"
                    }`}
                >
                    <List size={15} /> List
                </button>
                <button
                    type="button"
                    onClick={() => handleViewChange("map")}
                    className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[13px] font-medium ${
                        currentView === "map"
                            ? "border-pantry-dark bg-pantry-dark text-white"
                            : "border-gray-200 bg-white text-gray-500"
                    }`}
                >
                    <MapIcon size={15} /> Map
                </button>
            </div>
        </div>
    );
}
