import { useState, useEffect, useRef } from "react";
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
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchKartaViewImage();
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" },
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        const fetchKartaViewImage = async () => {
            const lat =
                pantry.latitude || (pantry.coordinates as any)?.latitude;
            const lng =
                pantry.longitude || (pantry.coordinates as any)?.longitude;

            if (!lat || !lng) {
                setIsLoadingImage(false);
                return;
            }

            try {
                const response = await fetch(
                    `https://api.openstreetcam.org/2.0/photo/?lat=${lat}&lng=${lng}&radius=100`,
                );
                const data = await response.json();

                if (data.result?.data?.length > 0) {
                    // Find the first image that has a valid URL
                    const photo = data.result.data.find(
                        (p: any) =>
                            p.imageProcUrl ||
                            p.imageLthUrl ||
                            p.fileurlProc ||
                            p.fileurlLTh,
                    );
                    if (photo) {
                        setImageUrl(
                            photo.imageProcUrl ||
                                photo.imageLthUrl ||
                                photo.fileurlProc ||
                                photo.fileurlLTh,
                        );
                    } else {
                        // Use Mapbox static image as fallback if no valid photo found in results
                        setImageUrl(
                            `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lng},${lat},15,0,0/400x200?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
                        );
                    }
                } else {
                    // Use Mapbox static image as fallback if no results
                    setImageUrl(
                        `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lng},${lat},15,0,0/400x200?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
                    );
                }
            } catch (error) {
                console.error("Error fetching KartaView image:", error);
                // Last resort fallback
                setImageUrl(
                    `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lng},${lat},15,0,0/400x200?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
                );
            } finally {
                setIsLoadingImage(false);
            }
        };

        return () => observer.disconnect();
    }, [pantry]);

    const days = pantry.schedules
        ? pantry.schedules
              .filter((s) => s.weekDay && (s.start || (s as any).startTime))
              .slice(0, 2)
        : [];

    return (
        <article
            ref={containerRef}
            className="overflow-hidden rounded-2xl border border-pantry-beige bg-white shadow-[0_2px_12px_rgba(28,69,50,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(28,69,50,0.12)]"
        >
            <div className="relative h-48 w-full bg-gray-100">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={pantry.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                            // If the street view image fails to load (e.g. 404), fall back to Mapbox
                            const lat =
                                pantry.latitude ||
                                (pantry.coordinates as any)?.latitude;
                            const lng =
                                pantry.longitude ||
                                (pantry.coordinates as any)?.longitude;
                            (e.target as HTMLImageElement).src =
                                `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lng},${lat},15,0,0/400x200?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-pantry-cream text-pantry-stone">
                        {isLoadingImage ? (
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-pantry-dark border-t-transparent" />
                        ) : (
                            <span className="text-sm font-medium">
                                No street view available
                            </span>
                        )}
                    </div>
                )}
                <div className="absolute top-4 right-4">
                    {statusBadge(pantry.status)}
                </div>
            </div>

            <div className="px-5 pt-5 pb-4">
                <div className="mb-2.5 flex items-start justify-between gap-3">
                    <h3 className="flex-1 font-serif text-lg leading-tight text-pantry-ink">
                        {pantry.name}
                    </h3>
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
                    {pantry.loves || 0}
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
