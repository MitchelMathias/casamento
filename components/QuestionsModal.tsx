"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

type QuestionsModalProps = { isOpen: boolean; onClose: () => void };

const sections = [
  {
    title: "FAQ Descontraído",
    eyebrow: "Perguntas & respostas",
    content: (
      <div className="space-y-3">
        <details className="group rounded-xl border border-[#E5DDCF] bg-white/60 p-4"><summary className="cursor-pointer list-none pr-6 font-inter text-sm font-semibold marker:hidden">Preciso levar presente físico ou posso só mandar o Pix?</summary><p className="mt-3 font-inter text-sm leading-6 text-[#5E5E5E]">Pode mandar o Pix, um abraço, uma mensagem bonita ou simplesmente aparecer no dia do churrasco. O Pix pode ser feito agora mesmo, vai lá seu rico.</p></details>
        <details className="group rounded-xl border border-[#E5DDCF] bg-white/60 p-4"><summary className="cursor-pointer list-none pr-6 font-inter text-sm font-semibold">O que vestir para comer churrasco?</summary><p className="mt-3 font-inter text-sm leading-6 text-[#5E5E5E]">É coisa simples, tando de roupa ta bão ksksksk</p></details>
        <details className="group rounded-xl border border-[#E5DDCF] bg-white/60 p-4"><summary className="cursor-pointer list-none pr-6 font-inter text-sm font-semibold">Até que horas o noivo pode tentar fugir para pescar?</summary><p className="mt-3 font-inter text-sm leading-6 text-[#5E5E5E]">Tchê essa nem eu sei. Vou perguntar pra Mulher se eu quero ksksksksk</p></details>
      </div>
    ),
  },
  {
    title: "Estatísticas do Casal",
    eyebrow: "Em números",
    content: (
      <div className="grid gap-3 sm:grid-cols-2">
        {[ ["∞", "Litros de café"], ["42k", "De pensamentos de quanto vai faltar ksksk"], ["03", "Meses entendendo o contrato"], ["07", "Panelas arremessadas na simulação"] ].map(([value, label]) => <div key={label} className="rounded-xl border border-[#E5DDCF] bg-white/60 p-4"><span className="font-syne text-3xl font-semibold text-[#D97736]">{value}</span><p className="mt-2 font-inter text-xs leading-5 text-[#5E5E5E]">{label}</p></div>)}
      </div>
    ),
  },
  {
    title: "Guia de Sobrevivência da Casa Nova",
    eyebrow: "Itens essenciais, segundo a ciência",
    content: (
      <div className="space-y-3 font-inter text-sm leading-6 text-[#5E5E5E]">
        <p className="rounded-xl border border-[#E5DDCF] bg-white/60 p-4"><strong className="text-[#2B2B2B]">Geladeira:</strong> para guardar comida, bebidas e a esperança de cozinhar durante a semana.</p>
        <p className="rounded-xl border border-[#E5DDCF] bg-white/60 p-4"><strong className="text-[#2B2B2B]">Panelas:</strong> porque pedir delivery todos os dias é um plano financeiro ousado.</p>
        <p className="rounded-xl border border-[#E5DDCF] bg-white/60 p-4"><strong className="text-[#2B2B2B]">Sofá:</strong> o centro oficial das reuniões, cochilos e discussões sobre a Netflix.</p>
      </div>
    ),
  },
  {
    title: "O Tribunal do Casamento",
    eyebrow: "Quem faz o quê",
    content: (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[#E5DDCF] bg-white/60 p-4 font-inter text-sm leading-6 text-[#5E5E5E]">Escolhe o que assistir na Netflix:<br /><strong className="text-[#D97736]">Noiva</strong> — pesquisa por 40 minutos<br /><strong className="text-[#D97736]">Noivo</strong> — diz “tanto faz”</div>
        <div className="rounded-xl border border-[#E5DDCF] bg-white/60 p-4 font-inter text-sm leading-6 text-[#5E5E5E]">Responsável por queimar o arroz:<br /><strong className="text-[#D97736]">Quem estiver cozinhando</strong> — a investigação continua</div>
        <div className="rounded-xl border border-[#E5DDCF] bg-white/60 p-4 font-inter text-sm leading-6 text-[#5E5E5E] sm:col-span-2">Teve a brilhante ideia de casar:<br /><strong className="text-[#D97736]">Ambos</strong> — e agora não adianta pedir reembolso.</div>
      </div>
    ),
  },
  {
    title: "A Linha do Tempo da Mudança",
    eyebrow: "Saga imobiliária oficial",
    content: (
      <div className="space-y-4 border-l border-[#D97736]/40 pl-5 font-inter text-sm text-[#5E5E5E]">
        <p><strong className="text-[#D97736]">Junho:</strong> a brilhante ideia de morar juntos.</p>
        <p><strong className="text-[#D97736]">Julho:</strong> o choque de realidade com os preços de aluguel.</p>
        <p><strong className="text-[#D97736]">Agosto:</strong> a caça ao tesouro por móveis baratos na internet.</p>
        <p><strong className="text-[#D97736]">Criação do site a matemática não bate:</strong> o casamento e a abertura oficial para pagar os boletos.</p>
      </div>
    ),
  },
];

export default function QuestionsModal({ isOpen, onClose }: QuestionsModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKeyDown); };
  }, [isOpen, onClose]);

  return typeof document !== "undefined" ? createPortal(
    <AnimatePresence>
      {isOpen && <motion.div className="mobile-modal-backdrop fixed inset-0 z-[130] flex items-center justify-center bg-[#2B2B2B]/75 p-4 backdrop-blur-md sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
        <motion.div role="dialog" aria-modal="true" aria-labelledby="questions-title" initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }} className="mobile-modal-panel relative max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/70 bg-[#FAFAF7] p-6 text-[#2B2B2B] shadow-[0_30px_90px_rgba(24,20,16,0.35)] sm:p-9">
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fechar possíveis perguntas" className="modal-close-button absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CDBD] text-xl text-[#5E5E5E] transition hover:rotate-90 hover:border-[#D97736] hover:text-[#D97736] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97736]">×</button>
          <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D97736]">Manual não oficial</span>
          <h2 id="questions-title" className="mt-3 max-w-lg font-syne text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">Possíveis perguntas.</h2>
          <p className="mt-3 max-w-xl font-inter text-sm leading-6 text-[#5E5E5E]">Tudo o que você precisa saber sobre a mudança, o churrasco e as decisões questionáveis que nos trouxeram até aqui.</p>
          <div className="mt-7 space-y-3">{sections.map((section) => <details key={section.title} className="group rounded-2xl border border-[#D8CDBD] bg-white/45 p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-syne text-lg font-semibold tracking-[-0.03em]"><span><span className="mb-1 block font-inter text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D97736]">{section.eyebrow}</span>{section.title}</span><span className="text-2xl font-light text-[#D97736] transition-transform group-open:rotate-45">+</span></summary><div className="pt-5">{section.content}</div></details>)}</div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>, document.body,
  ) : null;
}
