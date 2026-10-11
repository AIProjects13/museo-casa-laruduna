"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Mando de la visita guiada: dice en qué estancia estás, permite avanzar y
// retroceder (también con las flechas del teclado) y ofrece una visita
// automática que pasa de estancia cada pocos segundos.

const SEGUNDOS = 11;

export default function Guia({ titulos }: { titulos: string[] }) {
  const [actual, setActual] = useState(0);
  const [auto, setAuto] = useState(false);
  const actualRef = useRef(0);
  actualRef.current = actual;

  const ir = useCallback(
    (i: number) => {
      const destino = document.getElementById(`paso-${Math.max(0, Math.min(titulos.length - 1, i))}`);
      const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      destino?.scrollIntoView({ behavior: suave ? "smooth" : "instant" });
    },
    [titulos.length],
  );

  useEffect(() => {
    const estancias = document.querySelectorAll<HTMLElement>("[data-paso]");
    estancias[actualRef.current]?.setAttribute("data-activa", "");
    document.querySelector(".recorrido")?.classList.add("guiada");
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          setActual(Number((e.target as HTMLElement).dataset.paso));
          estancias.forEach((s) => s.toggleAttribute("data-activa", s === e.target));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    estancias.forEach((s) => io.observe(s));

    const tecla = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, select, dialog")) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        ir(actualRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        ir(actualRef.current - 1);
      }
    };
    window.addEventListener("keydown", tecla);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", tecla);
    };
  }, [ir]);

  // visita automática: se detiene sola al llegar a la última estancia
  useEffect(() => {
    if (!auto) return;
    if (actual >= titulos.length - 1) {
      setAuto(false);
      return;
    }
    const reloj = setTimeout(() => ir(actual + 1), SEGUNDOS * 1000);
    return () => clearTimeout(reloj);
  }, [auto, actual, ir, titulos.length]);

  const boton =
    "rounded-full border border-marfil/35 px-4 py-2 text-(length:--text-nota) transition-colors hover:border-bronce hover:text-bronce disabled:opacity-30 disabled:hover:border-marfil/35 disabled:hover:text-marfil";

  return (
    <nav
      aria-label="Visita guiada"
      className="fixed inset-x-0 bottom-0 z-30 bg-linear-to-t from-carbon via-carbon/85 to-transparent px-5 pb-4 pt-10 text-marfil md:px-12 md:pb-6"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <p aria-live="polite" className="mr-auto min-w-0">
          <span className="text-(length:--text-nota) text-marfil/60">
            Estancia {actual + 1} de {titulos.length}
          </span>
          <span className="block truncate font-serif text-xl leading-tight">{titulos[actual]}</span>
        </p>
        <button
          type="button"
          aria-pressed={auto}
          onClick={() => setAuto(!auto)}
          className={`${boton} aria-pressed:border-bronce aria-pressed:bg-bronce aria-pressed:text-carbon`}
        >
          {auto ? "Detener la visita" : "Visita automática"}
        </button>
        <button type="button" onClick={() => ir(actual - 1)} disabled={actual === 0} className={boton}>
          Anterior
        </button>
        <button
          type="button"
          onClick={() => ir(actual + 1)}
          disabled={actual === titulos.length - 1}
          className={boton}
        >
          Siguiente
        </button>
      </div>
      <ol aria-hidden="true" className="mt-4 flex gap-1">
        {titulos.map((t, i) => (
          <li key={t} className="h-px flex-1 overflow-hidden bg-marfil/20">
            <span
              key={`${i}-${actual}-${auto}`}
              className={`block h-full origin-left bg-bronce ${i < actual ? "" : i === actual ? (auto ? "avance" : "") : "scale-x-0"}`}
              style={i === actual && auto ? { animationDuration: `${SEGUNDOS}s` } : undefined}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}
