import type { Geocoder } from "./Geocoder";
import { CensusGeocoder } from "./providers/CensusGeocoder";
import { NominatimGeocoder } from "./providers/NominatimGeocoder";
import { CachedGeocoder } from "./cache/CachedGeocoder";

// We can implement a fallback mechanism or just use Nominatim for better vague-search support
class FallbackGeocoder implements Geocoder {
    constructor(
        private primary: Geocoder,
        private fallback: Geocoder,
    ) {}

    public async geocode(address: string) {
        let result = await this.primary.geocode(address);
        if (!result) {
            result = await this.fallback.geocode(address);
        }
        return result;
    }
}

export class GeocoderFactory {
    public static create(): Geocoder {
        // Use Census Geocoder as primary, fallback to Nominatim (which handles vaguer locations well)
        const combinedGeocoder = new FallbackGeocoder(
            new CensusGeocoder(),
            new NominatimGeocoder(),
        );
        return new CachedGeocoder(combinedGeocoder);
    }
}
