import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
        return NextResponse.json(
            { error: "Address is required" },
            { status: 400 },
        );
    }

    const benchmark = "Public_AR_Current";
    const url = new URL(
        "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress",
    );
    url.searchParams.set("address", address);
    url.searchParams.set("benchmark", benchmark);
    url.searchParams.set("format", "json");

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Census API returned ${response.status}`);
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
