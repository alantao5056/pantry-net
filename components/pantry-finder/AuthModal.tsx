import { Button } from "@/components/tailgrids/core/button";
import { Eye, Leaf, Lock, Mail, User, X } from "./icons";

type AuthMode = "login" | "register";

export function AuthModal({ mode = "login" }: { mode?: AuthMode }) {
  const isRegister = mode === "register";

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[440px] overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <div className="relative bg-gradient-to-br from-pantry-dark to-pantry-medium px-8 pb-6 pt-7">
          <button
            type="button"
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-white/15 text-white"
          >
            <X size={16} />
          </button>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/15">
              <Leaf size={18} className="text-pantry-light" />
            </span>
            <span className="font-serif text-xl font-bold text-white">
              PantryFinder
            </span>
          </div>
          <div className="flex gap-1 rounded-xl bg-white/10 p-1">
            {(["login", "register"] as const).map((t) => {
              const active = t === mode;
              return (
                <button
                  key={t}
                  type="button"
                  className={`flex-1 rounded-lg px-2 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-transparent text-white/70"
                  }`}
                >
                  {t === "login" ? "Sign In" : "Register"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 px-8 pb-8 pt-7">
          {isRegister && (
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                Your Name
              </label>
              <div className="flex items-center gap-2.5 rounded-xl border border-pantry-stone bg-pantry-cream px-3.5">
                <User size={16} className="text-gray-400" />
                <input
                  placeholder="Jane Smith"
                  className="flex-1 bg-transparent py-3 text-sm text-pantry-ink placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
              Email Address
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border border-pantry-stone bg-pantry-cream px-3.5">
              <Mail size={16} className="text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 bg-transparent py-3 text-sm text-pantry-ink placeholder:text-gray-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
              Password
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border border-pantry-stone bg-pantry-cream px-3.5">
              <Lock size={16} className="text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="flex-1 bg-transparent py-3 text-sm text-pantry-ink placeholder:text-gray-400 outline-none"
              />
              <button type="button" className="text-gray-400">
                <Eye size={16} />
              </button>
            </div>
          </div>

          <Button
            size="md"
            className="mt-1 w-full bg-gradient-to-br from-pantry-dark to-pantry-medium text-white"
          >
            {isRegister ? "Create Account" : "Sign In"}
          </Button>

          <p className="text-center text-[13px] text-gray-400">
            {isRegister
              ? "Already have an account? "
              : "Don't have an account? "}
            <span className="cursor-pointer font-semibold text-pantry-dark">
              {isRegister ? "Sign In" : "Register"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
