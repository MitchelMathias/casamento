"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ContributionModal = dynamic(() => import("@/components/ContributionModal"), { ssr: false });
const ChurrascoModal = dynamic(() => import("@/components/ChurrascoModal"), { ssr: false });
const QuestionsModal = dynamic(() => import("@/components/QuestionsModal"), { ssr: false });

const links = [
  { label: "Churrasco", href: "#churrasco" },
  { label: "Possíveis perguntas", href: "#perguntas" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 top-1 block h-px w-5 bg-[#2B2B2B] transition-transform ${
          open ? "translate-y-[6px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[9px] block h-px w-5 bg-[#2B2B2B] transition-opacity ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[17px] block h-px w-5 bg-[#2B2B2B] transition-transform ${
          open ? "-translate-y-[2px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function useHeaderParallax() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 100, damping: 20, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 100, damping: 20, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reducedMotion.matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY]);

  return {
    x: useTransform(smoothX, [-1, 1], [-10, 10]),
    y: useTransform(smoothY, [-1, 1], [-5, 5]),
  };
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contributionOpen, setContributionOpen] = useState(false);
  const [churrascoOpen, setChurrascoOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const headerParallax = useHeaderParallax();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`header-glass fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[#E5DDCF]/80 bg-[#FAFAF7]/78 shadow-[0_8px_30px_rgba(73,54,35,0.09)] backdrop-blur-xl"
          : "border-transparent bg-[#FAFAF7]/62 backdrop-blur-md"
      }`}
    >
      <div className="header-glass__glow" aria-hidden="true" />
      <motion.div
        style={headerParallax}
        className="relative mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5 will-change-transform sm:px-8 lg:px-10"
      >
        <a
          href="#inicio"
          onClick={closeMenu}
          className="group flex items-center gap-3 text-[#2B2B2B]"
          aria-label="Voltar ao início"
        >
          <span className="header-logo flex h-11 w-11 items-center justify-center rounded-full border border-[#D97736]/35 bg-[#F7F3ED]/90 font-serif text-lg italic text-[#D97736] transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
            E<span className="-ml-1 text-[#556B2F]">&</span>M
          </span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.24em] sm:block">
            Juntos, oficialmente
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {links.map((link) => link.label === "Churrasco" ? (
            <button key={link.href} type="button" onClick={() => setChurrascoOpen(true)} className="header-link text-sm text-[#5E5E5E] transition-colors hover:text-[#D97736]">{link.label}</button>
          ) : link.label === "Possíveis perguntas" ? (
            <button key={link.href} type="button" onClick={() => setQuestionsOpen(true)} className="header-link text-sm text-[#5E5E5E] transition-colors hover:text-[#D97736]">{link.label}</button>
          ) : (
            <a key={link.href} href={link.href} className="header-link text-sm text-[#5E5E5E] transition-colors hover:text-[#D97736]">{link.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setContributionOpen(true)}
            className="header-cta hidden rounded-full bg-[#D97736] px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(217,119,54,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#bd6128] hover:shadow-[0_8px_20px_rgba(217,119,54,0.28)] sm:inline-flex"
          >
            Quero participar dessa <span className="ml-2" aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full border border-[#E5DDCF] p-3 md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </motion.div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-[#E5DDCF]/80 bg-[#FAFAF7]/78 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4" aria-label="Navegação mobile">
          {links.map((link) => link.label === "Churrasco" ? (
            <button key={link.href} type="button" onClick={() => { closeMenu(); setChurrascoOpen(true); }} className="rounded-xl px-3 py-3 text-left text-sm text-[#5E5E5E] hover:bg-[#F7F3ED] hover:text-[#D97736]">{link.label}</button>
          ) : link.label === "Possíveis perguntas" ? (
            <button key={link.href} type="button" onClick={() => { closeMenu(); setQuestionsOpen(true); }} className="rounded-xl px-3 py-3 text-left text-sm text-[#5E5E5E] hover:bg-[#F7F3ED] hover:text-[#D97736]">{link.label}</button>
          ) : (
            <a key={link.href} href={link.href} onClick={closeMenu} className="rounded-xl px-3 py-3 text-sm text-[#5E5E5E] hover:bg-[#F7F3ED] hover:text-[#D97736]">{link.label}</a>
          ))}
          <a
            href="#ajudar"
            onClick={(event) => {
              event.preventDefault();
              closeMenu();
              setContributionOpen(true);
            }}
            className="mt-2 rounded-full bg-[#D97736] px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Quero participar dessa <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
      <ContributionModal isOpen={contributionOpen} onClose={() => setContributionOpen(false)} />
      <ChurrascoModal isOpen={churrascoOpen} onClose={() => setChurrascoOpen(false)} />
      <QuestionsModal isOpen={questionsOpen} onClose={() => setQuestionsOpen(false)} />
    </header>
  );
}
