"use client";

import React, { use } from "react";
import Link from "next/link";
import { useMenu } from "@/context/menuContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MessageSquare, ArrowLeft, Leaf, Flame, ShieldAlert, CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProdutoDetalhe({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { products, categories, settings } = useMenu();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex-grow bg-brand-black py-20 text-center">
          <div className="max-w-md mx-auto glass p-8 rounded-2xl border border-white/5">
            <ShieldAlert className="w-16 h-16 text-brand-orange mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-poppins text-white mb-2">Produto não encontrado</h1>
            <p className="text-gray-400 text-sm mb-6">O produto que você está procurando não existe ou foi removido.</p>
            <Link
              href="/cardapio"
              className="inline-block bg-brand-orange text-brand-black font-bold px-6 py-3 rounded-full hover:bg-brand-yellow transition-all text-sm"
            >
              Voltar ao Cardápio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const categoryName = categories.find((c) => c.id === product.categoryId)?.name || "";

  const handleOrderWhatsApp = () => {
    const message = `Olá! Gostaria de pedir a ${product.name} que vi no site.`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Convert ingredients string to array for tags
  const ingredientsList = product.ingredients
    ? product.ingredients.split(",").map((i) => i.trim())
    : [];

  // Get related products (same category, excluding current one)
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Header />

      <main className="flex-grow bg-brand-surface py-12 text-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <Link
            href="/cardapio"
            className="inline-flex items-center space-x-2 text-gray-500 hover:text-brand-orange transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Cardápio</span>
          </Link>

          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Image Column */}
            <div className="w-full h-96 lg:h-[480px] rounded-2xl overflow-hidden border border-gray-100 shadow-2xl relative bg-gray-50">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-brand-orange font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                {categoryName}
              </span>
              {product.isPromotional && (
                <span className="absolute top-4 right-4 bg-brand-orange text-white font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Promocional
                </span>
              )}
            </div>

            {/* Content Column */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-brand-black leading-tight">
                  {product.name}
                </h1>
                
                {/* Price tag */}
                <div className="inline-block">
                  <span className="text-3xl sm:text-4xl font-black text-brand-orange font-poppins">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-2 font-poppins">
                    Descrição do Prato
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {ingredientsList.length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-2 font-poppins">
                      Ingredientes e Acompanhamentos
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {ingredientsList.map((ingredient, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-brand-orange" />
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Box CTA */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-brand-orange animate-pulse" /> Servido bem quentinho
                  </span>
                  <span>Pronto em 25-35 min</span>
                </div>
                
                <button
                  onClick={handleOrderWhatsApp}
                  className="w-full bg-brand-orange hover:bg-orange-600 text-white font-extrabold text-base py-4 rounded-xl shadow-lg shadow-orange-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  Pedir pelo WhatsApp
                </button>
              </div>

            </div>
          </div>

          {/* Related Items Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-gray-100 pt-16">
              <h2 className="text-2xl font-bold font-poppins text-brand-black mb-8">
                Outras delícias que você vai amar 🧡
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/produto/${p.slug}`}
                    className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-brand-orange/30 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div className="h-40 w-full overflow-hidden bg-gray-50">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between text-brand-black bg-white">
                      <h3 className="text-brand-black font-bold text-base font-poppins group-hover:text-brand-orange transition-colors truncate mb-1">
                        {p.name}
                      </h3>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                        <span className="text-brand-orange font-black text-sm">
                          R$ {p.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-brand-orange font-bold flex items-center gap-0.5">
                          Ver item <ArrowLeft className="w-3 h-3 rotate-180" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
