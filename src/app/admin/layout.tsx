"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useMenu } from "@/context/menuContext";
import {
  LayoutDashboard,
  Utensils,
  Truck,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { settings } = useMenu();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Check authentication status
  useEffect(() => {
    const authStatus = sessionStorage.getItem("soparia_admin_logged_in");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      if (pathname === "/admin" || pathname === "/admin/login") {
        router.push("/admin/dashboard");
      }
    } else {
      setIsAuthenticated(false);
      if (pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem("soparia_admin_logged_in");
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  // If path is login page, just render child page without layout frame
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-brand-black text-white">{children}</div>;
  }

  // Show loading state while determining auth status
  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm font-semibold">Carregando painel...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Cardápio", path: "/admin/cardapio", icon: <Utensils className="w-5 h-5" /> },
    { name: "Áreas de Entrega", path: "/admin/entrega", icon: <Truck className="w-5 h-5" /> },
    { name: "Configurações", path: "/admin/configuracoes", icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-brand-black text-white flex flex-col md:flex-row">
      
      {/* Mobile Top Navbar */}
      <div className="md:hidden bg-brand-dark border-b border-white/5 h-16 px-4 flex items-center justify-between z-30">
        <Link href="/" className="flex items-center space-x-1.5">
          <span className="font-extrabold text-lg font-poppins text-brand-orange">Soparia Admin 🧡</span>
        </Link>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="text-gray-400 hover:text-white"
        >
          {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-brand-dark border-r border-white/5 p-6 space-y-8 shrink-0">
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-extrabold font-poppins text-brand-orange flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5" />
              Soparia Admin
            </span>
          </Link>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1.5">Painel de Controle</p>
        </div>

        <nav className="flex-grow space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-brand-orange text-brand-black shadow-lg shadow-brand-orange/15"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Voltar ao Site</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all cursor-pointer text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black z-20 md:hidden"
            />
            {/* Drawer body */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-brand-dark p-6 flex flex-col justify-between z-35 md:hidden border-r border-white/5"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-lg font-poppins text-brand-orange">Soparia Admin</span>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="text-gray-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-brand-orange text-brand-black"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-6">
                <Link
                  href="/"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  <Home className="w-5 h-5" />
                  <span>Voltar ao Site</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all cursor-pointer text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sair do Painel</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow p-6 sm:p-10 md:overflow-y-auto max-w-full">
        {children}
      </main>

    </div>
  );
}
