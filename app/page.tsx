"use client";

import Link from "next/link";
import { Button } from "@/components/tailgrids/core/button";
import { Footer } from "@/components/pantry-finder/Footer";
import { Navbar } from "@/components/pantry-finder/Navbar";
import { PANTRIES } from "@/components/pantry-finder/data";
import { PantryDetailModal } from "@/components/pantry-finder/PantryDetailModal";
import {
  ChevronRight,
  Clock,
  Heart,
  Leaf,
  MapPin,
  Search,
} from "@/components/pantry-finder/icons";
import { useRouter } from 'next/navigation'
import { useState } from "react";

const STATS: Array<[string, string]> = [
  ["10+", "Pantries Listed"],
  ["5", "Cities Covered"],
  ["Free", "Always & Forever"],
  ["Updated", "Community-Sourced"],
];

const STEPS = [
  {
    n: "01",
    icon: <Search size={24} className="text-pantry-dark" />,
    title: "Search Your Area",
    desc: "Enter your address or city and set a search radius to find pantries near you.",
  },
  {
    n: "02",
    icon: <Clock size={24} className="text-pantry-dark" />,
    title: "Check Hours & Details",
    desc: "View open schedules, food types available, and contact info for each pantry.",
  },
  {
    n: "03",
    icon: <Heart size={24} className="text-pantry-dark" />,
    title: "Connect & Follow",
    desc: "Love a pantry, follow for updates, and help keep information accurate for everyone.",
  },
];

export default function LandingPage() {
  const featured = PANTRIES.slice(0, 3);
  const router = useRouter();

  const [address, setAddress] = useState("Boston, MA");
  const [radius, setRadius] = useState("10");
  const [selectedPantry, setSelectedPantry] = useState<any>(null);

  return (
    <>
      <Navbar variant="transparent" />

      <main className="bg-pantry-cream">
        {/* Hero */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-pantry-deepest via-pantry-dark to-pantry-bright">
          <span className="pointer-events-none absolute left-[8%] top-[15%] size-[300px] rounded-full bg-pantry-bright/10 blur-3xl" />
          <span className="pointer-events-none absolute right-[5%] top-[60%] size-[400px] rounded-full bg-pantry-bright/10 blur-3xl" />
          <span className="pointer-events-none absolute right-[20%] top-[5%] size-[200px] rounded-full bg-pantry-bright/15 blur-3xl" />

          <span
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative w-full max-w-[760px] px-6 pb-16 pt-24 text-center">
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <Leaf size={14} className="text-pantry-light" />
              <span className="text-[13px] font-medium tracking-[0.5px] text-pantry-pale">
                Free • Community-Powered • Always Up-to-Date
              </span>
            </span>

            <h1 className="mb-5 font-serif text-5xl font-bold leading-[1.1] tracking-[-1px] text-white sm:text-6xl md:text-[68px]">
              Find Food Pantries
              <br />
              <span className="italic text-pantry-light">Near You</span>
            </h1>

            <p className="mx-auto mb-10 max-w-[520px] text-base leading-relaxed text-white/75 sm:text-lg md:text-xl">
              Connecting communities with nutritious food — discover pantries,
              check hours, and get help when you need it most.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/search?address=${encodeURIComponent(address)}&radius=${radius}`);
              }}
              className="mx-auto flex max-w-[640px] gap-2 rounded-2xl border border-white/20 bg-white/10 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl"
            >
              <label className="flex flex-1 items-center gap-2.5 rounded-xl bg-white/10 px-4">
                <MapPin size={18} className="text-pantry-light" />
                <input
                  onChange={(e) => { setAddress(e.target.value) }}
                  defaultValue="Boston, MA"
                  placeholder="Enter address or city..."
                  className="flex-1 bg-transparent py-3.5 text-[15px] text-white placeholder:text-white/60 outline-none"
                />
              </label>
              <select
                defaultValue="10"
                onChange={(e) => { setRadius(e.target.value) }}
                className="min-w-[100px] cursor-pointer rounded-xl bg-white/10 px-4 text-sm text-white outline-none"
              >
                {["2", "5", "10", "25", "50"].map((r) => (
                  <option key={r} value={r} className="bg-pantry-dark">
                    {r} miles
                  </option>
                ))}
              </select>
              <Button
                type="submit"
                size="md"
                className="bg-gradient-to-br from-pantry-bright to-pantry-medium px-6 text-[15px] font-semibold text-white"
              >
                <Search size={18} /> Search
              </Button>
            </form>
          </div>

          <svg
            className="absolute inset-x-0 bottom-0 h-20 w-full"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
              fill="#F6F4EE"
            />
          </svg>
        </section>

        {/* Stats bar */}
        <section className="border-b border-pantry-stone bg-white px-6 py-5">
          <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-x-12 gap-y-4">
            {STATS.map(([num, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-serif text-[28px] font-bold text-pantry-dark">
                  {num}
                </div>
                <div className="text-[13px] font-medium text-gray-500">
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-pantry-cream px-6 py-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-14 text-center">
              <h2 className="mb-3 font-serif text-3xl text-pantry-dark sm:text-4xl md:text-[42px]">
                How PantryFinder Works
              </h2>
              <p className="mx-auto max-w-[480px] text-base text-gray-500">
                Three simple steps to find the food support you need
              </p>
            </div>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="relative overflow-hidden rounded-3xl border border-pantry-beige bg-white p-8 shadow-[0_4px_20px_rgba(28,69,50,0.07)]"
                >
                  <span className="pointer-events-none absolute right-5 top-5 font-serif text-5xl font-bold text-pantry-dark/[0.05]">
                    {step.n}
                  </span>
                  <div className="mb-5 flex size-13 items-center justify-center rounded-2xl bg-pantry-mint">
                    {step.icon}
                  </div>
                  <h3 className="mb-2.5 font-serif text-xl text-pantry-ink">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-gray-500">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured pantries */}
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-2xl text-pantry-dark sm:text-3xl md:text-[38px]">
                Featured Pantries
              </h2>
              <Link
                href="/search"
                className="flex items-center gap-1.5 rounded-xl border-[1.5px] border-pantry-dark px-5 py-2 text-sm font-medium text-pantry-dark"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-pantry-beige bg-pantry-cream p-6"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="mr-2 flex-1 font-serif text-[17px] text-pantry-ink">
                      {p.name}
                    </h3>
                    {p.status !== "closed-today" && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-900">
                        Open Today
                      </span>
                    )}
                  </div>
                  <div className="mb-4 flex items-center gap-1.5 text-[13px] text-gray-500">
                    <MapPin size={13} />
                    {p.address}
                  </div>
                  <button
                    onClick={() => setSelectedPantry(p)}
                    className="block w-full rounded-lg bg-pantry-dark px-4 py-2 text-center text-[13px] font-medium text-white transition hover:bg-pantry-medium"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-pantry-dark to-pantry-medium px-6 py-20 text-center">
          <h2 className="mb-4 font-serif text-3xl text-white sm:text-4xl md:text-[44px]">
            Know a pantry we&apos;re missing?
          </h2>
          <p className="mx-auto mb-8 max-w-[500px] text-base text-white/75">
            Help us keep PantryFinder accurate and complete for everyone in the
            community.
          </p>
          <Button
            size="lg"
            className="border-[1.5px] border-white/40 bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
          >
            Submit a Pantry
          </Button>
        </section>
      </main>

      <Footer />

      {selectedPantry && (
        <PantryDetailModal 
          pantry={selectedPantry} 
          onClose={() => setSelectedPantry(null)} 
        />
      )}
    </>
  );
}
