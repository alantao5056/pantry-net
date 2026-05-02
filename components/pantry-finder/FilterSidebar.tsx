import { Toggle } from "@/components/tailgrids/core/toggle";
import { ALL_DAYS, ALL_FOOD_TYPES } from "./data";
import { Check, SlidersHorizontal } from "./icons";

interface FilterSidebarProps {
  filters: {
    openNow: boolean;
    openDay: string;
    foodTypes: string[];
  };
  onChange: (filters: {
    openNow: boolean;
    openDay: string;
    foodTypes: string[];
  }) => void;
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const toggleOpenNow = () => {
    onChange({ ...filters, openNow: !filters.openNow });
  };

  const setOpenDay = (day: string) => {
    onChange({ ...filters, openDay: day });
  };

  const toggleFoodType = (foodType: string) => {
    const newFoodTypes = filters.foodTypes.includes(foodType)
      ? filters.foodTypes.filter((t) => t !== foodType)
      : [...filters.foodTypes, foodType];
    onChange({ ...filters, foodTypes: newFoodTypes });
  };

  const clearFoodTypes = () => {
    onChange({ ...filters, foodTypes: [] });
  };

  return (
    <aside className="w-[272px] shrink-0 border-r border-pantry-stone bg-white">
      <div className="h-full overflow-y-auto p-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-pantry-dark" />
            <span className="text-sm font-bold text-pantry-dark">Filters</span>
          </div>
          {(filters.openNow ||
            filters.openDay !== "Any day" ||
            filters.foodTypes.length > 0) && (
            <button
              onClick={() =>
                onChange({ openNow: false, openDay: "Any day", foodTypes: [] })
              }
              className="text-xs text-pantry-dark hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className="mb-5 rounded-xl bg-pantry-cream px-4 py-3.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-pantry-ink">
              Open Right Now
            </span>
            <Toggle checked={filters.openNow} onChange={toggleOpenNow} />
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2.5 block text-[13px] font-semibold text-gray-700">
            Open Day
          </label>
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => setOpenDay("Any day")}
              className={`rounded-lg border px-3 py-2 text-left text-[13px] font-semibold ${
                filters.openDay === "Any day"
                  ? "border-pantry-dark bg-pantry-mint text-pantry-dark"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              Any day
            </button>
            {ALL_DAYS.map((d) => {
              const isActive = filters.openDay === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setOpenDay(d)}
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
              onClick={clearFoodTypes}
              className={`rounded-lg border px-3 py-2 text-left text-[13px] ${
                filters.foodTypes.length === 0
                  ? "border-pantry-dark bg-pantry-mint font-semibold text-pantry-dark"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              All types
            </button>
            {ALL_FOOD_TYPES.map((f) => {
              const isActive = filters.foodTypes.includes(f);
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFoodType(f)}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs ${
                    isActive
                      ? "border-pantry-dark bg-pantry-mint font-semibold text-pantry-dark"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {f}
                  {isActive && <Check size={14} className="text-pantry-dark" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
