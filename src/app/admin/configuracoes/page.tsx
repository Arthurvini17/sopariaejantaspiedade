"use client";

import React, { useState } from "react";
import { useMenu } from "@/context/menuContext";
import { Settings, Save, AlertTriangle, RefreshCw, Check } from "lucide-react";

export default function AdminConfiguracoes() {
  const { settings, updateSettings, resetToDefault } = useMenu();
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber);
  const [workingHours, setWorkingHours] = useState(settings.workingHours);
  const [address, setAddress] = useState(settings.address);
  const [instagram, setInstagram] = useState(settings.instagramUrl || "");
  
  const [successMsg, setSuccessMsg] = useState("");
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      whatsappNumber: whatsapp,
      workingHours,
      address,
      instagramUrl: instagram || undefined
    });
    setSuccessMsg("Configurações salvas com sucesso!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleResetData = () => {
    resetToDefault();
    // Reload local inputs
    setWhatsapp(settings.whatsappNumber);
    setWorkingHours(settings.workingHours);
    setAddress(settings.address);
    setInstagram(settings.instagramUrl || "");
    
    setIsResetConfirmOpen(false);
    setSuccessMsg("Todo o banco de dados local foi resetado com sucesso!");
    setTimeout(() => {
      setSuccessMsg("");
      window.location.reload(); // Hard refresh to ensure contexts reload clean
    }, 1500);
  };

  return (
    <div className="space-y-8">
      
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold font-poppins text-white">Configurações do Site</h1>
        <p className="text-sm text-gray-400">Configure as informações institucionais, WhatsApp e dados da soparia.</p>
      </div>

      {successMsg && (
        <div className="max-w-2xl bg-green-500/10 border border-green-500/25 p-4 rounded-xl flex items-center gap-2 text-green-400 text-sm">
          <Check className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Settings Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
            <h2 className="text-white font-bold text-lg font-poppins flex items-center gap-2 border-b border-white/5 pb-4">
              <Settings className="w-5 h-5 text-brand-orange" /> Informações Gerais
            </h2>

            {/* WhatsApp */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                Número do WhatsApp (Código do País + DDD + Número)
              </label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Ex: 5581999999999"
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
              />
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                Utilize o formato com o código do país (55 para o Brasil) e o DDD da sua região. Exemplo: 5581999999999.
              </p>
            </div>

            {/* Working Hours */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                Horário de Atendimento
              </label>
              <input
                type="text"
                required
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                placeholder="Ex: Terça a Domingo, das 17h às 23h"
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
              />
            </div>

            {/* Instagram URL */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                Instagram Link (URL)
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Ex: https://instagram.com/sopariamaeefilha"
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
              />
            </div>

            {/* Physical Address */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                Endereço Completo
              </label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, número, bairro, cidade - UF, CEP"
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-brand-orange text-brand-black hover:bg-brand-yellow font-extrabold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-orange/10 text-sm"
            >
              <Save className="w-4.5 h-4.5" />
              Salvar Configurações
            </button>
          </form>
        </div>

        {/* Danger zone / Reset system */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6 rounded-2xl border border-red-500/10 space-y-4">
            <h2 className="text-red-400 font-bold text-base font-poppins flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Zona de Perigo
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Deseja restaurar as configurações, pratos de demonstração, áreas de entrega e dados do CMS para o padrão inicial?
            </p>

            {isResetConfirmOpen ? (
              <div className="space-y-3 pt-2">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Você tem certeza disso?</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleResetData}
                    className="flex-grow bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Sim, Resetar Tudo
                  </button>
                  <button
                    onClick={() => setIsResetConfirmOpen(false)}
                    className="flex-grow bg-brand-dark hover:bg-brand-dark/80 text-gray-300 font-bold py-2 rounded-xl text-xs border border-white/5 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsResetConfirmOpen(true)}
                className="w-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Resetar Banco de Dados Local
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
