"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useMenu } from "@/context/menuContext";
import { MapPin, Truck, ShieldCheck, Clock, MessageSquare, Flame } from "lucide-react";

export default function Entrega() {
  const { deliveryAreas, settings } = useMenu();

  const activeAreas = deliveryAreas.filter((a) => a.isActive);

  const handleWhatsappClick = () => {
    const text = encodeURIComponent("Olá! Gostaria de consultar se entregam no meu endereço.");
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <>
      <Header />

      <main className="flex-grow bg-brand-surface py-16 text-brand-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Header intro */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold font-poppins text-brand-black mb-4">
              Área de <span className="text-brand-orange">Entrega</span> 🛵
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Atendemos diversos bairros de Piedade e região com taxa justa e entrega super rápida. Sua sopa ou janta chega quentinha!
            </p>
          </div>

          {/* Delivery Area Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Left side: List of areas */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md space-y-6">
              <h2 className="text-brand-black font-bold text-xl font-poppins flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-brand-orange" /> Bairros e Taxas
              </h2>
              
              <div className="divide-y divide-gray-100">
                {activeAreas.map((area) => (
                  <div key={area.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-brand-yellow shrink-0" />
                      <div>
                        <p className="text-brand-black font-bold text-sm sm:text-base font-poppins">{area.name}</p>
                        <p className="text-xs text-gray-500">Prazo médio: {area.deliveryTimeMinutes} min</p>
                      </div>
                    </div>
                    <span className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full font-poppins">
                      R$ {area.deliveryFee.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Information and details */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md space-y-6">
                <h2 className="text-brand-black font-bold text-xl font-poppins flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-orange" /> Nosso Compromisso
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="bg-brand-orange/10 p-2.5 rounded-lg shrink-0">
                      <Flame className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="text-brand-black font-bold text-sm font-poppins">Refeição Quentinha</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        Utilizamos bolsas térmicas profissionais de última geração que mantêm a temperatura da sua sopa ou jantar desde a cozinha até a sua porta.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="bg-brand-yellow/10 p-2.5 rounded-lg shrink-0">
                      <Clock className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <div>
                      <h3 className="text-brand-black font-bold text-sm font-poppins">Entrega Express</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        Nossa logística local e equipe dedicada garantem que seu pedido seja despachado assim que estiver pronto, sem atrasos desnecessários.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Callout box */}
              <div className="bg-gradient-to-r from-brand-orange to-brand-yellow p-6 rounded-2xl text-brand-black flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="font-extrabold text-base sm:text-lg">Não achou seu bairro?</p>
                  <p className="text-xs text-brand-black/75 mt-0.5">Consulte nossa equipe agora no WhatsApp.</p>
                </div>
                <button
                  onClick={handleWhatsappClick}
                  className="bg-brand-black text-white hover:bg-brand-black/90 active:scale-95 text-xs font-bold px-5 py-3 rounded-full flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Consultar Local
                </button>
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
