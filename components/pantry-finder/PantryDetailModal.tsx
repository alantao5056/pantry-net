import { Button } from "@/components/tailgrids/core/button";
import {
  Bell,
  Calendar,
  Flag,
  Heart,
  Info,
  Leaf,
  MapPin,
  Phone,
  Star,
  X,
} from "./icons";
import type { Pantry } from "./data";

function getUniqueFoods(services: Pantry["services"]) {
  const foods = new Set<string>();
  services.forEach((s) => s.food.forEach((f) => foods.add(f)));
  return [...foods];
}

export function PantryDetailModal({ pantry }: { pantry: Pantry }) {
  const allFoods = getUniqueFoods(pantry.services);

  return (
    <div className="fixed inset-0 z-[2000] flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="mt-12 w-full max-w-[720px] overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
        <div className="relative bg-gradient-to-br from-pantry-dark to-pantry-medium px-8 pb-7 pt-8">
          <button
            type="button"
            className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-white/15 text-white"
          >
            <X size={18} />
          </button>
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 font-serif text-2xl font-bold text-white">
              {pantry.name.charAt(0)}
            </div>
            <div>
              <h2 className="mb-2 font-serif text-2xl text-white">
                {pantry.name}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-white/80">
                <MapPin size={14} />
                {pantry.address}
              </div>
            </div>
          </div>
          {pantry.status === "open-now" && (
            <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-green-300/40 bg-green-200/20 px-3.5 py-1">
              <span className="size-2 rounded-full bg-green-400" />
              <span className="text-[13px] font-semibold text-green-50">
                Open Right Now
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5 border-b border-pantry-beige px-8 py-5">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
          >
            <Heart size={16} />
            Love · {pantry.loves}
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
          >
            <Bell size={16} />
            Follow Updates
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
          >
            <Flag size={16} /> Report Issue
          </button>
          {pantry.phone && (
            <Button size="sm" className="bg-pantry-dark hover:bg-pantry-medium">
              <Phone size={16} /> {pantry.phone}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 px-8 py-6 md:grid-cols-2">
          {pantry.about && (
            <div className="md:col-span-2 rounded-2xl bg-pantry-cream p-5">
              <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-pantry-dark">
                <Info size={15} /> About
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                {pantry.about}
              </p>
            </div>
          )}

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-pantry-dark">
              <Calendar size={15} /> Hours & Schedule
            </div>
            {pantry.schedules.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {pantry.schedules.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-pantry-cream px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-pantry-ink">
                        {s.weekDay}
                      </span>
                      <span className="text-[13px] font-medium text-pantry-bright">
                        {s.start} – {s.end}
                      </span>
                    </div>
                    {s.notes && (
                      <div className="mt-1 text-xs text-gray-500">
                        {s.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-pantry-cream px-4 py-3 text-[13px] text-gray-400">
                Call for schedule information: {pantry.phone || "no phone listed"}
              </div>
            )}
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-pantry-dark">
              <Leaf size={15} /> Available Food Types
            </div>
            {allFoods.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {allFoods.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-pantry-mint-border bg-pantry-mint px-3 py-1 text-xs font-medium text-pantry-dark"
                  >
                    {f}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-[13px] text-gray-400">
                Contact for food availability details
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-pantry-dark">
              <Star size={15} /> Services Offered
            </div>
            <div className="flex flex-col gap-2.5">
              {pantry.services.map((svc, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-pantry-cream px-4 py-3.5"
                >
                  <div>
                    <div className="text-sm font-semibold text-pantry-ink">
                      {svc.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {svc.category}
                      {svc.program && svc.program !== svc.category
                        ? ` · ${svc.program}`
                        : ""}
                    </div>
                  </div>
                  <span className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] text-gray-700">
                    {svc.schedules.filter((s) => s.weekDay).length} sessions/wk
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
