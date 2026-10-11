"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Estado, Fuentes } from "@/components/Procedencia";
import {
  categorias,
  citaAPA,
  citaBibTeX,
  publicaciones,
  type Categoria,
  type Publicacion,
} from "@/data/publicaciones";

const sinTildes = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

// Cada categoría tiene su papel, como las cartelas de una sala.
// No son portadas: el museo no reproduce cubiertas que no ha visto.
const PAPEL: Record<Categoria, string> = {
  Libros: "bg-arcilla text-marfil",
  "Capítulos de libros": "bg-verde text-marfil",
  "Artículos científicos": "bg-marfil text-tinta",
  "Publicaciones colectivas": "bg-[#d9c9a8] text-tinta",
  Ensayos: "bg-bronce text-carbon",
  "Producción sonora": "bg-carbon text-marfil",
};

function Surcos() {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 24" className="h-6 w-28 text-bronce">
      {Array.from({ length: 30 }, (_, i) => {
        // redondeado: servidor y navegador deben dar exactamente la misma cifra
        const h = Math.round(3 + Math.abs(Math.sin(i * 0.9) * Math.sin(i * 0.23 + 1)) * 20);
        return <rect key={i} x={i * 4} y={12 - h / 2} width="1.5" height={h} fill="currentColor" />;
      })}
    </svg>
  );
}

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "">("");
  const [recientes, setRecientes] = useState(true);
  const [abierta, setAbierta] = useState<Publicacion | null>(null);
  const [copiado, setCopiado] = useState("");
  const ficha = useRef<HTMLDialogElement>(null);

  const lista = useMemo(() => {
    const q = sinTildes(busqueda.trim());
    return publicaciones
      .filter((p) => !categoria || p.categoria === categoria)
      .filter(
        (p) =>
          !q ||
          sinTildes(`${p.titulo} ${p.autoria.join(" ")} ${p.publicadoEn} ${p.anio}`).includes(q),
      )
      .sort((a, b) => (recientes ? b.anio - a.anio : a.anio - b.anio));
  }, [busqueda, categoria, recientes]);

  const abrir = (p: Publicacion) => {
    setAbierta(p);
    setCopiado("");
    history.replaceState(null, "", `#${p.slug}`);
    ficha.current?.showModal();
  };

  // Enlace permanente: /biblioteca#slug abre la ficha.
  useEffect(() => {
    const p = publicaciones.find((x) => x.slug === decodeURIComponent(location.hash.slice(1)));
    if (p) abrir(p);
  }, []);

  const copiar = async (que: string, texto: string) => {
    await navigator.clipboard.writeText(texto);
    setCopiado(que);
  };

  const descargarBib = (p: Publicacion) => {
    const url = URL.createObjectURL(new Blob([citaBibTeX(p)], { type: "application/x-bibtex" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `${p.slug}.bib` });
    a.click();
    URL.revokeObjectURL(url);
  };

  const chip =
    "rounded-full border border-tinta/30 px-4 py-2 text-(length:--text-nota) transition-colors hover:border-tinta aria-pressed:border-tinta aria-pressed:bg-tinta aria-pressed:text-papel";
  const accion = "rounded-full border border-tinta/30 px-4 py-2 text-(length:--text-nota) hover:border-tinta";

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="z-20 -mx-5 flex flex-wrap items-center gap-2 bg-papel/92 px-5 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sticky lg:top-0"
      >
        <label className="min-w-[14rem] flex-1 basis-full lg:basis-auto">
          <span className="sr-only">Buscar por título, autoría o año</span>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por título, autoría o año"
            className="w-full border-b border-tinta/40 bg-transparent py-2 font-serif text-(length:--text-entrada) placeholder:text-tinta-suave/70 focus:border-tinta focus:outline-none"
          />
        </label>
        <button type="button" aria-pressed={categoria === ""} onClick={() => setCategoria("")} className={chip}>
          Todo ({publicaciones.length})
        </button>
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={categoria === c}
            onClick={() => setCategoria(categoria === c ? "" : c)}
            className={chip}
          >
            {c} ({publicaciones.filter((p) => p.categoria === c).length})
          </button>
        ))}
        <button type="button" onClick={() => setRecientes(!recientes)} className={`${accion} lg:ml-auto`}>
          {recientes ? "Más recientes primero" : "Más antiguas primero"}
        </button>
      </form>

      <p aria-live="polite" className="mt-6 text-(length:--text-nota) text-tinta-suave">
        {lista.length === 0
          ? "Ningún registro coincide. Prueba con otra palabra o quita el filtro de categoría."
          : `${lista.length} de ${publicaciones.length} registros`}
      </p>

      <ul className="mt-6 grid grid-flow-dense gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {lista.map((p, i) => {
          // la primera pieza y una de cada siete ocupan doble ancho, para romper la retícula
          const grande = i % 7 === 0;
          return (
            <li key={p.slug} id={p.slug} className={grande ? "sm:col-span-2" : ""}>
              <button
                type="button"
                onClick={() => abrir(p)}
                className={`group flex h-full min-h-[21rem] w-full flex-col p-6 text-left transition-transform duration-500 hover:-translate-y-1 md:p-7 ${PAPEL[p.categoria]}`}
              >
                <span className="flex items-start justify-between gap-4 text-(length:--text-nota) opacity-80">
                  <span>{p.categoria}</span>
                  {p.categoria === "Producción sonora" && <Surcos />}
                </span>
                <span
                  className={`mt-auto block font-serif leading-[0.85] opacity-90 ${
                    grande ? "text-[clamp(4.5rem,3rem+6vw,9rem)]" : "text-[clamp(3.5rem,2.6rem+2.4vw,5.5rem)]"
                  }`}
                >
                  {p.anio}
                </span>
                <span
                  className={`mt-4 block font-serif leading-tight decoration-1 underline-offset-4 group-hover:underline ${
                    grande ? "text-[clamp(1.4rem,1.1rem+1vw,2.1rem)]" : "line-clamp-4 text-xl"
                  }`}
                >
                  {p.titulo}
                </span>
                <span className="mt-3 block text-(length:--text-nota) opacity-80">
                  {p.autoria.join(", ")}
                </span>
                <span className="mt-4 flex items-center gap-2 text-(length:--text-nota) opacity-75">
                  <span
                    aria-hidden="true"
                    className={`size-2 rounded-full ${
                      p.estado === "revisado" ? "bg-current" : "border border-current"
                    }`}
                  />
                  {p.estado === "revisado" ? "Revisado con la fuente" : "Pendiente de verificar"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={ficha}
        onClose={() => history.replaceState(null, "", location.pathname)}
        onClick={(e) => e.target === ficha.current && ficha.current?.close()}
        aria-labelledby="ficha-titulo"
        className="m-auto max-h-[92dvh] w-[min(52rem,calc(100vw-1.5rem))] max-w-none overflow-y-auto bg-papel p-0 text-tinta"
      >
        {abierta && (
          <article>
            <header className={`p-6 md:p-10 ${PAPEL[abierta.categoria]}`}>
              <div className="flex items-start justify-between gap-6">
                <p className="text-(length:--text-nota) opacity-80">
                  {abierta.categoria}, {abierta.anio}
                </p>
                <button
                  type="button"
                  onClick={() => ficha.current?.close()}
                  className="rounded-full border border-current/50 px-4 py-1.5 text-(length:--text-nota)"
                >
                  Cerrar
                </button>
              </div>
              <h2 id="ficha-titulo" className="mt-6 text-[clamp(1.6rem,1.2rem+1.8vw,2.75rem)] leading-tight">
                {abierta.titulo}
              </h2>
              <p className="mt-4">{abierta.autoria.join(", ")}</p>
            </header>

            <div className="space-y-6 p-6 md:p-10">
              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-[9rem_1fr]">
                {(
                  [
                    ["Publicado en", abierta.publicadoEn],
                    ["Colaboración", abierta.colaboradores],
                    ["Páginas", abierta.paginas],
                    ["ISBN", abierta.isbn],
                    ["DOI", abierta.doi],
                    ["Licencia", abierta.licencia],
                    ["Disponibilidad", abierta.pdf ? "Documento disponible en el museo" : abierta.doi || abierta.enlace ? "En la web del editor" : "Sin copia digital localizada"],
                  ] as const
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-(length:--text-nota) text-tinta-suave">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
              </dl>

              {abierta.nota && <p className="border-l border-arcilla pl-4 text-arcilla">{abierta.nota}</p>}

              <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <Estado estado={abierta.estado} />
                <Fuentes ids={abierta.fuentes} />
              </p>

              <div className="border-t border-tinta/20 pt-6">
                <h3 className="text-xl">Cita</h3>
                <p className="mt-3 text-(length:--text-nota) leading-relaxed">{citaAPA(abierta)}</p>
                <p className="mt-5 flex flex-wrap gap-2">
                  {(abierta.doi || abierta.enlace) && (
                    <a
                      href={abierta.doi ? `https://doi.org/${abierta.doi}` : abierta.enlace}
                      rel="noopener"
                      className="rounded-full bg-tinta px-4 py-2 text-(length:--text-nota) text-papel"
                    >
                      Abrir en la web del editor
                    </a>
                  )}
                  {abierta.pdf && (
                    <a href={abierta.pdf} className="rounded-full bg-arcilla px-4 py-2 text-(length:--text-nota) text-marfil">
                      Leer el documento (PDF)
                    </a>
                  )}
                  <button type="button" onClick={() => copiar("apa", citaAPA(abierta))} className={accion}>
                    {copiado === "apa" ? "Cita copiada" : "Copiar cita"}
                  </button>
                  <button type="button" onClick={() => copiar("bib", citaBibTeX(abierta))} className={accion}>
                    {copiado === "bib" ? "BibTeX copiado" : "Copiar BibTeX"}
                  </button>
                  <button type="button" onClick={() => descargarBib(abierta)} className={accion}>
                    Descargar .bib
                  </button>
                  <button type="button" onClick={() => copiar("url", location.href)} className={accion}>
                    {copiado === "url" ? "Enlace copiado" : "Copiar enlace permanente"}
                  </button>
                </p>
              </div>
            </div>
          </article>
        )}
      </dialog>
    </div>
  );
}
