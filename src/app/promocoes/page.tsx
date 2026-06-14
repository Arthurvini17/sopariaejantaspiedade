"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useMenu } from "@/context/menuContext";
import { Flame, Percent, Sparkles, MessageSquare } from "lucide-react";

export default function Promocoes() {
  const { promotions, settings } = useMenu();

  const activePromotions = promotions.filter((p) => p.isAvailable);

  const orderPromotionWhatsApp = (name: string, price: number) => {
    const text = `Olá! Gostaria de pedir o combo "${name}" (R$ ${price.toFixed(2)}) que vi no site.`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <Header />

      <main className="flex-grow bg-brand-surface py-16 text-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header intro */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold font-poppins text-brand-black mb-4">
              Promoções & <span className="text-brand-orange">Combos</span> 🏷️
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Economize pedindo nossos combos especiais. Sopa quentinha, torradas crocantes e bebidas geladas combinadas pelo melhor preço de Piedade!
            </p>
          </div>

          {/* Grid of promotions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {activePromotions.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-2xl overflow-hidden group flex flex-col justify-between border border-gray-100 hover:border-brand-orange/30 transition-all duration-300 shadow-md"
              >
                {/* Promo Image */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-50">
                  <img
                    src={promo.imageUrl}
                    alt={promo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-brand-orange text-white font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg font-poppins flex items-center gap-1.5">
                    <Percent className="w-4.5 h-4.5" />
                    Super Combo
                  </span>
                </div>

                {/* Promo content */}
                <div className="p-6 flex-grow flex flex-col justify-between text-brand-black bg-white">
                  <div>
                    <h3 className="text-brand-black font-bold text-2xl mb-3 font-poppins group-hover:text-brand-orange transition-colors">
                      {promo.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                      {promo.description}
                    </p>
                  </div>

                  <div>
                    {/* Price details */}
                    <div className="flex items-center justify-between mb-6 border-t border-gray-100 pt-4">
                      <span className="text-gray-400 text-sm uppercase font-semibold">Preço Especial</span>
                      <span className="text-3xl font-black text-brand-orange font-poppins">
                        R$ {promo.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Order Button */}
                    <button
                      onClick={() => orderPromotionWhatsApp(promo.name, promo.price)}
                      className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-100"
                    >
                      <MessageSquare className="w-5 h-5 fill-current" />
                      Pedir pelo WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {activePromotions.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 max-w-md mx-auto">
              <Sparkles className="w-12 h-12 text-brand-orange mx-auto mb-4 animate-pulse" />
              <p className="text-gray-600 mb-4 font-poppins font-medium">Nenhum combo promocional disponível no momento.</p>
              <p className="text-xs text-gray-500">Volte mais tarde ou acompanhe no nosso Instagram!</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
