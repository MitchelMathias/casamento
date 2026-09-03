"use client";

import { useState } from "react";
import ContributionModal from "@/components/ContributionModal";

const footerLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Pix", href: "#pix" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [contributionOpen, setContributionOpen] = useState(false);

  return (
    <footer className="border-t border-[#E5DDCF] bg-[#FAFAF7] text-[#2B2B2B]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D97736]/35 bg-[#F7F3ED] font-serif text-lg italic text-[#D97736]">
                E<span className="-ml-1 text-[#556B2F]">&amp;</span>M
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#556B2F]">Juntos, oficialmente</span>
            </div>
            <p className="mt-8 max-w-lg font-serif text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">
              Obrigado por ajudarem a transformar quatro paredes em lar.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="md:justify-self-end">
            <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D97736]">Atalhos</span>
            <div className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:flex-col sm:items-start">
              {footerLinks.map((link) => link.href === "#pix" ? (
                <button key={link.href} type="button" onClick={() => setContributionOpen(true)} className="group inline-flex items-center text-sm text-[#5E5E5E] transition-colors hover:text-[#D97736] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97736]">
                  <span className="mr-2 h-px w-0 bg-[#D97736] transition-all duration-300 group-hover:w-4" />
                  {link.label}
                </button>
              ) : (
                <a key={link.href} href={link.href} className="group inline-flex items-center text-sm text-[#5E5E5E] transition-colors hover:text-[#D97736]">
                  <span className="mr-2 h-px w-0 bg-[#D97736] transition-all duration-300 group-hover:w-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[#E5DDCF] pt-5 text-xs text-[#81786D] sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <span>© {currentYear} E&amp;M. Feito com amor e alguns boletos.</span>
          <a href="#inicio" className="group inline-flex items-center gap-2 transition-colors hover:text-[#D97736]">
            Voltar ao topo <span className="transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
      <ContributionModal isOpen={contributionOpen} onClose={() => setContributionOpen(false)} />
    </footer>
  );
}
