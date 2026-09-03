"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

type ChurrascoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChurrascoModal({ isOpen, onClose }: ChurrascoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return typeof document !== "undefined" ? createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-modal-backdrop fixed inset-0 z-[130] flex items-center justify-center bg-[#2B2B2B]/75 p-5 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="churrasco-title"
            initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-modal-panel relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/70 bg-[#FAFAF7] text-[#2B2B2B] shadow-[0_30px_90px_rgba(24,20,16,0.35)]"
          >
            <div className="relative h-[min(58svh,31rem)] w-full bg-[#2B2B2B]">
              <Image src="/images/Churrasco.png" alt="Churrasco que ainda vamos preparar" fill sizes="(max-width: 640px) 100vw, 672px" quality={100} className="object-contain" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/65 via-transparent to-transparent" />
              <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fechar modal do churrasco" className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-[#2B2B2B]/40 text-2xl text-white backdrop-blur-md transition hover:rotate-90 hover:bg-[#D97736] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">×</button>
            </div>
            <div className="relative p-6 sm:p-9">
              <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D97736]">Um plano delicioso</span>
              <h2 id="churrasco-title" className="mt-3 font-syne text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">Esse vai sair logo.</h2>
              <p className="mt-4 font-inter text-sm leading-6 text-[#5E5E5E]">Pra ti que gosta de churrasco e está só esperando por ele, assim como eu: esse vai sair assim que a gente tiver um cantinho para fazer.</p>
              <p className="mt-5 border-t border-[#E5DDCF] pt-5 font-inter text-sm leading-6 text-[#5E5E5E]">A todos os nossos amigos e familiares, muito obrigado por ajudarem a transformar esse sonho em realidade.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  ) : null;
}
