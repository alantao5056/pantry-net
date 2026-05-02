"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/components/pantry-finder/FilterSidebar";
import { Navbar } from "@/components/pantry-finder/Navbar";
import { PantryCard } from "@/components/pantry-finder/PantryCard";
import { SearchTopBar } from "@/components/pantry-finder/SearchTopBar";
import { SlidersHorizontal } from "@/components/pantry-finder/icons";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/tailgrids/core/resizable";
import Map from "@/components/map";
import { PantryDocument } from "@/firebase/models/Pantry";
import { searchPantriesByAddress, fetchPantryById } from "@/firebase/services";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const initialAddress = searchParams.get("address") || "Boston, MA";
    const initialRadius = searchParams.get("radius") || "10";

    const [view, setView] = useState<"list" | "map">("list");
    const [hoveredPantryId, setHoveredPantryId] = useState<string | null>(null);
    const [searchState, setSearchState] = useState({
        address: initialAddress,
        radius: initialRadius,
    });

    const [PANTRIES, setPantries] = useState<PantryDocument>([]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Map to store refs for each pantry card to enable scrolling to them
    const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        if (
            hoveredPantryId &&
            cardRefs.current[hoveredPantryId] &&
            view === "map"
        ) {
            cardRefs.current[hoveredPantryId]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [hoveredPantryId, view]);

    useEffect(() => {
        const fetchPantries = async () => {
            const results = await searchPantriesByAddress("Boston, MA", 10);
            console.log("Search results:", results);
            console.log("Search state:", searchState);
            console.log(await fetchPantryById("00qAO6txTSHy3fvIoREf"));

            //setPantries(results);
        };

        fetchPantries();
    }, [searchState]);

    return (
        <>
            <Navbar />

            <div className="mt-16 flex h-[calc(100vh-64px)] flex-col bg-pantry-cream">
                <SearchTopBar
                    onViewChange={(view) => setView(view)}
                    initialAddress={searchState.address}
                    initialRadius={searchState.radius}
                    onSearch={(address, radius) =>
                        setSearchState({ address, radius })
                    }
                />

                <div className="flex flex-1 overflow-hidden">
                    <FilterSidebar />

                    <div className="flex flex-1 flex-col overflow-hidden">
                        <div className="flex items-center gap-3 border-b border-pantry-stone bg-white px-6 py-3.5">
                            <button
                                type="button"
                                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-gray-700"
                            >
                                <SlidersHorizontal size={14} /> Hide Filters
                            </button>
                            <span className="text-sm text-gray-500">
                                <span className="font-bold text-pantry-ink">
                                    {PANTRIES.length}
                                </span>{" "}
                                pantries found within{" "}
                                <span className="font-semibold text-pantry-dark">
                                    {searchState.radius} miles
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-pantry-dark">
                                    {searchState.address}
                                </span>
                            </span>
                        </div>

                        {view === "list" ? (
                            <div className="flex-1 overflow-y-auto">
                                <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {PANTRIES.map((p) => (
                                        <PantryCard key={p.id} pantry={p} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <ResizablePanelGroup className="flex-1">
                                <ResizablePanel defaultSize={70}>
                                    <div className="h-full w-full">
                                        <Map
                                            onPantryHover={setHoveredPantryId}
                                            hoveredPantryId={hoveredPantryId}
                                        />
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle />
                                <ResizablePanel defaultSize={30} minSize={20}>
                                    <div
                                        ref={scrollContainerRef}
                                        className="h-full overflow-y-auto bg-pantry-cream p-4"
                                    >
                                        <div className="flex flex-col gap-4">
                                            {PANTRIES.map((p) => (
                                                <div
                                                    key={p.id}
                                                    ref={(el) => {
                                                        cardRefs.current[p.id] =
                                                            el;
                                                    }}
                                                    onMouseEnter={() =>
                                                        setHoveredPantryId(p.id)
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredPantryId(null)
                                                    }
                                                    className={`transition-all duration-200 ${
                                                        hoveredPantryId === p.id
                                                            ? "ring-2 ring-pantry-dark scale-[1.02] shadow-lg"
                                                            : ""
                                                    }`}
                                                >
                                                    <PantryCard pantry={p} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
