import Link from "next/link";
import { Escena, type NombreEscena } from "@/components/Escena";
import Hero from "@/components/Hero";
import Ondas from "@/components/Ondas";
import { publicaciones } from "@/data/publicaciones";
import { salaPorSlug, salas } from "@/data/museo";

const alfonso = salaPorSlug("alfonso-arrivillaga-cortes")!;
const revisados = publicaciones.filter((p) => p.estado === "revisado").length;

// Las cuatro palabras del subtítulo, cada una con un hecho documentado y su sala.
const palabras: { palabra: string; escena: NombreEscena; texto: string; sala: string; ir: string }[] = [
  {
    palabra: "Memoria",
    escena: "memoria",
    texto:
      "Cintas, casetes, película en blanco y negro, ektachrome y súper 8. La casa fue reuniendo en el campo un archivo que hoy espera inventario.",
    sala: "/archivo-visual",
    ir: "Entrar al archivo visual",
  },
  {
    palabra: "Territorio",
    escena: "territorio",
    texto:
      "Del Caribe de Livingston a los Cuchumatanes, Petén y los campamentos de refugio en Chiapas: los lugares que nombran las fuentes.",
    sala: "/atlas",
    ir: "Abrir el atlas",
  },
  {
    palabra: "Sonido",
    escena: "sonido",
    texto:
      "Entre 1989 y 1998 la casa produjo casetes y discos con músicos de distintas tradiciones de Guatemala, grabados donde se toca.",
    sala: "/fonoteca",
    ir: "Pasar a la sala de escucha",
  },
  {
    palabra: "Legado",
    escena: "legado",
    texto:
      "Más de cuatro décadas de investigación de Alfonso Arrivillaga Cortés, reunidas con sus fuentes para quien quiera estudiarlas.",
    sala: "/biblioteca",
    ir: "Consultar la biblioteca",
  },
];

const hitos = [
  { anio: "1981", texto: "Entra como investigador al Centro de Estudios Folklóricos de la Universidad de San Carlos." },
  { anio: "1982", texto: "Se especializa en etnomusicología en el INIDEF de Caracas, becado por la OEA." },
  { anio: "1989", texto: "Primer Encuentro de Músicos de la Tradición Popular, en Totonicapán." },
  { anio: "2008", texto: "Sale el primer número de Senderos, revista de etnomusicología, que edita." },
];

export default function Inicio() {
  return (
    <main>
      <Hero />

      <section
        id="museo"
        tabIndex={-1}
        className="grano relative px-5 pb-24 pt-20 outline-none md:px-12 md:pb-40 md:pt-32"
      >
        <div className="relative grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <div>
            <h2 data-revelar className="max-w-[16ch] text-(length:--text-titulo)">
              Una memoria familiar convertida en museo.
            </h2>
            <div data-revelar style={{ "--espera": "0.15s" } as React.CSSProperties} className="mt-10 max-w-[62ch] space-y-5">
              <p>
                Casa Laruduna nació en Livingston, en el Caribe de Guatemala, a finales de los
                años ochenta. Es el nombre que una familia dio a su casa y a todo lo que fue
                creciendo en ella: grabaciones, fotografías, escritos, encuentros.
              </p>
              <p>
                Su protagonista es Alfonso Arrivillaga Cortés, antropólogo y etnomusicólogo, que
                lleva más de cuatro décadas investigando las músicas de Mesoamérica y la nación
                garífuna. Sylvia Lucrecia Shaw Arrivillaga, gestora cultural, traductora y
                productora de los discos de la casa, está en su origen. Su hijo la continúa hoy
                como museo y archivo digital, abierto a quien investiga, estudia o quiere escuchar.
              </p>
              <p>
                <Link href="/la-casa" className="enlace">
                  Conocer la historia de la casa
                </Link>
              </p>
            </div>
          </div>
          <figure
            data-revelar
            style={{ "--espera": "0.3s" } as React.CSSProperties}
            className="self-end border-l border-bronce pl-6 lg:pl-8"
          >
            <blockquote className="font-serif text-(length:--text-entrada) italic leading-snug">
              «Laruduna no es ONG, ni una fundación, sino nuestras vidas.»
            </blockquote>
            <figcaption className="mt-4 text-(length:--text-nota) text-tinta-suave">
              Alfonso Arrivillaga Cortés, entrevistado por Gemma Gil. Prensa Libre, 22 de abril de
              2007.{" "}
              <Link href="/fuentes#gil-2007" className="enlace">
                Ver la fuente
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Cuatro estancias que se apilan: cada una cubre a la anterior al avanzar.
          Fondo en vídeo, palabra y texto en capas que se mueven a distinta velocidad. */}
      <div className="sobre-oscuro bg-carbon text-marfil">
        {palabras.map((p, i) => (
          <section
            key={p.palabra}
            aria-labelledby={`palabra-${i}`}
            className="sticky top-0 flex min-h-svh flex-col justify-end overflow-hidden bg-carbon px-5 pb-16 pt-28 shadow-[0_-40px_80px_rgb(0_0_0/0.55)] md:px-12 md:pb-20"
          >
            <Escena nombre={p.escena} paralaje={0.16} />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/50 to-transparent md:bg-linear-to-r md:via-carbon/55"
            />
            {p.escena === "sonido" && <Ondas className="opacity-80 mix-blend-screen" />}
            <div className="relative max-w-[42rem]">
              <div data-paralaje="-0.1" className="will-change-transform">
                <h2
                  id={`palabra-${i}`}
                  data-revelar
                  className="text-[clamp(4rem,1.5rem+12vw,13rem)] leading-[0.86] text-marfil"
                >
                  {p.palabra}
                </h2>
              </div>
              <p
                data-revelar
                style={{ "--espera": "0.2s" } as React.CSSProperties}
                className="mt-6 max-w-[44ch] text-(length:--text-entrada) leading-snug text-marfil/90"
              >
                {p.texto}
              </p>
              <p data-revelar style={{ "--espera": "0.35s" } as React.CSSProperties} className="mt-7">
                <Link href={p.sala} className="enlace text-bronce">
                  {p.ir}
                </Link>
              </p>
            </div>
          </section>
        ))}
      </div>

      <section className="sobre-oscuro relative bg-verde px-5 py-24 text-marfil md:px-12 md:py-36">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div data-revelar>
            <p className="text-bronce">Exposición permanente</p>
            <h2 className="mt-4 text-(length:--text-titulo)">
              Entre territorios y sonidos: Alfonso Arrivillaga Cortés
            </h2>
            <p className="mt-8 max-w-[58ch] text-marfil/85">{alfonso.intro}</p>
            <p className="mt-8">
              <Link
                href="/alfonso-arrivillaga-cortes"
                className="inline-block rounded-full border border-marfil/50 px-6 py-3 transition-colors hover:bg-marfil hover:text-verde"
              >
                Recorrer su cronología
              </Link>
            </p>
          </div>
          <ol className="border-t border-marfil/25">
            {hitos.map((h, i) => (
              <li
                key={h.anio}
                data-revelar
                style={{ "--espera": `${i * 0.12}s` } as React.CSSProperties}
                className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-marfil/25 py-5 md:grid-cols-[7rem_1fr]"
              >
                <span className="font-serif text-(length:--text-entrada) text-bronce">{h.anio}</span>
                <span className="max-w-[48ch] self-center">{h.texto}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="salas" className="grano relative px-5 py-24 md:px-12 md:py-36">
        <div className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="salas" className="text-(length:--text-titulo)">
              Las salas de la casa
            </h2>
            <p className="max-w-[44ch] text-tinta-suave">
              Hoy hay {publicaciones.length} registros catalogados, {revisados} de ellos cotejados
              con su fuente. Cada sala dice qué contiene ya y qué falta.
            </p>
          </div>
          <ul className="mt-14 border-t border-tinta/20">
            {salas.map((s) => (
              <li key={s.slug} className="border-b border-tinta/20">
                <Link
                  href={`/${s.slug}`}
                  className="grid gap-x-10 gap-y-2 py-7 transition-[padding,background-color] duration-300 hover:bg-marfil/60 hover:pl-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-baseline md:py-9"
                >
                  <span className="font-serif text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-none">
                    {s.nombre}
                  </span>
                  <span className="max-w-[46ch] text-tinta-suave">{s.resumen}</span>
                  <span className="text-(length:--text-nota) text-bronce-oscuro md:text-right">
                    {s.situacion}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sobre-oscuro relative flex min-h-[90svh] flex-col justify-center overflow-hidden bg-carbon px-5 py-28 text-marfil md:px-12">
        <Escena nombre="legado" paralaje={0.18} />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-carbon via-carbon/65 to-transparent" />
        <div data-revelar className="relative max-w-[40rem]">
          <p className="text-bronce">Visita guiada</p>
          <h2 className="mt-4 text-(length:--text-portada) leading-[0.92]">Un recorrido por la casa</h2>
          <p className="mt-6 max-w-[46ch] text-(length:--text-entrada) leading-snug text-marfil/85">
            Nueve estancias, de la puerta al archivo: el nombre, el origen, Alfonso, Sylvia, los
            sonidos, los lugares y la obra reunida hasta hoy.
          </p>
          <p className="mt-9">
            <Link
              href="/recorrido"
              className="inline-block rounded-full bg-marfil px-6 py-3 font-medium text-carbon transition-colors hover:bg-bronce"
            >
              Empezar la visita
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
