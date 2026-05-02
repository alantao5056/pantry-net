"use client";

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PantryDocument } from "@/firebase/models/Pantry";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface MapProps {
    pantries: PantryDocument[];
    onPantryHover?: (pantryId: string | null) => void;
    hoveredPantryId?: string | null;
}

function Map({ pantries, onPantryHover, hoveredPantryId }: MapProps) {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN || "";
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center:
                pantries.length > 0 && pantries[0].coordinates
                    ? [
                          pantries[0].coordinates.longitude,
                          pantries[0].coordinates.latitude,
                      ]
                    : [-71.06776, 42.35816], // starting position [lng, lat]
            zoom: 11, // starting zoom
        });

        for (const pantry of pantries) {
            if (!pantry.coordinates) continue;
            // make a marker for each pantry and add to the map
            const marker = new mapboxgl.Marker()
                .setLngLat([
                    pantry.coordinates.longitude,
                    pantry.coordinates.latitude,
                ])
                .addTo(mapRef.current);

            markersRef.current[pantry.id] = marker;

            const popup = new mapboxgl.Popup({
                offset: 25,
                closeOnClick: false,
            }).setText(`${pantry.name}: ${pantry.address1}`);
            marker.setPopup(popup);

            marker.getElement().addEventListener("mouseenter", () => {
                popup.addTo(mapRef.current!);
                onPantryHover?.(pantry.id);
            });

            marker.getElement().addEventListener("mouseleave", () => {
                popup.remove();
                onPantryHover?.(null);
            });

            marker.getElement().addEventListener("click", () => {
                alert(`Pantry: ${pantry.name}\nAddress: ${pantry.address}`);
            });
        }

        const resizeObserver = new ResizeObserver(() => {
            mapRef.current?.resize();
        });
        resizeObserver.observe(mapContainerRef.current);
        requestAnimationFrame(() => mapRef.current?.resize());

        return () => {
            resizeObserver.disconnect();
            mapRef.current?.remove();
        };
    }, [onPantryHover]);

    useEffect(() => {
        if (!mapRef.current) return;

        // Optional: visual feedback for hovered marker
        Object.entries(markersRef.current).forEach(([id, marker]) => {
            const element = marker.getElement();
            if (id === hoveredPantryId) {
                element.style.zIndex = "10";
                element.style.filter =
                    "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))";
                marker.getPopup()?.addTo(mapRef.current!);
            } else {
                element.style.zIndex = "";
                element.style.filter = "";
                marker.getPopup()?.remove();
            }
        });
    }, [hoveredPantryId]);

    return (
        <>
            <div
                id="map-container"
                className="w-full h-full"
                ref={mapContainerRef}
            />
        </>
    );
}

export default Map;
