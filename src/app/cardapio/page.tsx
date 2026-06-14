"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useMenu } from "@/context/menuContext";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, MessageSquare, ArrowRight } from "lucide-react";

export default function Cardapio() {
  const { categories, products, settings } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categoryId === selectedCategory);

  const handleOrderWhatsApp = (productName: string, price: number) => {
    const text = `Olá! Gostaria de pedir a "${productName}" (R$ ${price.toFixed(2)}) que vi no site.`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <Header />
      
      <main className="flex-grow bg-brand-surface min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-brand-black mb-4">
              Nosso <span className="text-brand-orange">Cardápio Digital</span> 🍽️
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Explore nossas sopas quentinhas, caldos revigorantes, jantas deliciosas e adicionais perfeitos. Tudo preparado na hora com ingredientes selecionados!
            </p>
          </div>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider font-poppins transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-brand-orange text-white shadow-lg shadow-orange-100"
                  : "bg-white text-gray-600 border border-gray-200 hover:text-brand-orange hover:bg-gray-50"
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider font-poppins transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-brand-orange text-white shadow-lg shadow-orange-100"
                    : "bg-white text-gray-600 border border-gray-200 hover:text-brand-orange hover:bg-gray-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => {
                const categoryName = categories.find((c) => c.id === p.categoryId)?.name || "";
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={p.id}
                    className="bg-white rounded-2xl overflow-hidden group flex flex-col justify-between border border-gray-100 hover:border-brand-orange/30 transition-all duration-300 shadow-md"
                  >
                    {/* Product Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-gray-50">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-brand-orange font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                        {categoryName}
                      </span>
                      {p.isPromotional && (
                        <span className="absolute top-3 right-3 bg-brand-orange text-white font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                          Promo
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-6 flex-grow flex flex-col justify-between text-brand-black">
                      <div>
                        <h3 className="text-brand-black font-bold text-xl font-poppins group-hover:text-brand-orange transition-colors mb-2">
                          {p.name}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                          {p.description}
                        </p>
                      </div>

                      <div>
                        {/* Price Row */}
                        <div className="flex items-center justify-between mb-4 border-t border-gray-100 pt-4">
                          <span className="text-2xl font-black text-brand-orange font-poppins">
                            R$ {p.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Actions Row */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href={`/produto/${p.slug}`}
                            className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-2.5 rounded-xl border border-gray-200 text-xs transition-all flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-4 h-4 text-brand-orange" />
                            Detalhes
                          </Link>
                          
                          <button
                            onClick={() => handleOrderWhatsApp(p.name, p.price)}
                            className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4 fill-current" />
                            Pedir Já
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 max-w-md mx-auto">
              <p className="text-gray-600 mb-4 font-poppins font-medium">Nenhum produto cadastrado nesta categoria.</p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition-all"
              >
                Ver todos os itens
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
