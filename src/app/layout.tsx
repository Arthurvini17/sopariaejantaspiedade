import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/context/menuContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Soparia e Jantas Mãe e Filha | A Melhor Soparia da Região! 🧡",
  description: "Peça as melhores sopas, caldos e jantas no conforto do seu lar com a Soparia Mãe e Filha. Entrega super rápida, comida quentinha e sabor irresistível. Peça já pelo WhatsApp!",
  keywords: [
    "Soparia Mãe e Filha",
    "sopariamaeefilha",
    "Soparia em Piedade",
    "Sopas delivery em Piedade",
    "Jantas em Piedade",
    "Caldos em Piedade",
    "Melhor sopa de Piedade"
  ],
  openGraph: {
    title: "Soparia e Jantas Mãe e Filha | A Melhor Soparia da Região",
    description: "Receba sopas, caldos e jantas deliciosas no conforto da sua casa. Entrega rápida, sabor incomparável e atendimento de primeira com a Soparia Mãe e Filha.",
    type: "website",
    locale: "pt_BR",
    url: "https://sopariamaeefilha.com.br",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-surface text-brand-black selection:bg-brand-orange selection:text-white">
        <MenuProvider>
          {children}
        </MenuProvider>
      </body>
    </html>
  );
}
