"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, KeyRound, ArrowLeft, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Front-end only check (Username: admin, Password: admin123)
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        sessionStorage.setItem("soparia_admin_logged_in", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Usuário ou senha incorretos.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-radial from-brand-black/40 to-brand-black flex items-center justify-center p-4">
      
      <div className="w-full max-w-md">
        
        {/* Return to site link */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-500 hover:text-brand-orange transition-colors text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Site</span>
        </Link>

        {/* Login Card */}
        <div className="glass-card p-8 rounded-2xl border border-white/5 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Brand header */}
          <div className="text-center">
            <span className="text-4xl font-extrabold font-poppins tracking-tight flex items-center justify-center">
              <span className="text-brand-orange">Soparia</span>
              <span className="text-brand-yellow font-light ml-1">Admin</span>
              <span className="text-brand-orange ml-0.5">🔐</span>
            </span>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-2">Área Administrativa Restrita</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/25 p-4 rounded-xl flex items-center gap-3 text-red-400 text-xs sm:text-sm">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 font-poppins">
                Usuário
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                  <User className="w-4.5 h-4.5" />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-brand-dark/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange focus:bg-brand-dark transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 font-poppins">
                Senha
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                  <KeyRound className="w-4.5 h-4.5" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-dark/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange focus:bg-brand-dark transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-orange to-brand-yellow text-brand-black hover:brightness-110 active:scale-95 disabled:opacity-50 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(255,122,0,0.35)] text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Lock className="w-4 h-4 fill-current" />
                  Entrar no Painel
                </>
              )}
            </button>
          </form>

          {/* Subtitle helper */}
          <div className="text-center pt-2">
            <p className="text-[10px] text-gray-600">Dica: Usuário `admin` e Senha `admin123` para testar localmente.</p>
          </div>

        </div>

      </div>

    </div>
  );
}
