"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Estado, Fuentes } from "@/components/Procedencia";
import type { Fotografia } from "@/data/fotografias";
import { publicaciones } from "@/data/publicaciones";

// Galería del archivo visual: las fotografías en columnas y, al pulsar una,
// un visor a pantalla completa con su ficha (crédito, procedencia, derechos).

const tituloObra = (slug: string) => publicaciones.find((p) => p.slug === slug)?.titulo ?? slug;

export default function Galeria({ fotos }: { fotos: Fotografia[] }) {
  const visor = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const foto = fotos[i];

  const abrir = (n: number) => {
    setI(n);
    visor.current?.showModal();
  };
  const mover = (paso: number) => setI((n) => (n + paso + fotos.length) % fotos.length);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (!visor.current?.open) return;
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  });

  const boton =
    "rounded-full border border-marfil/40 px-4 py-2 text-(length:--text-nota) transition-colors hover:border-bronce hover:text-bronce";

  return (
    <>
      <ul className="mt-10 columns-1 gap-6 sm:columns-2 xl:columns-3">
        {fotos.map((f, n) => (
          <li key={f.archivo} data-revelar className="mb-10 break-inside-avoid">
            <figure>
              <button
                type="button"
                onClick={() => abrir(n)}
                aria-label={`Ampliar: ${f.titulo}`}
                className="group block w-full overflow-hidden bg-carbon"
              >
                <img
                  src={f.archivo}
                  alt={f.descripcion}
                  loading="lazy"
                  className="w-full transition-[transform,opacity] duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
                />
              </button>
              <figcaption className="mt-3">
                <span className="block font-serif text-xl leading-tight">{f.titulo}</span>
                <span className="block text-(length:--text-nota) text-tinta-suave">
                  Fotografía de {f.credito}
                  {[f.fecha, f.lugar].filter(Boolean).length > 0 &&
                    `. ${[f.fecha, f.lugar].filter(Boolean).join(", ")}`}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={visor}
        aria-label="Visor de fotografías"
        onClick={(e) => e.target === visor.current && visor.current?.close()}
        className="sobre-oscuro m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-carbon p-0 text-marfil"
      >
        {foto && (
          <div className="grid min-h-full gap-8 p-5 md:p-10 lg:grid-cols-[1fr_22rem] lg:gap-12">
            <div className="flex min-h-[50dvh] items-center justify-center">
              <img
                key={foto.archivo}
                src={foto.archivo}
                alt={foto.descripcion}
                className="max-h-[82dvh] w-auto max-w-full object-contain"
              />
            </div>
            <aside className="flex flex-col gap-6 self-center">
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => mover(-1)} className={boton}>
                  Anterior
                </button>
                <button type="button" onClick={() => mover(1)} className={boton}>
                  Siguiente
                </button>
                <button type="button" onClick={() => visor.current?.close()} className={boton}>
                  Cerrar
                </button>
              </div>
              <p className="text-(length:--text-nota) text-marfil/55">
                {i + 1} de {fotos.length}
                {foto.coleccion && `. Serie ${foto.coleccion}`}
              </p>
              <h2 className="text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] leading-tight">{foto.titulo}</h2>
              <p className="text-marfil/85">{foto.descripcion}</p>
              <dl className="grid grid-cols-[7.5rem_1fr] gap-x-4 gap-y-2 text-(length:--text-nota)">
                {(
                  [
                    ["Fotografía", foto.credito],
                    ["Fecha", foto.fecha],
                    ["Lugar", foto.lugar],
                    ["Procedencia", foto.procedencia],
                    ["Derechos", foto.derechos],
                  ] as const
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-marfil/55">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
              </dl>
              {foto.nota && <p className="border-l border-bronce pl-4 text-(length:--text-nota) text-marfil/80">{foto.nota}</p>}
              {foto.relacion && (
                <div className="text-(length:--text-nota)">
                  <p className="text-marfil/55">Relacionado en la biblioteca</p>
                  <ul className="mt-1 space-y-1">
                    {foto.relacion.map((slug) => (
                      <li key={slug}>
                        <Link href={`/biblioteca#${slug}`} className="enlace">
                          {tituloObra(slug)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="flex flex-wrap gap-x-4 gap-y-1 [&_*]:!text-marfil/65">
                <Estado estado={foto.estado} />
                <Fuentes ids={foto.fuentes} />
              </p>
              <a href={foto.archivo} className="enlace text-(length:--text-nota) text-bronce">
                Abrir la imagen original
              </a>
            </aside>
          </div>
        )}
      </dialog>
    </>
  );
}
