"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const gifts = [
  { position: "01", name: "Viagem para Capão do Leão", giver: "Luciano" },
  { position: "02", name: "Geladeira Nova", giver: "Cleber e Jania" },
  { position: "03", name: "Pix de R$ 150", giver: "Anônimo" },
];

export default function Modal({ isOpen, onClose }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement.current?.focus();
      previouslyFocusedElement.current = null;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-[#2B2B2B]/55 p-5 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ranking-title"
            aria-describedby="ranking-description"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.92, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-modal-panel relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/70 bg-[#FAFAF7] p-6 text-[#2B2B2B] shadow-[0_30px_90px_rgba(24,20,16,0.28)] sm:p-9"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#D97736]/12 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D97736]">Lista de desejos</span>
                  <h2 id="ranking-title" className="mt-3 font-syne text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Rank Presentes</h2>
                  <p id="ranking-description" className="mt-3 max-w-sm font-inter text-sm leading-6 text-[#5E5E5E]">Os presentes.</p>
                </div>
                <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fechar ranking de presentes" className="modal-close-button relative z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8CDBD] text-[#5E5E5E] transition-all hover:rotate-90 hover:border-[#D97736] hover:text-[#D97736] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97736]">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                    <path d="m4 4 12 12M16 4 4 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>

              <div className="mt-8 space-y-3">
                {gifts.map((gift) => (
                  <div key={gift.position} className="flex items-center gap-4 rounded-2xl border border-[#E5DDCF] bg-white/65 p-4 shadow-[0_8px_20px_rgba(73,54,35,0.05)]">
                    <span className="font-syne text-sm font-semibold text-[#D97736]">{gift.position}</span>
                    <span className="h-8 w-px bg-[#E5DDCF]" aria-hidden="true" />
                    <span className="min-w-0 flex-1 font-inter">
                      <span className="block text-sm font-semibold text-[#2B2B2B]">{gift.name}</span>
                      <span className="mt-1 block text-xs text-[#81786D]">por {gift.giver}</span>
                    </span>
                    <span className="text-lg text-[#556B2F]" aria-hidden="true">✦</span>
                  </div>
                ))}
              </div>

              <p className="mt-7 font-inter text-xs leading-5 text-[#81786D]">Cada ajuda é opcional — o carinho já é o presente mais importante.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
