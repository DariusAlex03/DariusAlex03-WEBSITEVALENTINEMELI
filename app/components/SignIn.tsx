"use client";

import { useState } from "react";
import { supabase } from "@/lib/superbase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage("Autentificat cu succes.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-black/60 backdrop-blur rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Autentificare ca altfel nu se poate !</h2>
        {message && <div className="mb-3 text-sm text-red-600">{message}</div>}
        <label className="block mb-2 text-sm">Email :</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="adresa de email"
          className="w-full px-3 py-2 mb-3 rounded border"
        />
        <label className="block mb-2 text-sm">Parolă :</label>
        <input
          type="password"
          value={password}
          placeholder="parola doar noi o avem 😉"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 rounded border"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Se autentifică..." : "Intră"}
          </button>
          <button
            onClick={() => setMessage("Parola nu trebuia uitata 😉❤️")}
            className="flex-1 px-4 py-2 bg-gray-200 rounded"
          >
            Ajutor
          </button>
        </div>
      </div>
    </div>
  );
}
