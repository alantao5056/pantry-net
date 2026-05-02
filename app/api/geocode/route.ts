import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    console.log("Geocode API Request received for address:", address);
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
        console.log("Fetching from Census API:", url.toString());
        const response = await fetch(url.toString());
        if (!response.ok) {
            console.error(
                `Census API error: ${response.status} ${response.statusText}`,
            );
            throw new Error(`Census API returned ${response.status}`);
        }
        const data = await response.json();
        console.log("Census API Response success");
        console.log(
            "Census API Response data:",
            JSON.stringify(data).slice(0, 500),
        ); // Log first 500 chars of response
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Geocode API Internal Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
