"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useMenu } from "@/context/menuContext";

export const WhatsAppButton: React.FC = () => {
  const { settings } = useMenu();

  const handleWhatsappClick = () => {
    const message = encodeURIComponent("Olá! Gostaria de fazer um pedido.");
    const url = `https://wa.me/${settings.whatsappNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleWhatsappClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
      aria-label="Pedir pelo WhatsApp"
    >
      {/* Ripple Animation Effects */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping -z-10 group-hover:animate-none"></span>
      <MessageCircle className="w-8 h-8 fill-current" />
    </button>
  );
};
