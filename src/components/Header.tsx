"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { salas } from "@/data/museo";
import { Logo } from "./Logo";

// Casi todas las páginas empiezan sobre una escena oscura y la cabecera arranca
// en marfil. Estas son las que empiezan sobre papel.
const CLARAS = ["/fuentes"];

const limpia = (ruta: string) => (ruta.length > 1 ? ruta.replace(/\/$/, "") : ruta);

export default function Header() {
  const ruta = limpia(usePathname());
  const menu = useRef<HTMLDialogElement>(null);
  const [oculta, setOculta] = useState(false);
  const [arriba, setArriba] = useState(true);

  // Se esconde al bajar y vuelve al subir, para no tapar la lectura.
  useEffect(() => {
    let anterior = window.scrollY;
    const alDesplazar = () => {
      const y = window.scrollY;
      setArriba(y < 40);
      setOculta(y > anterior && y > 160);
      anterior = y;
    };
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  useEffect(() => {
    menu.current?.close();
  }, [ruta]);

  const oscura = !CLARAS.includes(ruta);
  const tono = arriba
    ? oscura
      ? "sobre-oscuro text-marfil"
      : "text-tinta"
    : "sobre-oscuro bg-carbon/85 text-marfil backdrop-blur-md";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color] duration-500 ${tono} ${
          oculta ? "-translate-y-full" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between px-5 transition-[padding] duration-500 md:px-12 ${
            arriba ? "py-5 md:py-7" : "py-3"
          }`}
        >
          <Link href="/" aria-label="Museo Casa Laruduna, inicio">
            <Logo />
          </Link>

          <nav aria-label="Salas del museo" className="hidden xl:block">
            <ul className="flex items-center gap-7 text-(length:--text-nota)">
              {salas.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    aria-current={ruta === `/${s.slug}` ? "page" : undefined}
                    className="border-b border-transparent py-1 transition-colors hover:border-bronce aria-[current=page]:border-current"
                  >
                    {s.slug === "alfonso-arrivillaga-cortes" ? "Alfonso Arrivillaga" : s.nombre}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/recorrido"
                  className="rounded-full border border-current/40 px-4 py-2 transition-colors hover:border-bronce hover:text-bronce"
                >
                  Visita guiada
                </Link>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => menu.current?.showModal()}
            className="rounded-full border border-current/40 px-4 py-2 text-(length:--text-nota) xl:hidden"
          >
            Salas
          </button>
        </div>
      </header>

      <dialog
        ref={menu}
        aria-label="Salas del museo"
        className="sobre-oscuro m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-carbon p-0 text-marfil"
      >
        <div className="flex min-h-full flex-col px-5 pb-10 pt-5 md:px-12 md:pt-7">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => menu.current?.close()}
              className="rounded-full border border-marfil/40 px-4 py-2 text-(length:--text-nota)"
            >
              Cerrar
            </button>
          </div>
          <nav aria-label="Salas del museo" className="mt-10 flex-1">
            <ul className="border-t border-marfil/15">
              {salas.map((s) => (
                <li key={s.slug} className="border-b border-marfil/15">
                  <Link
                    href={`/${s.slug}`}
                    aria-current={ruta === `/${s.slug}` ? "page" : undefined}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 py-4 aria-[current=page]:text-bronce"
                  >
                    <span className="font-serif text-[clamp(1.6rem,1rem+3vw,2.6rem)] leading-tight">
                      {s.nombre}
                    </span>
                    <span className="text-(length:--text-nota) text-marfil/60">{s.situacion}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/recorrido"
            className="mt-8 self-start rounded-full bg-marfil px-6 py-3 font-medium text-carbon"
          >
            Hacer la visita guiada
          </Link>
        </div>
      </dialog>
    </>
  );
}
