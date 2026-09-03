"use client";

import { useEffect, useRef } from "react";

type HalftoneBackgroundProps = {
  className?: string;
};

type HalftonePoint = {
  baseX: number;
  baseY: number;
  distance: number;
  perspective: number;
  primaryPhase: number;
  secondaryPhase: number;
  diagonalPhase: number;
};

export default function HalftoneBackground({ className = "" }: HalftoneBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let points: HalftonePoint[] = [];

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const isWindows = /Windows/i.test(navigator.userAgent);
      const pixelRatio = isWindows ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const spacing = width < 640 ? 16 : 19;
      const columns = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const centerX = width * 0.57;
      const centerY = height * 0.45;
      const maxDimension = Math.max(width, height, 1);

      points = [];
      for (let row = -1; row < rows; row += 1) {
        const baseY = row * spacing;
        for (let column = -1; column < columns; column += 1) {
          const baseX = column * spacing;
          const distanceX = (baseX - centerX) / maxDimension;
          const distanceY = (baseY - centerY) / maxDimension;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          points.push({
            baseX,
            baseY,
            distance,
            perspective: Math.max(0, 1 - distance * 0.72),
            primaryPhase: baseX * 0.018,
            secondaryPhase: baseY * 0.022,
            diagonalPhase: (baseX + baseY) * 0.011,
          });
        }
      }
    };

    const draw = () => {
      const paths = Array.from({ length: 12 }, () => new Path2D());
      context.clearRect(0, 0, width, height);

      for (const point of points) {
        const primaryWave = Math.sin(point.primaryPhase);
        const secondaryWave = Math.cos(point.secondaryPhase);
        const diagonalWave = Math.sin(point.diagonalPhase);
        const depthWave = Math.sin(point.distance * 25) * 0.5 + 0.5;
        const depth = Math.min(1, Math.max(0, depthWave * 0.62 + (diagonalWave * 0.5 + 0.5) * 0.38));
        const displacement = 5 + depth * 11;
        const x = point.baseX + (primaryWave * 0.65 + diagonalWave * 0.35) * displacement;
        const y = point.baseY + (secondaryWave * 0.62 + primaryWave * 0.38) * displacement;
        const size = 0.45 + depth * 1.8 + point.perspective * 0.55;
        const opacity = Math.max(0.08, point.perspective * (0.34 + depth * 0.32));
        const opacityBucket = Math.min(11, Math.floor(opacity * 12));
        paths[opacityBucket].moveTo(x + size, y);
        paths[opacityBucket].arc(x, y, size, 0, Math.PI * 2);
      }

      for (let bucket = 0; bucket < paths.length; bucket += 1) {
        context.globalAlpha = (bucket + 1) / 12;
        context.fillStyle = "#000000";
        context.fill(paths[bucket]);
      }
      context.globalAlpha = 1;
    };

    resize();
    draw();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, []);

  return <canvas ref={canvasRef} className={`halftone-canvas pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
