"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Clock, MessageSquare, Shield } from "lucide-react";
import { useMenu } from "@/context/menuContext";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const { settings } = useMenu();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Cardápio", path: "/cardapio" },
    { name: "Promoções", path: "/promocoes" },
    { name: "Área de Entrega", path: "/entrega" },
    { name: "Sobre Nós", path: "/sobre" },
    { name: "Contato", path: "/contato" }
  ];

  const handleWhatsappClick = () => {
    const message = encodeURIComponent("Olá! Vi o site e gostaria de fazer um pedido.");
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 text-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-headline font-bold text-brand-orange flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18a2 2 0 0 1 2 2v1a7 7 0 0 1-7 7H8a7 7 0 0 1-7-7v-1a2 2 0 0 1 2-2Z"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><path d="M11 15h2"/></svg>
              Soparia Mãe e Filha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                    isActive ? "text-brand-orange font-bold" : "text-gray-600 hover:text-brand-orange"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Status, CTA and Mobile Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Status indicator */}
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <span className={`relative flex h-2.5 w-2.5`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  settings.isOpen ? "bg-green-400" : "bg-red-400"
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  settings.isOpen ? "bg-green-500" : "bg-red-500"
                }`}></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                {settings.isOpen ? "Aberto" : "Fechado"}
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={handleWhatsappClick}
              className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-orange-100 cursor-pointer"
            >
              Pedir Agora
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </button>

            {/* Admin Link */}
            <Link
              href="/admin/login"
              className="text-gray-400 hover:text-brand-orange transition-colors"
              title="Painel Administrativo"
            >
              <Shield className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Status indicator (Mobile) */}
            <div className="flex items-center space-x-1.5 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
              <span className={`relative flex h-2 w-2`}>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  settings.isOpen ? "bg-green-500" : "bg-red-500"
                }`}></span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                {settings.isOpen ? "Aberto" : "Fechado"}
              </span>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-brand-orange focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-brand-orange/10 text-brand-orange border-l-4 border-brand-orange font-bold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-brand-orange"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3 px-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleWhatsappClick();
                  }}
                  className="w-full bg-brand-orange hover:bg-orange-600 text-white text-center font-bold py-3 rounded-xl shadow-lg shadow-orange-100 cursor-pointer flex items-center justify-center gap-2"
                >
                  Pedir Agora
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                </button>

                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-yellow" />
                    {settings.workingHours}
                  </span>
                  
                  <Link
                    href="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1 text-gray-400 hover:text-brand-orange transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
