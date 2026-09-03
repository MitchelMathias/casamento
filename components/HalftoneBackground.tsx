"use client";

import { useEffect, useRef } from "react";

type HalftoneBackgroundProps = {
  className?: string;
};

export default function HalftoneBackground({ className = "" }: HalftoneBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let reducedMotion = false;
    let isPageVisible = document.visibilityState === "visible";
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const lowPowerDevice = (navigator.hardwareConcurrency || 4) <= 4 || connection?.saveData === true;
    const startedAt = performance.now();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (now: number) => {
      const elapsed = reducedMotion ? 0 : (now - startedAt) * 0.00045;
      const spacing = width < 640 ? 16 : 19;
      const columns = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const centerX = width * 0.57;
      const centerY = height * 0.45;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#000000";

      for (let row = -1; row < rows; row += 1) {
        const baseY = row * spacing;

        for (let column = -1; column < columns; column += 1) {
          const baseX = column * spacing;
          const distanceX = (baseX - centerX) / Math.max(width, 1);
          const distanceY = (baseY - centerY) / Math.max(height, 1);
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const primaryWave = Math.sin(baseX * 0.018 + elapsed * 3.1);
          const secondaryWave = Math.cos(baseY * 0.022 - elapsed * 2.35);
          const diagonalWave = Math.sin((baseX + baseY) * 0.011 + elapsed * 1.8);
          const depthWave = Math.sin(distance * 25 - elapsed * 4.2) * 0.5 + 0.5;
          const depth = Math.min(1, Math.max(0, depthWave * 0.62 + (diagonalWave * 0.5 + 0.5) * 0.38));
          const displacement = 5 + depth * 11;
          const x = baseX + (primaryWave * 0.65 + diagonalWave * 0.35) * displacement;
          const y = baseY + (secondaryWave * 0.62 + primaryWave * 0.38) * displacement;
          const perspective = Math.max(0, 1 - distance * 0.72);
          const size = 0.45 + depth * 1.8 + perspective * 0.55;
          const opacity = Math.max(0.08, perspective * (0.34 + depth * 0.32));

          context.globalAlpha = opacity;
          context.beginPath();
          context.arc(x, y, size, 0, Math.PI * 2);
          context.fill();
        }
      }

      context.globalAlpha = 1;
      if (!reducedMotion && !lowPowerDevice && isPageVisible) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion = motionQuery.matches;
    const handleMotionPreference = () => {
      reducedMotion = motionQuery.matches;
      cancelAnimationFrame(animationFrame);
      draw(performance.now());
    };
    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";
      cancelAnimationFrame(animationFrame);
      if (isPageVisible) draw(performance.now());
    };
    motionQuery.addEventListener("change", handleMotionPreference);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionPreference);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
