"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, firebase } from "@/firebase/auth";
import { AuthModal } from "@/components/pantry-finder/AuthModal";

interface AuthContextType {
  user: firebase.User | null;
  loading: boolean;
  openAuthModal: (mode?: "login" | "register") => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode: "login" | "register" = "login") => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const closeAuthModal = () => {
    setModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, openAuthModal, closeAuthModal }}>
      {children}
      {modalOpen && (
        <AuthModal initialMode={modalMode} onClose={closeAuthModal} />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
