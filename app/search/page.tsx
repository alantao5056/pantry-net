"use client";

import { FilterSidebar } from "@/components/pantry-finder/FilterSidebar";
import { Navbar } from "@/components/pantry-finder/Navbar";
import { PantryCard } from "@/components/pantry-finder/PantryCard";
import { SearchTopBar } from "@/components/pantry-finder/SearchTopBar";
import { PANTRIES } from "@/components/pantry-finder/data";
import { SlidersHorizontal } from "@/components/pantry-finder/icons";

export default function SearchPage() {
  return (
    <>
      <Navbar />

      <div className="mt-16 flex flex-col bg-pantry-cream">
        <SearchTopBar onViewChange={(view) => console.log(view)} />

        <div className="flex">
          <FilterSidebar />

          <div className="flex flex-1 flex-col">
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
                <span className="font-semibold text-pantry-dark">10 miles</span>
              </span>
            </div>

            
            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 xl:grid-cols-3">
              {PANTRIES.map((p) => (
                <PantryCard key={p.id} pantry={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
