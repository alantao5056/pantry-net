import { GeoPoint } from "firebase/firestore";
import { geoFirestore } from "./firebase";
import { GeocoderFactory } from "@/geocoding/GeocoderFactory";
import type { PantryDocument } from "./models/Pantry";

function milesToKilometers(miles: number): number {
    return miles * 1.60934;
}

export async function searchPantriesByAddress(
    address: string,
    radiusMiles: number,
): Promise<PantryDocument[] | null> {
    const geocoder = GeocoderFactory.create();
    const coordinates = await geocoder.geocode(address);
    if (!coordinates) {
        return null;
    }

    const radiusKm = milesToKilometers(radiusMiles);
    const center = new GeoPoint(coordinates.latitude, coordinates.longitude);

    const pantriesRef = geoFirestore.collection("pantries");

    const query = pantriesRef.near({ center, radius: radiusKm });
    const snapshot = await query.get();

    const sortedDocs = snapshot.docs.sort((a, b) => {
        const distA = (a as any).distance ?? Infinity;
        const distB = (b as any).distance ?? Infinity;
        return distA - distB;
    });

    return sortedDocs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as unknown as PantryDocument,
    );
}

export const fetchPantryById = async (id: string): Promise<PantryDocument | null> => {
  const doc = await geoFirestore.collection("pantries").doc(id).get();
  if (!doc.exists) {
    return null;
  }
  return { id: doc.id, ...doc.data() } as unknown as PantryDocument;
};
