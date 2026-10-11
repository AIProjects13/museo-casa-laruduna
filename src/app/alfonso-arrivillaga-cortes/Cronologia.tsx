"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cronologia, hilos, type Hilo } from "@/data/cronologia";
import { fuentePorId } from "@/data/fuentes";
import { publicaciones } from "@/data/publicaciones";

// En pantallas anchas la cronología se recorre en horizontal con el scroll.
// En móvil, o con movimiento reducido, es una columna normal.

const COLOR: Record<Hilo, string> = {
  Formación: "bg-marfil",
  "La casa": "bg-arcilla",
  Sonido: "bg-bronce",
  "Obra escrita": "bg-[#7fa091]",
};

const tituloObra = (slug: string) => publicaciones.find((p) => p.slug === slug)?.titulo ?? slug;

// Trazo continuo que acompaña a los hitos, a modo de forma de onda.
// Se dibuja por tramos, uno por hito, que casan entre sí.
function onda(tramo: number) {
  const y = (u: number) =>
    50 + Math.sin(u * 5.3) * 26 * Math.sin(u * 0.9 + 1) + Math.sin(u * 17) * 9;
  let d = `M0 ${y(tramo).toFixed(1)}`;
  for (let i = 1; i <= 32; i++) d += ` L${((i / 32) * 100).toFixed(1)} ${y(tramo + i / 32).toFixed(1)}`;
  return d;
}

export default function Cronologia() {
  const seccion = useRef<HTMLElement>(null);
  const pista = useRef<HTMLOListElement>(null);
  const centros = useRef<number[]>([]);
  const [hilo, setHilo] = useState<Hilo | "">("");
  const [horizontal, setHorizontal] = useState(false);
  const [alto, setAlto] = useState(0);
  const [activo, setActivo] = useState(0);

  const hitos = useMemo(
    () => cronologia.filter((h) => !hilo || h.hilo === hilo).sort((a, b) => a.orden - b.orden),
    [hilo],
  );

  useEffect(() => {
    const ancho = window.matchMedia("(min-width: 1024px)");
    const calma = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decidir = () => setHorizontal(ancho.matches && !calma.matches);
    decidir();
    ancho.addEventListener("change", decidir);
    calma.addEventListener("change", decidir);
    return () => {
      ancho.removeEventListener("change", decidir);
      calma.removeEventListener("change", decidir);
    };
  }, []);

  useEffect(() => {
    const el = seccion.current;
    const tira = pista.current;
    if (!el || !tira) return;
    if (!horizontal) {
      tira.style.transform = "";
      setAlto(0);
      return;
    }

    let recorrido = 0;
    const medir = () => {
      recorrido = Math.max(0, tira.scrollWidth - window.innerWidth);
      setAlto(window.innerHeight + recorrido);
      centros.current = Array.from(tira.children).map((c) => {
        const li = c as HTMLElement;
        return li.offsetLeft + li.offsetWidth / 2;
      });
      mover();
    };
    const mover = () => {
      const x = Math.min(recorrido, Math.max(0, -el.getBoundingClientRect().top));
      tira.style.transform = `translate3d(${-x}px,0,0)`;
      const medio = x + window.innerWidth / 2;
      let cercano = 0;
      centros.current.forEach((c, i) => {
        if (Math.abs(c - medio) < Math.abs(centros.current[cercano] - medio)) cercano = i;
      });
      setActivo(cercano);
    };

    medir();
    window.addEventListener("scroll", mover, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("scroll", mover);
      window.removeEventListener("resize", medir);
    };
  }, [horizontal, hitos]);

  const ir = useCallback(
    (i: number) => {
      const el = seccion.current;
      const tira = pista.current;
      if (!el || !tira) return;
      const destino = tira.children[i] as HTMLElement | undefined;
      if (!destino) return;
      if (!horizontal) {
        destino.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      const inicio = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: inicio + centros.current[i] - window.innerWidth / 2, behavior: "smooth" });
    },
    [horizontal],
  );

  const chip =
    "rounded-full border px-4 py-2 text-(length:--text-nota) transition-colors aria-pressed:border-bronce aria-pressed:bg-bronce aria-pressed:text-carbon border-marfil/30 hover:border-bronce";

  return (
    <section
      ref={seccion}
      aria-label="Cronología interactiva"
      className="relative"
      style={horizontal && alto ? { height: alto } : undefined}
    >
      <div className={horizontal ? "sticky top-0 flex h-svh flex-col overflow-clip" : ""}>
        <div
          className={`z-10 flex flex-wrap items-center gap-2 bg-carbon/90 px-5 py-4 backdrop-blur md:px-12 ${
            horizontal ? "pt-24" : "sticky top-0"
          }`}
        >
          <button type="button" aria-pressed={hilo === ""} onClick={() => setHilo("")} className={chip}>
            Todo
          </button>
          {hilos.map((h) => (
            <button
              key={h}
              type="button"
              aria-pressed={hilo === h}
              onClick={() => setHilo(hilo === h ? "" : h)}
              className={`${chip} inline-flex items-center gap-2`}
            >
              <span aria-hidden="true" className={`size-2 rounded-full ${COLOR[h]}`} />
              {h}
            </button>
          ))}
          {horizontal && (
            <span className="ml-auto flex items-center gap-2">
              <span aria-live="polite" className="mr-3 text-(length:--text-nota) text-marfil/60">
                {activo + 1} de {hitos.length}
              </span>
              <button
                type="button"
                onClick={() => ir(Math.max(0, activo - 1))}
                disabled={activo === 0}
                className={`${chip} disabled:opacity-30`}
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => ir(Math.min(hitos.length - 1, activo + 1))}
                disabled={activo === hitos.length - 1}
                className={`${chip} disabled:opacity-30`}
              >
                Siguiente
              </button>
            </span>
          )}
        </div>

        <ol
          ref={pista}
          className={
            horizontal
              ? "relative flex min-h-0 flex-1 items-center will-change-transform"
              : "relative px-5 pb-10 md:px-12"
          }
        >
          {hitos.map((h, i) => {
            const enfoque = !horizontal || i === activo;
            const larga = h.fecha.length > 4;
            return (
              <li
                key={h.fecha + h.titulo}
                className={
                  horizontal
                    ? `relative w-[min(38rem,46vw)] shrink-0 px-10 transition-opacity duration-500 first:ml-[26vw] last:mr-[30vw] ${
                        enfoque ? "opacity-100" : "opacity-30"
                      }`
                    : "relative border-l border-marfil/20 py-9 pl-6"
                }
              >
                {horizontal && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-x-0 -top-28 h-24 w-full"
                  >
                    <path
                      d={onda(i)}
                      fill="none"
                      stroke="#c1a275"
                      strokeOpacity="0.5"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}
                {!horizontal && (
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[5px] top-12 size-[9px] rounded-full ${COLOR[h.hilo]}`}
                  />
                )}
                <p
                  className={`font-serif leading-[0.9] text-bronce ${
                    larga
                      ? "text-[clamp(2rem,1.4rem+2.4vw,3.6rem)]"
                      : "text-[clamp(4rem,2rem+9vw,10rem)]"
                  }`}
                >
                  {h.fecha}
                </p>
                <p className="mt-5 flex items-center gap-2 text-(length:--text-nota) text-marfil/70">
                  <span aria-hidden="true" className={`size-2 rounded-full ${COLOR[h.hilo]}`} />
                  {h.hilo}
                  {h.lugar && <span className="text-marfil/45">en {h.lugar}</span>}
                </p>
                <h3 className="mt-2 text-[clamp(1.6rem,1.2rem+1.4vw,2.5rem)] leading-tight">
                  {h.titulo}
                </h3>
                <p className="mt-3 max-w-[46ch] text-marfil/85">{h.texto}</p>

                {h.obras && (
                  <ul className="mt-4 space-y-1 text-(length:--text-nota)">
                    {h.obras.map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/biblioteca#${slug}`}
                          tabIndex={enfoque ? 0 : -1}
                          className="enlace line-clamp-1"
                        >
                          {tituloObra(slug)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-4 text-(length:--text-nota) text-marfil/55">
                  {h.estado === "revisado" ? "Revisado con la fuente" : "Pendiente de verificar"}
                  {": "}
                  {h.fuentes.map((id, k) => (
                    <span key={id}>
                      {k > 0 && "; "}
                      <Link href={`/fuentes#${id}`} tabIndex={enfoque ? 0 : -1} className="enlace">
                        {fuentePorId(id)?.cita.split(". ")[0].slice(0, 44)}
                      </Link>
                    </span>
                  ))}
                </p>
              </li>
            );
          })}
        </ol>

        {horizontal && (
          <nav aria-label="Ir a un año" className="px-12 pb-7">
            <ul className="flex items-end gap-1 border-t border-marfil/15 pt-3">
              {hitos.map((h, i) => (
                <li key={h.fecha + h.titulo} className="flex-1">
                  <button
                    type="button"
                    onClick={() => ir(i)}
                    aria-label={`${h.fecha}: ${h.titulo}`}
                    aria-current={i === activo ? "step" : undefined}
                    className="group flex w-full flex-col items-center gap-1 py-1"
                  >
                    <span
                      className={`block w-px transition-all duration-300 ${
                        i === activo ? "h-7 bg-bronce" : "h-3 bg-marfil/35 group-hover:h-5"
                      }`}
                    />
                    <span
                      className={`text-[0.6875rem] transition-colors ${
                        i === activo ? "text-bronce" : "text-marfil/40"
                      }`}
                    >
                      {h.fecha.length <= 4 ? h.fecha : "c."}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
