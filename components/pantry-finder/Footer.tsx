import { Leaf } from "./icons";

export function Footer() {
  return (
    <footer className="bg-pantry-deepest px-6 py-10">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-md bg-white/10">
            <Leaf size={14} className="text-pantry-light" />
          </span>
          <span className="font-serif font-bold text-pantry-light">
            PantryFinder
          </span>
        </div>
        <span className="text-sm text-white/40">
          © 2025 PantryFinder. Built for communities.
        </span>
      </div>
    </footer>
  );
}
