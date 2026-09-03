"use client";

import { useEffect } from "react";

export default function PerformanceTuning() {
  useEffect(() => {
    const isWindows = /Windows/i.test(navigator.userAgent);
    if (!isWindows) return;

    document.documentElement.classList.add("windows-performance");
    return () => document.documentElement.classList.remove("windows-performance");
  }, []);

  return null;
}
