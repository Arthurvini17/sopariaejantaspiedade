"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, Heart } from "lucide-react";
import { useMenu } from "@/context/menuContext";

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  const { settings } = useMenu();

  return (
    <footer className="bg-brand-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <span className="text-3xl font-headline font-bold text-brand-orange flex items-center gap-2">
            Soparia Mãe e Filha
          </span>
          <p className="text-gray-400">
            Entregando carinho e sabor em cada colherada. A melhor opção de jantar para sua família em Piedade.
          </p>
          {settings.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-brand-orange hover:text-brand-yellow transition-colors font-medium text-sm"
            >
              <InstagramIcon className="w-5 h-5" />
              <span>@sopariamaeefilha</span>
            </a>
          )}
        </div>

        {/* Menu Column */}
        <div>
          <h4 className="font-headline font-bold text-xl mb-6">Menu</h4>
          <ul className="space-y-4 text-gray-400">
            <li>
              <Link href="/cardapio" className="hover:text-brand-orange transition-colors">Sopas</Link>
            </li>
            <li>
              <Link href="/cardapio" className="hover:text-brand-orange transition-colors">Caldos</Link>
            </li>
            <li>
              <Link href="/cardapio" className="hover:text-brand-orange transition-colors">Jantas</Link>
            </li>
            <li>
              <Link href="/promocoes" className="hover:text-brand-orange transition-colors">Promoções</Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="font-headline font-bold text-xl mb-6">Legal</h4>
          <ul className="space-y-4 text-gray-400">
            <li>
              <Link href="#" className="hover:text-brand-orange transition-colors">Privacidade</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-brand-orange transition-colors">Termos de Uso</Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-headline font-bold text-xl mb-6">Contato</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <span className="leading-relaxed">{settings.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-orange shrink-0" />
              <span>(81) 99999-9999</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Horário de Delivery</p>
                <p className="text-xs text-gray-400 mt-0.5">{settings.workingHours}</p>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Soparia Mãe e Filha. Todos os direitos reservados.</p>
        <p className="flex items-center gap-1 mt-2 md:mt-0">
          Feito com <Heart className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" /> em Piedade, Jaboatão dos Guararapes - PE
        </p>
      </div>
    </footer>
  );
};
