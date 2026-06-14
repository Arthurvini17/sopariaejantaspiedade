"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMenu } from "@/context/menuContext";
import {
  Utensils,
  Truck,
  Percent,
  Clock,
  ExternalLink,
  MessageSquare,
  Power,
  Trash2,
  Mail
} from "lucide-react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export default function AdminDashboard() {
  const { products, categories, deliveryAreas, promotions, settings, updateSettings } = useMenu();
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("soparia_contact_messages");
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  const handleToggleOpenStatus = () => {
    updateSettings({
      ...settings,
      isOpen: !settings.isOpen
    });
  };

  const handleDeleteMessage = (id: number) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("soparia_contact_messages", JSON.stringify(updated));
  };

  return (
    <div className="space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-poppins text-white">Dashboard</h1>
          <p className="text-sm text-gray-400">Resumo geral das operações e configurações rápidas.</p>
        </div>

        {/* Status Toggle Box */}
        <button
          onClick={handleToggleOpenStatus}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-bold font-poppins text-sm transition-all duration-300 shadow-xl cursor-pointer ${
            settings.isOpen
              ? "bg-green-500/10 border border-green-500/35 text-green-400 shadow-green-500/5 hover:bg-green-500/20"
              : "bg-red-500/10 border border-red-500/35 text-red-400 shadow-red-500/5 hover:bg-red-500/20"
          }`}
        >
          <Power className={`w-5 h-5 ${settings.isOpen ? "animate-pulse" : ""}`} />
          <span>Restaurante: {settings.isOpen ? "ABERTO" : "FECHADO"}</span>
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Categories */}
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="bg-brand-orange/10 p-3 rounded-xl">
            <Utensils className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <p className="text-2xl font-black text-white font-poppins">{categories.length}</p>
            <p className="text-xs text-gray-500 font-semibold uppercase">Categorias</p>
          </div>
        </div>

        {/* Products */}
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="bg-brand-yellow/10 p-3 rounded-xl">
            <Utensils className="w-6 h-6 text-brand-yellow" />
          </div>
          <div>
            <p className="text-2xl font-black text-white font-poppins">{products.length}</p>
            <p className="text-xs text-gray-500 font-semibold uppercase">Itens no Menu</p>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="bg-brand-orange/10 p-3 rounded-xl">
            <Truck className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <p className="text-2xl font-black text-white font-poppins">
              {deliveryAreas.filter((a) => a.isActive).length}
            </p>
            <p className="text-xs text-gray-500 font-semibold uppercase">Bairros Ativos</p>
          </div>
        </div>

        {/* Promotions */}
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="bg-brand-yellow/10 p-3 rounded-xl">
            <Percent className="w-6 h-6 text-brand-yellow" />
          </div>
          <div>
            <p className="text-2xl font-black text-white font-poppins">
              {promotions.filter((p) => p.isAvailable).length}
            </p>
            <p className="text-xs text-gray-500 font-semibold uppercase">Combos Ativos</p>
          </div>
        </div>

      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Links Shortcut Cards */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-white font-bold text-lg font-poppins">Atalhos Rápidos</h2>
          
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-3">
            <Link
              href="/admin/cardapio"
              className="w-full flex items-center justify-between p-3.5 bg-brand-dark hover:bg-brand-dark/80 rounded-xl text-sm font-semibold transition-all border border-white/5"
            >
              <span>Gerenciar Cardápio</span>
              <ExternalLink className="w-4 h-4 text-brand-orange" />
            </Link>

            <Link
              href="/admin/entrega"
              className="w-full flex items-center justify-between p-3.5 bg-brand-dark hover:bg-brand-dark/80 rounded-xl text-sm font-semibold transition-all border border-white/5"
            >
              <span>Taxas de Entrega</span>
              <ExternalLink className="w-4 h-4 text-brand-orange" />
            </Link>

            <Link
              href="/admin/configuracoes"
              className="w-full flex items-center justify-between p-3.5 bg-brand-dark hover:bg-brand-dark/80 rounded-xl text-sm font-semibold transition-all border border-white/5"
            >
              <span>Configurações do Site</span>
              <ExternalLink className="w-4 h-4 text-brand-orange" />
            </Link>

            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-between p-3.5 bg-brand-orange text-brand-black hover:bg-brand-yellow rounded-xl text-sm font-bold transition-all"
            >
              <span>Ver Site no Ar</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick instructions box */}
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-3">
            <h3 className="text-white font-bold text-sm font-poppins">Informações</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Este painel de controle funciona de maneira cliente-side e armazena os dados localmente no seu navegador (`localStorage`). Ideal para demonstrar fluxos de administração sem a necessidade de infraestruturas complexas.
            </p>
          </div>
        </div>

        {/* Contact Form Submissions Table / Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-white font-bold text-lg font-poppins flex items-center gap-2">
            <Mail className="w-5 h-5 text-brand-orange" /> Mensagens do Site
          </h2>

          <div className="glass rounded-2xl border border-white/5 overflow-hidden">
            {messages.length === 0 ? (
              <div className="p-12 text-center text-gray-500 space-y-2">
                <MessageSquare className="w-12 h-12 mx-auto text-gray-600 mb-2" />
                <p className="text-sm font-medium font-poppins">Sem mensagens recebidas</p>
                <p className="text-xs">As mensagens enviadas pelo formulário de contato do site aparecerão aqui.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-6 space-y-3 hover:bg-white/2 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-bold text-sm sm:text-base font-poppins">{msg.name}</h4>
                        <p className="text-xs text-gray-500">
                          {msg.email} &bull; {msg.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] bg-brand-dark px-2.5 py-1 rounded-full text-gray-400 border border-white/5 font-semibold">
                          {msg.date}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Excluir mensagem"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-brand-dark/40 p-4 rounded-xl border border-white/5">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
