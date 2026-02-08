"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/superbase";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data?.session ?? null);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null);
    });

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/60 dark:bg-black/60 border-b border-transparent/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-semibold">
              Melisa & Darius
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <a href="#hero" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20">
              Intrebarea Rosie
            </a>
            <a href="#important-dates" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20">
              Datele Importante
            </a>
            <a href="#sweet-messages" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20">
              Mesaje Dulci
            </a>
            <a href="#future-messages" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20">
              Mesaje Speciale
            </a>
            {session && (
              <button onClick={handleSignOut} className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600">
                Deconectare
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Deschide meniul"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/20"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={`md:hidden ${open ? "block" : "hidden"}`}>
          <div className="flex flex-col space-y-1 pb-4">
            <a href="#hero" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10">
              Home
            </a>
            <a href="#important-dates" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10">
              Datele importante
            </a>
            <a href="#sweet-messages" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10">
              Mesaje Dulci
            </a>
            <a href="#future-messages" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10">
              Pentru Viitor
            </a>
            {session && (
              <button onClick={handleSignOut} className="block text-left px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600">
                Deconectare
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
