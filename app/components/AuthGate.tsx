"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/superbase";
import SignIn from "./SignIn";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data?.session ?? null);
      setLoading(false);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null);
    });

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 24 24" className="w-full h-full text-white/30">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              />
            </svg>

            <div className="absolute inset-0 overflow-hidden flex items-end">
              <div className="w-full animate-fill h-0">
                <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fillHeart { 0% { height: 0%; } 50% { height: 100%; } 100% { height: 0%; } }
          .animate-fill { animation: fillHeart 2.2s infinite ease-in-out; }
        `}</style>
      </div>
    );
  if (!session) return <SignIn />;
  return <>{children}</>;
}
