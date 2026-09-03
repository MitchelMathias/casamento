"use client";

import { ReactNode, useEffect, useState } from "react";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 350);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready) {
    return (
      <div className="page-loader" role="status" aria-label="Carregando a página">
        <span className="page-loader__mark">E<span>&amp;</span>M</span>
        <span className="page-loader__line" aria-hidden="true" />
      </div>
    );
  }

  return children;
}
