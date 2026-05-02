import { Button } from "@/components/tailgrids/core/button";
import { Bell, ChevronRight, Clock, Flag, Heart, MapPin, Phone } from "./icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/tailgrids/core/card";

import type { Pantry } from "./data";

function statusBadge(status: Pantry["status"]) {
    if (status === "open-now")
        return (
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-bold tracking-[0.3px] text-green-900">
                OPEN NOW
            </span>
        );
    if (status === "open-today")
        return (
            <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-[11px] font-bold text-yellow-800">
                OPEN TODAY
            </span>
        );
    return (
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-500">
            CLOSED TODAY
        </span>
    );
}

export function PantryCard({ pantry }: { pantry: Pantry }) {
    const days = pantry.schedules
        .filter((s) => s.weekDay && s.start)
        .slice(0, 2);

    return (
        <article className="overflow-hidden rounded-2xl border border-pantry-beige bg-white shadow-[0_2px_12px_rgba(28,69,50,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(28,69,50,0.12)]">
            <div className="h-1 bg-gradient-to-r from-pantry-dark to-pantry-bright" />

            <div className="px-5 pt-5 pb-4">
                <div className="mb-2.5 flex items-start justify-between gap-3">
                    <h3 className="flex-1 font-serif text-lg leading-tight text-pantry-ink">
                        {pantry.name}
                    </h3>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                        {statusBadge(pantry.status)}
                    </div>
                </div>

                <div className="mb-1 flex items-start gap-1.5 text-[13px] text-gray-500">
                    <MapPin size={13} className="mt-0.5 shrink-0" />
                    <span className="flex-1">
                        {pantry.address ||
                            `${(pantry as any).address1}, ${(pantry as any).city}, ${(pantry as any).state}`}
                    </span>
                    {typeof (pantry as any).distance === "number" && (
                        <span className="shrink-0 font-medium text-pantry-dark">
                            {Math.round((pantry as any).distance * 10) / 10} mi
                        </span>
                    )}
                </div>

                {days.length > 0 && (
                    <div className="mb-3 flex items-start gap-1.5 text-[13px] text-gray-700">
                        <Clock size={13} className="mt-0.5 shrink-0" />
                        <div>
                            {days.map((s, i) => (
                                <span key={i}>
                                    {i > 0 && " • "}
                                    {s.weekDay.slice(0, 3)}{" "}
                                    {s.start || (s as any).startTime}–
                                    {s.end || (s as any).endTime}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {pantry.phone && (
                    <div className="mb-3 flex items-center gap-1.5 text-[13px] text-gray-700">
                        <Phone size={13} />
                        {pantry.phone}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 border-t border-pantry-stone/60 px-5 py-3">
                <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-500"
                >
                    <Heart size={14} />
                    {pantry.loves}
                </button>
                <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-500"
                >
                    <Bell size={14} />
                    Follow
                </button>
                <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-500"
                >
                    <Flag size={14} />
                </button>
                <div className="flex-1" />
                <Button
                    size="sm"
                    className="bg-pantry-dark hover:bg-pantry-medium"
                >
                    Details <ChevronRight size={14} />
                </Button>
            </div>
        </article>
    );
}
