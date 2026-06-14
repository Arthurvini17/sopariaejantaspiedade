"use client";

import React, { useState } from "react";
import { useMenu } from "@/context/menuContext";
import { DeliveryArea } from "@/types";
import { Edit2, Save, X, Truck, ToggleLeft, ToggleRight, Check } from "lucide-react";

export default function AdminEntrega() {
  const { deliveryAreas, updateDeliveryArea } = useMenu();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fee, setFee] = useState("");
  const [time, setTime] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleStartEdit = (area: DeliveryArea) => {
    setEditingId(area.id);
    setFee(area.deliveryFee.toString());
    setTime(area.deliveryTimeMinutes.toString());
    setSuccessMsg("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = (area: DeliveryArea) => {
    updateDeliveryArea({
      ...area,
      deliveryFee: parseFloat(fee) || 0,
      deliveryTimeMinutes: parseInt(time) || 0
    });
    setEditingId(null);
    setSuccessMsg(`Área "${area.name}" atualizada com sucesso!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleToggleActive = (area: DeliveryArea) => {
    updateDeliveryArea({
      ...area,
      isActive: !area.isActive
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold font-poppins text-white">Áreas de Entrega</h1>
        <p className="text-sm text-gray-400">Configure as taxas de entrega e tempos estimados por bairro.</p>
      </div>

      {successMsg && (
        <div className="max-w-2xl bg-green-500/10 border border-green-500/25 p-4 rounded-xl flex items-center gap-2 text-green-400 text-sm">
          <Check className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Delivery Areas Table/Grid */}
      <div className="max-w-3xl glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-2">
          <Truck className="w-5 h-5 text-brand-orange" />
          <h2 className="text-white font-bold text-base font-poppins">Configurações de Cobertura</h2>
        </div>

        <div className="divide-y divide-white/5">
          {deliveryAreas.map((area) => {
            const isEditing = editingId === area.id;
            return (
              <div key={area.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                {/* Info row */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleToggleActive(area)}
                    className="text-gray-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                    title={area.isActive ? "Desativar Bairro" : "Ativar Bairro"}
                  >
                    {area.isActive ? (
                      <ToggleRight className="w-9 h-9 text-brand-orange" />
                    ) : (
                      <ToggleLeft className="w-9 h-9 text-gray-600" />
                    )}
                  </button>

                  <div>
                    <h3 className={`font-bold text-base font-poppins ${area.isActive ? "text-white" : "text-gray-600 line-through"}`}>
                      {area.name}
                    </h3>
                    {!isEditing && (
                      <p className="text-xs text-gray-500">
                        Taxa: R$ {area.deliveryFee.toFixed(2)} &bull; Tempo: {area.deliveryTimeMinutes} min
                      </p>
                    )}
                  </div>
                </div>

                {/* Controls row */}
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <div className="flex items-center gap-2.5">
                      <div className="w-24">
                        <label className="block text-[8px] font-bold text-gray-500 uppercase mb-1">Taxa (R$)</label>
                        <input
                          type="number"
                          step="0.10"
                          value={fee}
                          onChange={(e) => setFee(e.target.value)}
                          className="w-full bg-brand-black border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div className="w-24">
                        <label className="block text-[8px] font-bold text-gray-500 uppercase mb-1">Tempo (min)</label>
                        <input
                          type="number"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-brand-black border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 pt-4">
                        <button
                          onClick={() => handleSave(area)}
                          className="bg-brand-orange text-brand-black hover:bg-brand-yellow p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Salvar"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-brand-dark text-gray-400 hover:text-white p-1.5 rounded-lg border border-white/5 transition-colors cursor-pointer"
                          title="Cancelar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStartEdit(area)}
                      disabled={!area.isActive}
                      className="bg-brand-dark border border-white/5 text-gray-400 hover:text-white hover:border-brand-orange/30 disabled:opacity-30 disabled:pointer-events-none p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-brand-yellow" />
                      Editar
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
