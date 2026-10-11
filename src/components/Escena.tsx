"use client";

import { useEffect, useRef } from "react";

// Escena de ambiente del museo: una imagen fija y, encima, su bucle de vídeo.
// Son ilustraciones contemporáneas generadas para el sitio; el pie lo dice
// siempre, para no confundirlas con archivo.

export type NombreEscena = "memoria" | "territorio" | "sonido" | "legado";

export function Escena({
  nombre,
  className = "",
  pie = true,
  prioridad = false,
  video = true,
  paralaje = 0.12,
}: {
  nombre: NombreEscena;
  className?: string;
  pie?: boolean;
  prioridad?: boolean;
  video?: boolean;
  paralaje?: number;
}) {
  const marco = useRef<HTMLDivElement>(null);
  const cine = useRef<HTMLVideoElement>(null);

  // El vídeo solo se descarga y se reproduce mientras la escena está a la vista.
  useEffect(() => {
    const v = cine.current;
    const el = marco.current;
    if (!v || !el) return;
    const conexion = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || conexion?.saveData) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = `/escenas/${nombre}${window.innerWidth < 768 ? "-m" : ""}.mp4`;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [nombre]);

  return (
    <div ref={marco} aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className}`}>
      <div data-paralaje={paralaje} className="absolute -inset-y-[12%] inset-x-0 will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet={`/escenas/${nombre}-m.webp`} />
          <img
            src={`/escenas/${nombre}.webp`}
            alt=""
            loading={prioridad ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </picture>
        {video && (
          <video
            ref={cine}
            muted
            loop
            playsInline
            preload="none"
            onPlaying={(e) => (e.currentTarget.style.opacity = "1")}
            className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-1000"
          />
        )}
      </div>
      {pie && (
        <span className="absolute bottom-3 right-4 text-[0.6875rem] text-marfil/55">
          Ilustración contemporánea
        </span>
      )}
    </div>
  );
}
