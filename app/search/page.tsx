"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
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
import {
    isPantryOpenNow,
    isPantryOpenOnDay,
    pantryHasFoodTypes,
    getPantryStatus,
} from "@/utils/pantry-filters";
import { AISidebar } from "@/components/pantry-finder/AISidebar";
import { Sparkles } from "@/components/pantry-finder/icons";
import { PantryDetailModal } from "@/components/pantry-finder/PantryDetailModal";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const initialAddress = searchParams.get("address") || "Boston, MA";
    const initialRadius = searchParams.get("radius") || "10";

    const [view, setView] = useState<"list" | "map">("list");
    const [hoveredPantryId, setHoveredPantryId] = useState<string | null>(null);
    const [selectedPantry, setSelectedPantry] = useState<PantryDocument | null>(null);
    const [searchState, setSearchState] = useState({
        address: initialAddress,
        radius: initialRadius,
    });

    const [filters, setFilters] = useState({
        openNow: false,
        openDay: "Any day",
        foodTypes: [] as string[],
    });

    const [rawPantries, setRawPantries] = useState<PantryDocument[]>([]);

    const filteredPantries = useMemo(() => {
        return rawPantries
            .filter((p) => {
                if (filters.openNow && !isPantryOpenNow(p)) return false;
                if (
                    filters.openDay !== "Any day" &&
                    !isPantryOpenOnDay(p, filters.openDay)
                )
                    return false;
                if (
                    filters.foodTypes.length > 0 &&
                    !pantryHasFoodTypes(p, filters.foodTypes)
                )
                    return false;
                return true;
            })
            .map((p) => ({
                ...p,
                status: getPantryStatus(p),
            }));
    }, [rawPantries, filters]);

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
            const results = await searchPantriesByAddress(
                searchState.address,
                parseInt(searchState.radius),
            );
            console.log("Fetched pantries:", results);

            setRawPantries(results || []);
        };

        fetchPantries();
    }, [searchState]);

    const handleUpdateSearch = useCallback(
        (address: string, radius: string) => {
            setSearchState({ address, radius });
        },
        [],
    );

    const handleUpdateFilters = useCallback((newFilters: any) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
        }));
    }, []);

    return (
        <>
            <Navbar />

            <div className="mt-16 flex h-[calc(100vh-64px)] flex-col bg-pantry-cream relative">
                <SearchTopBar
                    onViewChange={(view) => setView(view)}
                    initialAddress={searchState.address}
                    initialRadius={searchState.radius}
                    onSearch={(address, radius) =>
                        setSearchState({ address, radius })
                    }
                />

                <div className="flex flex-1 overflow-hidden">
                    <FilterSidebar filters={filters} onChange={setFilters} />

                    <div className="flex flex-1 flex-col overflow-hidden">
                        <div className="flex items-center gap-3 border-b border-pantry-stone bg-white px-6 py-3.5">
                            <span className="text-sm text-gray-500">
                                <span className="font-bold text-pantry-ink">
                                    {filteredPantries.length}
                                </span>{" "}
                                pantries found within{" "}
                                <span className="font-semibold text-pantry-dark">
                                    {searchState.radius} miles
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-pantry-dark">
                                    {searchState.address}
                                </span>
                                {filteredPantries.length <
                                    rawPantries.length && (
                                    <span className="ml-2 italic text-gray-400">
                                        (filtered from {rawPantries.length})
                                    </span>
                                )}
                            </span>
                        </div>

                        {view === "list" ? (
                            <div className="flex-1 overflow-y-auto">
                                <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {filteredPantries.map((p) => (
                                        <PantryCard
                                            key={p.id}
                                            pantry={p as any}
                                            onShowDetails={(pantry) => setSelectedPantry(pantry as any)}
                                        />
                                    ))}
                                </div>
                                {filteredPantries.length === 0 && (
                                    <div className="flex flex-col items-center justify-center p-20 text-center">
                                        <div className="mb-4 text-4xl text-gray-300">
                                            🔍
                                        </div>
                                        <h3 className="text-xl font-bold text-pantry-dark">
                                            No pantries found
                                        </h3>
                                        <p className="text-gray-500">
                                            Try adjusting your filters or search
                                            area.
                                        </p>
                                        <button
                                            onClick={() =>
                                                setFilters({
                                                    openNow: false,
                                                    openDay: "Any day",
                                                    foodTypes: [],
                                                })
                                            }
                                            className="mt-4 text-pantry-dark font-semibold hover:underline"
                                        >
                                            Reset all filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <ResizablePanelGroup className="flex-1">
                                <ResizablePanel defaultSize={70}>
                                    <div className="h-full w-full">
                                        <Map
                                            pantries={filteredPantries}
                                            onPantryHover={setHoveredPantryId}
                                            onShowDetails={setSelectedPantry}
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
                                            {filteredPantries.map((p) => (
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
                                                    <PantryCard
                                                        pantry={p as any}
                                                        onShowDetails={(pantry) => setSelectedPantry(pantry as any)}
                                                    />
                                                </div>
                                            ))}
                                            {filteredPantries.length === 0 && (
                                                <div className="p-10 text-center">
                                                    <p className="text-gray-500">
                                                        No results matching
                                                        filters.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        )}
                    </div>
                </div>

                {/* AI Toggle Button */}
                <button
                    onClick={() => setIsAISidebarOpen(true)}
                    className="fixed bottom-8 right-8 z-40 flex items-center gap-2 rounded-full bg-pantry-dark px-6 py-4 text-white shadow-xl transition-transform hover:scale-105 hover:bg-pantry-medium"
                >
                    <Sparkles size={20} className="text-pantry-bright" />
                    <span className="font-bold">Ask Assistant</span>
                </button>

                <AISidebar
                    isOpen={isAISidebarOpen}
                    onClose={() => setIsAISidebarOpen(false)}
                    pantryData={rawPantries}
                    onUpdateSearch={handleUpdateSearch}
                    onUpdateFilters={handleUpdateFilters}
                />
            </div>

            {selectedPantry && (
                <PantryDetailModal 
                    pantry={selectedPantry} 
                    onClose={() => setSelectedPantry(null)} 
                />
            )}
        </>
    );
}
