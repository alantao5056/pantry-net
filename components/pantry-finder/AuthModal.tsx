"use client";

import { useState } from "react";
import { Button } from "@/components/tailgrids/core/button";
import { Eye, Leaf, Lock, Mail, User, X } from "./icons";
import {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
} from "@/firebase/auth";

type AuthMode = "login" | "register";

interface AuthModalProps {
    initialMode?: AuthMode;
    onClose: () => void;
}

export function AuthModal({ initialMode = "login", onClose }: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isRegister = mode === "register";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isRegister) {
                await signUpWithEmail(email, password);
                // Firebase doesn't directly store "name" in the user object during creation with email/pw
                // unless you update the profile. For simplicity, we'll just sign up here.
            } else {
                await signInWithEmail(email, password);
            }
            onClose();
        } catch (err: any) {
            setError(err.message || "An error occurred during authentication.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
            onClose();
        } catch (err: any) {
            setError(err.message || "An error occurred during Google Sign-In.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div
                className="w-full max-w-[440px] overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative bg-gradient-to-br from-pantry-dark to-pantry-medium px-8 pb-6 pt-7">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                    >
                        <X size={16} />
                    </button>
                    <div className="mb-4 flex items-center gap-2.5">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-white/15">
                            <Leaf size={18} className="text-pantry-light" />
                        </span>
                        <span className="font-serif text-xl font-bold text-white">
                            PantryNet
                        </span>
                    </div>
                    <div className="flex gap-1 rounded-xl bg-white/10 p-1">
                        {(["login", "register"] as const).map((t) => {
                            const active = t === mode;
                            return (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => {
                                        setMode(t);
                                        setError(null);
                                    }}
                                    className={`flex-1 rounded-lg px-2 py-2 text-sm font-medium transition ${
                                        active
                                            ? "bg-white/20 text-white"
                                            : "bg-transparent text-white/70 hover:text-white"
                                    }`}
                                >
                                    {t === "login" ? "Sign In" : "Register"}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 px-8 pb-8 pt-7"
                >
                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600">
                            {error}
                        </div>
                    )}

                    {isRegister && (
                        <div>
                            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                                Your Name
                            </label>
                            <div className="flex items-center gap-2.5 rounded-xl border border-pantry-stone bg-pantry-cream px-3.5 transition-focus focus-within:border-pantry-medium">
                                <User size={16} className="text-gray-400" />
                                <input
                                    placeholder="Jane Smith"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="flex-1 bg-transparent py-3 text-sm text-pantry-ink placeholder:text-gray-400 outline-none"
                                    required={isRegister}
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                            Email Address
                        </label>
                        <div className="flex items-center gap-2.5 rounded-xl border border-pantry-stone bg-pantry-cream px-3.5 transition-focus focus-within:border-pantry-medium">
                            <Mail size={16} className="text-gray-400" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-transparent py-3 text-sm text-pantry-ink placeholder:text-gray-400 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                            Password
                        </label>
                        <div className="flex items-center gap-2.5 rounded-xl border border-pantry-stone bg-pantry-cream px-3.5 transition-focus focus-within:border-pantry-medium">
                            <Lock size={16} className="text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex-1 bg-transparent py-3 text-sm text-pantry-ink placeholder:text-gray-400 outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <Eye size={16} />
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        size="md"
                        className="mt-1 w-full bg-gradient-to-br from-pantry-dark to-pantry-medium text-white shadow-lg shadow-pantry-dark/20 hover:from-pantry-medium hover:to-pantry-dark active:scale-[0.98]"
                    >
                        {loading
                            ? "Processing..."
                            : isRegister
                              ? "Create Account"
                              : "Sign In"}
                    </Button>

                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-[11px] uppercase tracking-wider text-gray-400">
                            <span className="bg-white px-2">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                    >
                        <svg className="size-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </button>

                    <p className="text-center text-[13px] text-gray-400">
                        {isRegister
                            ? "Already have an account? "
                            : "Don't have an account? "}
                        <span
                            className="cursor-pointer font-semibold text-pantry-dark hover:underline"
                            onClick={() => {
                                setMode(isRegister ? "login" : "register");
                                setError(null);
                            }}
                        >
                            {isRegister ? "Sign In" : "Register"}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}
