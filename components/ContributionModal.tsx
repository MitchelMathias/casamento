"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

type ContributionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContributionModal({ isOpen, onClose }: ContributionModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  const copyPixKey = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText("02946689000");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = "02946689000";
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

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
          className="mobile-modal-backdrop fixed inset-0 z-[130] flex items-center justify-center bg-[#2B2B2B]/70 p-5 backdrop-blur-md sm:p-8"
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
            aria-labelledby="contribution-title"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-modal-panel relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/70 bg-[#FAFAF7] p-6 text-[#2B2B2B] shadow-[0_30px_90px_rgba(24,20,16,0.32)] sm:p-9"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#D97736]/15 blur-3xl" aria-hidden="true" />
            <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fechar contribuição" className="modal-close-button absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CDBD] text-xl text-[#5E5E5E] transition hover:rotate-90 hover:border-[#D97736] hover:text-[#D97736] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97736]">×</button>

            <div className="relative">
              <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D97736]">Com carinho, sem compromisso</span>
              <h2 id="contribution-title" className="mt-3 max-w-md font-syne text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">Obrigado por fazer parte da nossa história.</h2>
              <p className="mt-4 max-w-lg font-inter text-sm leading-6 text-[#5E5E5E]">Se você quiser e puder contribuir com essa nova jornada, escolha o valor que fizer sentido para você. Qualquer quantia será recebida com muita alegria — e, se não for possível agora, o seu carinho já significa muito para nós.</p>

              <div className="mt-7 grid items-center gap-6 sm:grid-cols-[150px_1fr]">
                <div className="rounded-2xl border border-[#E5DDCF] bg-white p-3 shadow-[0_10px_24px_rgba(73,54,35,0.08)]">
                  <Image src="/images/QrCode.png" alt="QR Code para contribuição via Pix" width={320} height={320} className="aspect-square w-full object-contain" />
                </div>
                <div className="font-inter">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D97736]">Ou use a chave Pix</span>
                  <div className="mt-2 flex items-stretch overflow-hidden rounded-xl border border-[#E5DDCF] bg-white/70">
                    <p className="min-w-0 flex-1 px-4 py-3 text-sm font-semibold tracking-[0.08em] text-[#2B2B2B]">02946689000</p>
                    <button type="button" onClick={copyPixKey} aria-label="Copiar chave Pix" className="shrink-0 border-l border-[#E5DDCF] px-3 text-xs font-semibold text-[#D97736] transition-colors hover:bg-[#F7F3ED] hover:text-[#BD6128] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D97736]">
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-[#81786D]">Não existe valor certo ou obrigação. Seu carinho e amizade já são presentes enormes.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  ) : null;
}
