"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useMenu } from "@/context/menuContext";
import { motion } from "framer-motion";
import {
  Flame,
  Truck,
  Sparkles,
  HeartHandshake,
  Clock,
  ChevronDown,
  MapPin,
  ChevronRight,
  Star,
  Utensils
} from "lucide-react";

export default function Home() {
  const { promotions, settings, deliveryAreas } = useMenu();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const activePromotions = promotions.filter((p) => p.isAvailable);
  const activeAreas = deliveryAreas.filter((a) => a.isActive);

  const orderPromotionWhatsApp = (name: string, price: number) => {
    const text = `Olá! Gostaria de pedir o combo "${name}" (R$ ${price.toFixed(2)}) que vi no site.`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleGeneralOrderClick = () => {
    const text = `Olá! Gostaria de fazer um pedido de sopas e caldos.`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const faqItems = [
    {
      question: "Qual o tempo médio de entrega?",
      answer: "Nosso tempo médio de entrega varia de 25 a 45 minutos, dependendo do bairro selecionado. Preparamos tudo com cuidado para que seu pedido chegue bem quentinho!"
    },
    {
      question: "Como faço meu pedido?",
      answer: "É super simples! Você pode navegar pelo nosso cardápio digital, clicar no item que deseja pedir e será redirecionado para o nosso WhatsApp, onde fechamos seu pedido de forma personalizada e humanizada."
    },
    {
      question: "Vocês entregam na minha região?",
      answer: "Entregamos nos bairros de Piedade, Jardim Piedade, Candeias, Prazeres, Cajueiro Seco e Coquinho. Verifique nossa página de entrega para taxas detalhadas."
    },
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer: "Aceitamos Pix, cartões de crédito e débito (levamos a maquineta até você) e dinheiro em espécie."
    }
  ];

  const testimonials = [
    {
      name: "Mariana Souza",
      role: "Moradora de Piedade",
      comment: "A sopa de frango é maravilhosa! Chega super rápida e muito quente. Pedi e em 20 minutos já estava na minha mesa. Recomendo demais!",
      rating: 5
    },
    {
      name: "Carlos Alberto",
      role: "Morador de Candeias",
      comment: "Melhor caldo de kenga da região. Os adicionais de queijo coalho ralado e torrada caseira dão um toque todo especial. Atendimento excelente pelo WhatsApp.",
      rating: 5
    },
    {
      name: "Fernanda Lima",
      role: "Trabalhadora local",
      comment: "Comida caseira de verdade! O cuscuz completo charque acebolada é divino. Prático para pedir depois de um dia longo de trabalho.",
      rating: 5
    }
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Header />
      
      <main className="flex-grow bg-brand-surface text-brand-black">
        {/* Hero Section */}
        <section className="relative hero-gradient overflow-hidden bg-brand-surface">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 items-center gap-12">
            {/* Conteúdo Textual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 relative z-10"
            >
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full text-brand-orange font-bold text-sm">
                <span className="animate-pulse">🔥</span> Sempre Quentinha
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold leading-tight">
                A MELHOR SOPARIA DE <span className="text-brand-orange">PIEDADE</span> E REGIÃO! 🧡
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Receba sopas, caldos e jantas deliciosas no conforto da sua casa. Entrega rápida, sabor incomparável e atendimento que conquista nossos clientes todos os dias.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleGeneralOrderClick}
                  className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all transform hover:scale-105 shadow-xl shadow-orange-200 group cursor-pointer"
                >
                  Pedir Agora
                  <svg className="group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                </button>
                <Link
                  href="/cardapio"
                  className="border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all transform hover:scale-105"
                >
                  Ver Cardápio
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </Link>
              </div>
            </motion.div>

            {/* Imagem Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-xl mx-auto">
                <div className="absolute inset-0 bg-brand-yellow/20 blob-shape rotate-12 scale-105 blur-2xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop"
                  alt="Sopa de Frango Fumegante"
                  className="relative z-10 w-full h-full object-cover shadow-2xl rounded-full border-[12px] border-white"
                />
                {/* Badge de Avaliação */}
                <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce-slow text-brand-black">
                  <div className="bg-brand-yellow p-3 rounded-xl text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Avaliação Média</p>
                    <p className="text-2xl font-headline font-black text-brand-black">4.9/5</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Promotions Section */}
        {activePromotions.length > 0 && (
          <section className="py-20 bg-brand-surface border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange font-poppins mb-2">
                  Ofertas Imperdíveis
                </h2>
                <h3 className="text-3xl sm:text-4xl font-extrabold font-poppins text-brand-black">
                  Combos Promocionais 🏷️
                </h3>
                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                  Aproveite nossos combos especiais e economize no seu jantar hoje à noite.
                </p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {activePromotions.map((promo) => (
                  <motion.div
                    key={promo.id}
                    variants={fadeInUpVariants}
                    className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between border border-gray-100 hover:border-brand-orange/30 transition-all duration-300 shadow-md"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={promo.imageUrl}
                        alt={promo.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-brand-orange text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg font-poppins uppercase tracking-wider">
                        Destaque
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between bg-white text-brand-black">
                      <div>
                        <h4 className="text-brand-black font-bold text-lg mb-2 font-poppins group-hover:text-brand-orange transition-colors">
                          {promo.name}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">
                          {promo.description}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between mb-4 border-t border-gray-100 pt-4">
                          <span className="text-gray-400 text-xs uppercase font-medium">Preço Combo</span>
                          <span className="text-2xl font-extrabold text-brand-orange font-poppins">
                            R$ {promo.price.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => orderPromotionWhatsApp(promo.name, promo.price)}
                          className="w-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange hover:bg-brand-orange hover:text-white font-bold py-2.5 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Flame className="w-4 h-4" />
                          Pedir Combo
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50/50 border-t border-b border-gray-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange font-poppins mb-2">
                Nossos Pilares
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-poppins text-brand-black">
                Por que escolher nossa soparia? 🤔
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  icon: <Sparkles className="w-7 h-7 text-brand-orange" />,
                  title: "Mais sabor",
                  desc: "Receitas caseiras exclusivas cheias de afeto e tempero no ponto certo."
                },
                {
                  icon: <Flame className="w-7 h-7 text-brand-orange" />,
                  title: "Ingredientes frescos",
                  desc: "Legumes comprados diariamente e carnes rigorosamente selecionadas."
                },
                {
                  icon: <Truck className="w-7 h-7 text-brand-orange" />,
                  title: "Entrega rápida",
                  desc: "Entregadores dedicados para fazer a refeição chegar fumegando."
                },
                {
                  icon: <HeartHandshake className="w-7 h-7 text-brand-orange" />,
                  title: "Atendimento humano",
                  desc: "Equipe focada em te dar a melhor experiência e carinho no WhatsApp."
                },
                {
                  icon: <Utensils className="w-7 h-7 text-brand-orange" />,
                  title: "Tradição local",
                  desc: "Compromisso de alimentar as famílias de Piedade com qualidade máxima."
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl hover:bg-gray-50/20 border border-gray-100 hover:border-brand-orange/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="bg-brand-orange/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-brand-black font-bold text-base mb-2 font-poppins">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Areas Section */}
        <section className="py-20 bg-brand-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange font-poppins mb-2">
                Logística de Entrega
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-poppins text-brand-black">
                Atendemos sua região 📍
              </h3>
              <p className="text-brand-orange font-bold mt-2 font-poppins flex items-center justify-center gap-1.5">
                <Truck className="w-5 h-5 animate-pulse" /> Entrega rápida em toda a região.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {activeAreas.map((area) => (
                <div
                  key={area.id}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center hover:border-brand-orange/30 transition-all"
                >
                  <div className="bg-brand-yellow/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <h4 className="text-brand-black font-bold text-sm font-poppins mb-1">{area.name}</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-semibold">Taxa: R$ {area.deliveryFee.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-400">{area.deliveryTimeMinutes} min</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/entrega"
                className="inline-flex items-center space-x-2 text-brand-orange hover:text-brand-orange/80 font-bold text-sm transition-colors"
              >
                <span>Ver tabela de entregas detalhada</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50/50 border-t border-b border-gray-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange font-poppins mb-2">
                Opinião dos Clientes
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-poppins text-brand-black">
                Quem provou, aprovou! 🧡
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic mb-6">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-brand-black font-bold text-sm font-poppins">{t.name}</h4>
                    <p className="text-xs text-brand-orange mt-0.5">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-brand-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange font-poppins mb-2">
                Dúvidas Comuns
              </h2>
              <h3 className="text-3xl font-extrabold font-poppins text-brand-black">
                Perguntas Frequentes 💬
              </h3>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, idx) => {
                const isActive = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(isActive ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                    >
                      <span className="text-brand-black font-bold text-sm sm:text-base font-poppins">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-brand-orange transition-transform duration-300 shrink-0 ml-4 ${
                          isActive ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                    {isActive && (
                      <div className="px-6 pb-5 border-t border-gray-50 pt-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Maps and Info Section */}
        <section className="py-20 bg-gray-50/50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Location details */}
              <div className="space-y-6">
                <h3 className="text-3xl font-extrabold font-poppins text-brand-black leading-tight">
                  Venha nos conhecer ou solicite a sua entrega!
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Estamos localizados estrategicamente na principal avenida de Piedade para atender com a maior agilidade possível todos os bairros da redondeza. Venha retirar ou receba em casa!
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-brand-black font-bold text-sm font-poppins">Nosso Endereço</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{settings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-brand-black font-bold text-sm font-poppins">Horário de Funcionamento</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{settings.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-200 shadow-xl relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.030588636413!2d-34.925585023985474!3d-8.199671191832047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1fa49fe0b64d%3A0xe543e020272b0c36!2sAv.%20Bernardo%20Vieira%20de%20Melo%2C%203500%20-%20Piedade%2C%20Jaboat%C3%A3o%20dos%20Guararapes%20-%20PE%2C%2054410-010!5e0!3m2!1spt-BR!2sbr!4v1715629000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Localização"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-24 bg-gradient-to-br from-brand-orange to-brand-yellow text-brand-black text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent -z-10"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <h3 className="text-3xl sm:text-5xl font-extrabold font-poppins mb-6">
              Está com fome? Seu pedido chega quentinho até você!
            </h3>
            <p className="text-brand-black/80 max-w-xl mx-auto text-base sm:text-lg mb-8 font-medium">
              Não espere mais. Peça agora a sua sopa, caldo ou jantar favorito e comprove o melhor sabor da região no aconchego da sua casa.
            </p>
            <button
              onClick={handleGeneralOrderClick}
              className="inline-flex items-center justify-center bg-brand-black text-white hover:bg-brand-black/90 active:scale-95 font-extrabold text-lg sm:text-xl px-12 py-5 rounded-full shadow-2xl transition-all tracking-wide cursor-pointer"
            >
              PEDIR AGORA NO WHATSAPP
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
