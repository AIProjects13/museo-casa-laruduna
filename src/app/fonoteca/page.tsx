import type { Metadata } from "next";
import Link from "next/link";
import { Escena } from "@/components/Escena";
import Ondas from "@/components/Ondas";
import { Fuentes } from "@/components/Procedencia";
import { salaPorSlug } from "@/data/museo";
import { publicaciones } from "@/data/publicaciones";

const sala = salaPorSlug("fonoteca")!;
const sonoras = publicaciones
  .filter((p) => p.categoria === "Producción sonora")
  .sort((a, b) => a.anio - b.anio);

export const metadata: Metadata = {
  title: "Fonoteca",
  description: sala.resumen,
  alternates: { canonical: "/fonoteca" },
};

// Barras decorativas de cada pista: quietas y atenuadas, porque aún no hay audio.
function Silencio({ semilla }: { semilla: number }) {
  return (
    <span aria-hidden="true" className="flex h-8 items-center gap-[3px] opacity-40">
      {Array.from({ length: 28 }, (_, i) => (
        <span
          key={i}
          className="block w-[2px] bg-bronce"
          style={{ height: `${Math.round(4 + Math.abs(Math.sin(i * 0.7 + semilla) * Math.sin(i * 0.19 + semilla * 2)) * 24)}px` }}
        />
      ))}
    </span>
  );
}

export default function Fonoteca() {
  return (
    <main id="museo" className="sobre-oscuro bg-carbon text-marfil">
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-16 pt-36 md:px-12 md:pb-24">
        <Escena nombre="sonido" prioridad />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/60 to-carbon/25 md:bg-linear-to-r md:from-carbon md:via-carbon/70 md:to-carbon/10"
        />
        <Ondas className="mix-blend-screen" />
        <div className="relative">
          <p className="text-bronce">Sala de escucha en preparación</p>
          <h1 className="mt-4 text-(length:--text-portada) leading-[0.92]">Fonoteca</h1>
          <p className="mt-8 max-w-[50ch] text-(length:--text-entrada) leading-snug text-marfil/90">
            {sala.intro}
          </p>
        </div>
      </section>

      <section aria-labelledby="pistas" className="px-5 py-24 md:px-12 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="pistas" className="text-(length:--text-titulo)">
            Lo que sonará aquí
          </h2>
          <p className="max-w-[46ch] text-marfil/70">
            {sonoras.length} producciones catalogadas. Ninguna se reproduce todavía: faltan los
            originales digitalizados y el permiso de sus intérpretes o comunidades.
          </p>
        </div>
        <ol className="mt-12 border-t border-marfil/15">
          {sonoras.map((p, i) => (
            <li
              key={p.slug}
              data-revelar
              style={{ "--espera": `${Math.min(i, 5) * 0.06}s` } as React.CSSProperties}
              className="grid items-center gap-x-8 gap-y-3 border-b border-marfil/15 py-6 md:grid-cols-[5rem_1fr_auto]"
            >
              <span className="font-serif text-(length:--text-entrada) leading-none text-bronce">
                {p.anio}
              </span>
              <div>
                <h3 className="max-w-[44ch] text-[clamp(1.3rem,1.1rem+0.8vw,1.9rem)] leading-tight">
                  <Link href={`/biblioteca#${p.slug}`} className="hover:underline">
                    {p.titulo}
                  </Link>
                </h3>
                <p className="mt-1 text-(length:--text-nota) text-marfil/60">
                  {p.autoria.join(", ")}
                  {p.colaboradores && `. ${p.colaboradores}`}
                </p>
              </div>
              {p.audio ? (
                <audio controls preload="none" src={p.audio} className="w-72 max-w-full">
                  <a href={p.audio}>Descargar la grabación</a>
                </audio>
              ) : (
                <div className="flex items-center gap-4">
                  <Silencio semilla={i + 1} />
                  <span className="text-(length:--text-nota) text-marfil/55">Sin audio todavía</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-verde px-5 py-24 md:px-12 md:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="text-(length:--text-titulo)">Lo documentado</h2>
            <ul className="mt-8 space-y-6">
              {sala.hechos.map((h) => (
                <li key={h.texto} className="border-l border-bronce pl-5">
                  <p className="max-w-[52ch]">{h.texto}</p>
                  <p className="mt-1 [&_*]:!text-marfil/65">
                    <Fuentes ids={h.fuentes} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-(length:--text-titulo)">Lo que falta</h2>
            <ul className="mt-8 list-disc space-y-3 pl-5 marker:text-bronce">
              {sala.pendiente.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
