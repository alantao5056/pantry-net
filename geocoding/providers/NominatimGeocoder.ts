import type { Geocoder } from "../Geocoder";
import type { Coordinates } from "../types";

type NominatimResponse = {
    lat: string;
    lon: string;
    display_name: string;
}[];

export class NominatimGeocoder implements Geocoder {
    private readonly baseUrl: string =
        "https://nominatim.openstreetmap.org/search";

    public async geocode(address: string): Promise<Coordinates | null> {
        const formatted = address.trim();
        if (!formatted) throw new Error("Address is empty.");

        const url = new URL(this.baseUrl);
        url.searchParams.set("q", formatted);
        url.searchParams.set("format", "json");
        url.searchParams.set("limit", "1");

        try {
            const response = await fetch(url.toString(), {
                headers: {
                    "User-Agent": "PantryNet-App/1.0",
                },
            });

            if (!response.ok) {
                throw new Error(`Nominatim API returned ${response.status}`);
            }

            const json = (await response.json()) as NominatimResponse;

            if (!json || json.length === 0) {
                return null;
            }

            const lat = parseFloat(json[0].lat);
            const lon = parseFloat(json[0].lon);

            if (isNaN(lat) || isNaN(lon)) {
                return null;
            }

            return { latitude: lat, longitude: lon };
        } catch (error) {
            console.error("Nominatim geocoding error:", error);
            return null;
        }
    }
}
