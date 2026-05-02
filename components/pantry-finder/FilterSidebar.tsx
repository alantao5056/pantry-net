import { Toggle } from "@/components/tailgrids/core/toggle";
import { ALL_DAYS, ALL_FOOD_TYPES } from "./data";
import { Check, SlidersHorizontal } from "./icons";

export function FilterSidebar() {
  return (
    <aside className="w-[272px] shrink-0 border-r border-pantry-stone bg-white">
      <div className="h-full overflow-y-auto p-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-pantry-dark" />
            <span className="text-sm font-bold text-pantry-dark">Filters</span>
          </div>
        </div>

        <div className="mb-5 rounded-xl bg-pantry-cream px-4 py-3.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-pantry-ink">
              Open Right Now
            </span>
            <Toggle />
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2.5 block text-[13px] font-semibold text-gray-700">
            Open Day
          </label>
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              className="rounded-lg border border-pantry-dark bg-pantry-mint px-3 py-2 text-left text-[13px] font-semibold text-pantry-dark"
            >
              Any day
            </button>
            {ALL_DAYS.map((d, idx) => {
              const isActive = idx === 2;
              return (
                <button
                  key={d}
                  type="button"
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-[13px] ${
                    isActive
                      ? "border-pantry-dark bg-pantry-mint font-semibold text-pantry-dark"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {d}
                  {isActive && <Check size={14} className="text-pantry-dark" />}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2.5 block text-[13px] font-semibold text-gray-700">
            Food Type
          </label>
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              className="rounded-lg border border-pantry-dark bg-pantry-mint px-3 py-2 text-left text-[13px] text-pantry-dark"
            >
              All types
            </button>
            {ALL_FOOD_TYPES.map((f) => (
              <button
                key={f}
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-xs text-gray-700"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
