"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Flame, Sparkles, HeartHandshake, ShieldCheck, Heart } from "lucide-react";

export default function Sobre() {
  return (
    <>
      <Header />

      <main className="flex-grow bg-brand-surface py-16 text-brand-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Header intro */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold font-poppins text-brand-black mb-4">
              Nossa <span className="text-brand-orange">História</span> 🧡
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tradição, afeto e muito sabor. Conheça um pouco mais sobre quem somos e o que nos move todos os dias.
            </p>
          </div>

          {/* Grid visual details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-gray-100 shadow-2xl relative bg-white">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
                alt="Panela de Sopa Caseira"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-brand-black font-bold text-2xl font-poppins">
                Alimentando com amor e afeto 🍲
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nascemos in Piedade com o propósito de resgatar a verdadeira culinária caseira. Sabemos que a rotina diária é puxada e que nada supera o conforto de tomar uma sopa quentinha ou fazer uma boa refeição no fim do dia.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Por isso, cada panela de caldo, sopa ou cuscuz é preparada com todo o carinho e dedicação. Nossos legumes vêm frescos da feira, nossas carnes são selecionadas e os temperos são totalmente naturais, remetendo ao sabor de infância.
              </p>
              <div className="flex items-center gap-2 text-brand-orange font-bold text-sm">
                <Heart className="w-4 h-4 fill-brand-orange" />
                <span>Feito de forma artesanal, sempre fresquinho.</span>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-brand-black font-bold text-2xl font-poppins text-center mb-12">
              Nossos Valores e Diferenciais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="bg-brand-orange/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="text-brand-black font-bold text-base font-poppins">Qualidade Máxima</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Não economizamos em qualidade. Utilizamos apenas cortes nobres de carnes, legumes higienizados e queijos de primeira linha para dar o melhor sabor à sua mesa.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="bg-brand-orange/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="text-brand-black font-bold text-base font-poppins">Trabalho Feito na Hora</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Evitamos congelados industriais. Nossas sopas e jantas são preparadas diariamente no período da tarde, garantindo frescor e conservação de nutrientes essenciais.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="bg-brand-orange/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="text-brand-black font-bold text-base font-poppins">Atendimento com Carinho</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Nosso delivery é focado em solucionar as suas necessidades. Atendimento ágil, atencioso e entregadores prestativos para que sua janta seja perfeita.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
