"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useMenu } from "@/context/menuContext";
import { Phone, MapPin, Clock, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function Contato() {
  const { settings } = useMenu();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Front-end only: save to local storage or simulate success
    const existingMessages = JSON.parse(localStorage.getItem("soparia_contact_messages") || "[]");
    const newMessage = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString("pt-BR")
    };
    localStorage.setItem("soparia_contact_messages", JSON.stringify([...existingMessages, newMessage]));
    
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent("Olá! Gostaria de falar com o atendimento da Soparia.");
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <>
      <Header />

      <main className="flex-grow bg-brand-surface py-16 text-brand-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Header intro */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold font-poppins text-brand-black mb-4">
              Fale <span className="text-brand-orange">Conosco</span> 📞
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Dúvidas, sugestões, elogios ou parcerias? Entre em contato conosco! Estamos sempre abertos a ouvir nossos clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            
            {/* Contact Details Column */}
            <div className="space-y-6">
              <h2 className="text-brand-black font-bold text-xl font-poppins mb-4">
                Informações de Contato
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-brand-black font-bold text-sm font-poppins">Endereço</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-brand-black font-bold text-sm font-poppins">Horário de Atendimento</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{settings.workingHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-brand-black font-bold text-sm font-poppins">Telefone / Celular</h3>
                    <p className="text-xs text-gray-500 mt-1">(81) 99999-9999</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Button */}
              <div className="bg-brand-orange/5 border border-brand-orange/20 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-sm">
                <h3 className="text-brand-black font-bold text-base font-poppins">Precisa de suporte rápido?</h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                  Se você tiver dúvidas sobre um pedido em andamento ou quer atendimento prioritário, converse direto com nossa equipe.
                </p>
                <button
                  onClick={handleWhatsAppChat}
                  className="bg-brand-orange hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-full transition-all text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-100"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Falar no WhatsApp
                </button>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-brand-black font-bold text-xl font-poppins mb-6">
                  Envie uma Mensagem
                </h2>

                {submitted ? (
                  <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-center space-y-3">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                    <h3 className="text-brand-black font-bold text-sm font-poppins">Mensagem Enviada!</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Agradecemos seu contato. Sua mensagem foi recebida com sucesso e entraremos em contato o mais rápido possível.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 font-poppins">
                        Seu Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: João Silva"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-black focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 font-poppins">
                        E-mail de Contato
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ex: joao@gmail.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-black focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 font-poppins">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: (81) 99999-9999"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-black focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 font-poppins">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Digite sua mensagem detalhada..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-black focus:outline-none focus:border-brand-orange focus:bg-white transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-100 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Mensagem
                    </button>
                  </form>
                )}
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
