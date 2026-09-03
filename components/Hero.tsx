"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import HalftoneBackground from "@/components/HalftoneBackground";
import ContributionModal from "@/components/ContributionModal";
import Modal from "@/components/Modal";

const details = [
  { icon: "◷", label: "Quando", text: "Marcando em Setembro · Casamento em Dezembro" },
  { icon: "♨", label: "Depois", text: "Churrasco pós-casamento ainda a definir" },
];

const galleryImages = [1, 2, 3, 7, 8, 10, 12];

const titleWords = "Entrando oficialmente para o time dos casados! 😂".split(" ");
const easeOut = [0.16, 1, 0.3, 1] as const;

const clipReveal = {
  hidden: { opacity: 0, y: 36, clipPath: "inset(100% 0 0 0)" },
  show: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", transition: { duration: 1.15, ease: easeOut } },
};

const wordReveal = {
  hidden: { opacity: 0, y: "0.8em", rotate: 2, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: easeOut } },
};

function useMouseParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 95, damping: 18, mass: 0.42 });
  const smoothY = useSpring(mouseY, { stiffness: 95, damping: 18, mass: 0.42 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set((event.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  return { smoothX, smoothY };
}

export default function Hero() {
  const [rankingOpen, setRankingOpen] = useState(false);
  const [contributionOpen, setContributionOpen] = useState(false);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [activeImage, setActiveImage] = useState(1);

  useEffect(() => {
    if (!imageExpanded) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setImageExpanded(false);
      if (event.key === "ArrowRight") setActiveImage((current) => (current + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setActiveImage((current) => (current - 1 + galleryImages.length) % galleryImages.length);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageExpanded]);

  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % galleryImages.length);
  };
  const { smoothX, smoothY } = useMouseParallax();
  const backgroundX = useTransform(smoothX, [-1, 1], [-35, 35]);
  const backgroundY = useTransform(smoothY, [-1, 1], [-25, 25]);
  const textX = useTransform(smoothX, [-1, 1], [-46, 46]);
  const textY = useTransform(smoothY, [-1, 1], [-28, 28]);
  const textRotate = useTransform(smoothX, [-1, 1], [-1.5, 1.5]);
  const cardX = useTransform(smoothX, [-1, 1], [42, -42]);
  const cardY = useTransform(smoothY, [-1, 1], [34, -34]);
  const cardRotateX = useTransform(smoothY, [-1, 1], [9, -9]);
  const cardRotateY = useTransform(smoothX, [-1, 1], [-12, 12]);
  const accentX = useTransform(smoothX, [-1, 1], [-58, 58]);
  const accentY = useTransform(smoothY, [-1, 1], [40, -40]);
  const oliveX = useTransform(smoothX, [-1, 1], [42, -42]);
  const oliveY = useTransform(smoothY, [-1, 1], [30, -30]);

  return (
    <main className="relative isolate min-h-[calc(100svh-1rem)] overflow-hidden bg-[#FAFAF7] text-[#2B2B2B]">
      <HalftoneBackground className="z-0 opacity-55 mix-blend-multiply" />
      <motion.div
        style={{ x: backgroundX, y: backgroundY }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-40 -top-24 -z-10 h-[28rem] w-[28rem] rounded-[42%_58%_65%_35%] bg-[#D97736]/14 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: oliveX, y: oliveY }}
        animate={{ scale: [1, 0.92, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-[34rem] w-[34rem] rounded-[65%_35%_42%_58%] bg-[#556B2F]/12 blur-3xl"
        aria-hidden="true"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 -z-10 opacity-30" aria-hidden="true" />

      <section className="relative z-10 mx-auto grid min-h-[calc(100svh-1rem)] max-w-[90rem] grid-cols-1 items-center gap-12 px-5 pb-16 pt-32 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(23rem,0.8fr)] lg:gap-8 lg:px-16 lg:pb-20 lg:pt-36 xl:px-24">
        <motion.div style={{ x: textX, y: textY, rotate: textRotate }} className="relative z-20 max-w-4xl will-change-transform">
          <motion.div variants={clipReveal} initial="hidden" animate="show" className="mb-7 flex w-fit items-center gap-4 rounded-2xl border border-[#D8CDBD] bg-[#FAFAF7]/90 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#556B2F] shadow-[0_8px_20px_rgba(73,54,35,0.08)] backdrop-blur-xl sm:mb-10">
            <span className="h-px w-10 bg-[#D97736] sm:w-16" />
            <span>Uma nova fase ·</span>
          </motion.div>

          <div className="rounded-[2rem] border border-[#D8CDBD] bg-[#FAFAF7]/90 p-4 shadow-[0_16px_34px_rgba(73,54,35,0.1)] backdrop-blur-xl sm:p-6 lg:p-7">
            <motion.h1 initial="hidden" animate="show" transition={{ delayChildren: 0.25, staggerChildren: 0.08 }} aria-label="Entrando oficialmente para o time dos casados! 😂" className="max-w-5xl font-serif text-[clamp(2.75rem,6.6vw,6.5rem)] font-medium leading-[0.86] tracking-[-0.065em] text-[#2B2B2B]">
              {titleWords.map((word) => (
                <motion.span key={word} variants={wordReveal} aria-hidden="true" className={`mr-[0.2em] inline-block last:mr-0 ${word === "😂" ? "align-middle text-[0.55em]" : ""}`}>{word}</motion.span>
              ))}
            </motion.h1>

            <motion.div variants={clipReveal} initial="hidden" animate="show" transition={{ delay: 0.95, duration: 1.1, ease: easeOut }} className="mt-6 grid gap-5 rounded-2xl border border-[#D8CDBD]/80 bg-white/55 p-3.5 shadow-[0_8px_20px_rgba(73,54,35,0.06)] sm:mt-8 sm:max-w-2xl sm:grid-cols-[1fr_auto] sm:gap-8 sm:p-4">
              <p className="max-w-xl text-base leading-7 text-[#5E5E5E] sm:text-lg sm:leading-8">
                <span className="block">Felizmente vamos casar! E como a vida de recém-casados não vem com casa mobiliada, este cantinho é uma contribuição totalmente opcional para ajudar na mobília da nossa casa nova.</span>
                <span className="mt-6 block">Se, por acaso, você quiser fazer parte desse marco, qualquer quantia será muito bem-vinda. Mas não se sinta pressionado. A intenção é apenas deixar a oportunidade para quem quiser e puder abençoar esse nosso momento tão especial.</span>

              </p>
              <span className="self-end font-serif text-5xl italic leading-none text-[#D97736]/65 sm:text-6xl">E&amp;M</span>
            </motion.div>

            <motion.div variants={clipReveal} initial="hidden" animate="show" transition={{ delay: 1.18, duration: 1.1, ease: easeOut }} className="mt-7 flex flex-col gap-3 rounded-2xl border border-[#D8CDBD]/80 bg-white/55 p-2.5 shadow-[0_8px_20px_rgba(73,54,35,0.06)] sm:mt-8 sm:flex-row sm:p-3">
              <motion.button type="button" onClick={() => setContributionOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex min-h-13 items-center justify-center rounded-full bg-terracota px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(217,119,54,0.25)] transition-colors duration-300 hover:bg-[#BD6128] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97736]">
                Quero abençoar o casal ✨
              </motion.button>
              <motion.button type="button" onClick={() => setRankingOpen(true)} whileHover={{ x: 5 }} whileTap={{ scale: 0.97 }} className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#D8CDBD] bg-[#FAFAF7]/80 px-7 py-4 text-sm font-semibold text-[#5E5E5E] backdrop-blur-md transition-colors duration-300 hover:border-[#556B2F]/50 hover:text-[#556B2F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#556B2F]">
              Rank Presentes <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <div className="relative flex min-h-[25rem] items-center justify-center lg:min-h-[38rem]">
          <motion.button
            type="button"
            aria-label="Ampliar foto do casal"
            onMouseEnter={() => setImageExpanded(true)}
            onFocus={() => setImageExpanded(true)}
            onClick={() => setImageExpanded(true)}
            animate={{ rotate: imageExpanded ? 0 : 360 }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
            className="absolute left-1/2 top-0 z-30 h-32 w-32 -translate-x-1/2 overflow-hidden rounded-full border-4 border-[#FAFAF7] shadow-[0_20px_45px_rgba(73,54,35,0.2)] sm:left-auto sm:right-4 sm:top-4 sm:translate-x-0 sm:h-40 sm:w-40"
          >
            <Image src="/images/2.jpeg" alt="Momento especial do casal" fill sizes="160px" className="object-cover" priority />
            <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#2B2B2B]/55 via-transparent to-transparent pb-3 font-inter text-[9px] font-semibold uppercase tracking-[0.18em] text-white">ver foto</span>
          </motion.button>

            <motion.div style={{ x: cardX, y: cardY, rotateX: cardRotateX, rotateY: cardRotateY }} initial={{ opacity: 0, scale: 0.8, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: -4 }} transition={{ opacity: { delay: 0.8, duration: 1 }, scale: { delay: 0.8, duration: 1, ease: easeOut }, rotate: { delay: 0.8, duration: 1, ease: easeOut } }} className="relative z-20 w-[min(78vw,25rem)] [perspective:1200px]">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ delay: 1.8, duration: 5, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.03 }} className="relative overflow-hidden rounded-[2rem] border border-[#D8CDBD] bg-[#FAFAF7]/92 p-6 shadow-[0_35px_80px_rgba(73,54,35,0.2)] backdrop-blur-2xl sm:p-8">
              <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-[#D97736]/20 blur-2xl" />
              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F3ED] text-2xl text-[#D97736]">✦</span>
                <button type="button" onClick={() => setRankingOpen(true)} className="rounded-full border border-[#556B2F]/20 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#556B2F] transition-colors hover:border-[#D97736]/50 hover:text-[#D97736] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97736]">Rank Presentes</button>
              </div>
              <div className="relative mt-14">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D97736]">Para a casa nova</span>
                <span className="mt-2 block font-serif text-4xl leading-none tracking-[-0.05em] text-[#2B2B2B]">tijolo por tijolo.</span>
                <div className="mt-8 flex items-end justify-between border-t border-[#D8CDBD]/80 pt-4">
                  <span className="text-xs leading-5 text-[#5E5E5E]">Se quiser e puder,<br />toda ajuda vira lar.</span>
                  <span className="font-serif text-3xl italic text-[#556B2F]">♥</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={{ x: accentX, y: accentY }} initial={{ opacity: 0, rotate: 8 }} animate={{ opacity: 1, rotate: 8 }} transition={{ opacity: { delay: 1.45, duration: 1 }, rotate: { delay: 1.45, duration: 1, ease: easeOut } }} className="absolute bottom-2 left-1/2 z-20 w-48 -translate-x-[72%] rounded-2xl border border-[#D8CDBD] bg-[#FAFAF7]/94 p-4 text-[#2B2B2B] shadow-[0_25px_45px_rgba(73,54,35,0.16)] backdrop-blur-xl sm:bottom-5 sm:left-8 sm:translate-x-0">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#556B2F]">Promessa oficial</span>
            <span className="mt-2 block font-serif text-xl leading-tight">Churrasco depois.</span>
            <span className="mt-2 block text-[11px] text-[#5E5E5E]">data a definir, fome garantida.</span>
          </motion.div>
        </div>

        <motion.div variants={clipReveal} initial="hidden" animate="show" transition={{ delay: 1.35, duration: 1.1, ease: easeOut }} className="relative z-20 grid gap-3 border-t border-[#D8CDBD] pt-5 text-left sm:grid-cols-2 lg:col-start-1 lg:row-start-2 lg:w-[34rem] lg:border-t-0 lg:pt-0">
          {details.map((detail) => (
            <motion.div key={detail.label} whileHover={{ y: -6, rotateX: 2, rotateY: -2 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="group flex items-center gap-3 rounded-2xl border border-[#D8CDBD] bg-[#FAFAF7]/92 px-4 py-3 shadow-[0_14px_28px_rgba(73,54,35,0.12)] backdrop-blur-xl">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F3ED] text-xl text-[#D97736] transition-transform duration-300 group-hover:rotate-12">{detail.icon}</span>
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D97736]">{detail.label}</span>
                <span className="mt-1 block text-xs leading-5 text-[#5E5E5E]">{detail.text}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
        {imageExpanded && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-[#2B2B2B]/75 p-5 backdrop-blur-md sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setImageExpanded(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Foto ampliada do casal"
              initial={{ opacity: 0, scale: 0.78, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[min(88svh,52rem)] w-[min(94vw,52rem)] overflow-hidden rounded-[2rem] border border-white/60 bg-[#2B2B2B] shadow-[0_35px_100px_rgba(0,0,0,0.35)]"
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={galleryImages[activeImage]}
                  initial={{ opacity: 0, x: 48, scale: 1.04, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -48, scale: 0.98, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={`/images/${galleryImages[activeImage]}.jpeg`} alt={`Foto ${activeImage + 1} de ${galleryImages.length} do casal`} fill sizes="(max-width: 640px) 94vw, 832px" quality={100} className="object-contain" priority={activeImage === 1} />
                </motion.div>
              </AnimatePresence>
              <button type="button" onClick={showPreviousImage} aria-label="Foto anterior" className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[#2B2B2B]/45 text-2xl text-white backdrop-blur-md transition hover:bg-[#D97736] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">←</button>
              <button type="button" onClick={showNextImage} aria-label="Próxima foto" className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[#2B2B2B]/45 text-2xl text-white backdrop-blur-md transition hover:bg-[#D97736] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">→</button>
              <button type="button" onClick={() => setImageExpanded(false)} aria-label="Fechar foto ampliada" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-[#2B2B2B]/45 text-2xl text-white backdrop-blur-md transition hover:rotate-90 hover:bg-[#D97736] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">×</button>
              <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full border border-white/30 bg-[#2B2B2B]/35 px-3 py-2 backdrop-blur-md" aria-label="Selecionar foto">
                {galleryImages.map((image, index) => (
                  <button key={image} type="button" onClick={() => setActiveImage(index)} aria-label={`Abrir foto ${index + 1}`} aria-current={activeImage === index ? "true" : undefined} className={`h-2 w-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${activeImage === index ? "w-6 bg-[#F3C2A2]" : "bg-white/70 hover:bg-white"}`} />
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B2B2B]/70 to-transparent px-6 pb-6 pt-20 text-white">
                <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-[#F3C2A2]">E&amp;M · um instante para guardar</span>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body,
      )}
      <Modal isOpen={rankingOpen} onClose={() => setRankingOpen(false)} />
      <ContributionModal isOpen={contributionOpen} onClose={() => setContributionOpen(false)} />
    </main>
  );
}
