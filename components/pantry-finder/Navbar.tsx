import Link from "next/link";
import { Button } from "@/components/tailgrids/core/button";
import { Leaf } from "./icons";

type NavbarProps = {
  variant?: "transparent" | "solid";
};

export function Navbar({ variant = "solid" }: NavbarProps) {
  const transparent = variant === "transparent";
  const textColor = transparent ? "text-white" : "text-pantry-dark";
  const mutedColor = transparent ? "text-white/80" : "text-gray-500";
  const dividerColor = transparent ? "bg-white/30" : "bg-gray-200";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 px-8 transition-all ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-pantry-medium to-pantry-bright">
            <Leaf size={16} className="text-white" />
          </span>
          <span
            className={`font-serif text-xl font-bold tracking-tight ${textColor}`}
          >
            PantryFinder
          </span>
        </Link>

        <div className="flex-1" />

        <Link
          href="/search"
          className={`px-1 py-1.5 text-sm font-medium ${mutedColor}`}
        >
          Find Pantries
        </Link>
        <span
          className={`px-1 py-1.5 text-sm font-medium ${mutedColor} cursor-default`}
        >
          About
        </span>
        <span className={`hidden h-5 w-px sm:block ${dividerColor}`} />
        <span
          className={`hidden cursor-default px-1 py-1.5 text-sm font-medium sm:block ${textColor}`}
        >
          Sign In
        </span>
        <Button
          size="sm"
          className={
            transparent
              ? "border border-white/50 bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
              : "bg-pantry-dark hover:bg-pantry-medium"
          }
        >
          Register
        </Button>
      </div>
    </nav>
  );
}
