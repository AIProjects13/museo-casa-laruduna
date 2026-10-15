import type { Metadata } from "next";
import Link from "next/link";
import { Escena, type NombreEscena } from "@/components/Escena";
import Ondas from "@/components/Ondas";
import { cronologia } from "@/data/cronologia";
import { lugares } from "@/data/lugares";
import { salaPorSlug } from "@/data/museo";
import { publicaciones } from "@/data/publicaciones";
import Guia from "./Guia";

export const metadata: Metadata = {
  title: "Visita guiada",
  description: "Lo esencial de Casa Laruduna, estancia por estancia, con sus fuentes.",
  alternates: { canonical: "/recorrido" },
};

const sonoras = publicaciones
  .filter((p) => p.categoria === "Producción sonora" && p.estado === "revisado")
  .sort((a, b) => a.anio - b.anio);
const anios = publicaciones.map((p) => p.anio);
const pendientes = [
  ...salaPorSlug("la-casa")!.pendiente,
  ...salaPorSlug("alfonso-arrivillaga-cortes")!.pendiente.slice(0, 2),
];

function Fuente({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p className="mt-6 text-(length:--text-nota) text-marfil/60">
      {children}{" "}
      <Link href={`/fuentes#${id}`} className="enlace">
        Ver la fuente
      </Link>
    </p>
  );
}

type Estancia = {
  titulo: string;
  escena?: NombreEscena;
  ondas?: boolean;
  fondo?: string;
  contenido: React.ReactNode;
};

const estancias: Estancia[] = [
  {
    titulo: "La puerta",
    escena: "legado",
    contenido: (
      <>
        <p className="text-bronce">Para Alfonso</p>
        <h1 className="mt-4 max-w-[12ch] text-(length:--text-portada) leading-[0.92]">
          Una visita a Casa Laruduna
        </h1>
        <p className="mt-8 max-w-[44ch] text-(length:--text-entrada) leading-snug text-marfil/90">
          Nueve estancias con lo que hoy puede contarse con fuentes. Lo demás queda señalado como
          pendiente.
        </p>
        <p className="mt-6 text-(length:--text-nota) text-marfil/60">
          Avanza con el scroll, con las flechas del teclado o con la visita automática.
        </p>
      </>
    ),
  },
  {
    titulo: "El nombre",
    fondo: "bg-verde",
    contenido: (
      <>
        <blockquote className="max-w-[18ch] font-serif text-(length:--text-portada) italic leading-[0.98]">
          «No es ONG, ni una fundación, sino nuestras vidas.»
        </blockquote>
        <p className="mt-10 max-w-[50ch] text-marfil/85">
          Así definió Alfonso a Laruduna en 2007. En esa entrevista se dice que es el nombre de un
          lugar de Livingston y que significa «a la orilla del mar». El museo lo mantiene como dato
          pendiente hasta que él lo confirme.
        </p>
        <Fuente id="gil-2007">Gemma Gil, Prensa Libre, 22 de abril de 2007.</Fuente>
      </>
    ),
  },
  {
    titulo: "La casa",
    escena: "memoria",
    contenido: (
      <>
        <h2 className="text-(length:--text-portada) leading-[0.92]">Una casa de familia</h2>
        <p className="mt-8 max-w-[46ch] font-serif text-(length:--text-entrada) italic leading-snug">
          «Casa Laruduna, como llamamos a nuestras iniciativas en crecimiento y a nuestro proyecto
          familiar.»
        </p>
        <p className="mt-6 max-w-[50ch] text-marfil/85">
          Nació en Livingston a finales de los años ochenta y residió algunos años en una de las
          habitaciones de la Casa Grande de la Compañía Verapaz. Allí empezó un archivo de cintas,
          casetes, película y objetos.
        </p>
        <Fuente id="arrivillaga-2022">Alfonso Arrivillaga Cortés, 2022.</Fuente>
      </>
    ),
  },
  {
    titulo: "Alfonso",
    ondas: true,
    contenido: (
      <>
        <p className="text-bronce">Antropólogo y etnomusicólogo</p>
        <h2 className="mt-4 max-w-[13ch] text-(length:--text-portada) leading-[0.92]">
          Alfonso Arrivillaga Cortés
        </h2>
        <p className="mt-8 max-w-[50ch] text-(length:--text-entrada) leading-snug text-marfil/90">
          Investigador titular de la Universidad de San Carlos de Guatemala. Más de cuatro décadas
          de trabajo sobre las músicas de Mesoamérica y la nación garífuna.
        </p>
        <p className="mt-8">
          <Link href="/alfonso-arrivillaga-cortes" className="enlace text-bronce">
            Recorrer su cronología, de {Math.floor(cronologia[1].orden)} a{" "}
            {Math.floor(cronologia[cronologia.length - 1].orden)}
          </Link>
        </p>
      </>
    ),
  },
  {
    titulo: "Sylvia",
    fondo: "bg-carbon",
    contenido: (
      <>
        {/* el texto deja sitio a la fotografía en pantallas anchas */}
        <div className="lg:pr-[26rem]">
          <p className="text-bronce">Guatemala, 14 de enero de 1957 - 3 de mayo de 2022</p>
          <h2 className="mt-4 max-w-[14ch] text-(length:--text-portada) leading-[0.92]">
            Sylvia Lucrecia Shaw Arrivillaga
          </h2>
          <p className="mt-8 max-w-[50ch] text-(length:--text-entrada) leading-snug text-marfil/90">
            Está en el origen de la casa. Gestora cultural y traductora, dirigió sus producciones
            musicales y buena parte de su gestión.
          </p>
          <p className="mt-5 max-w-[50ch] text-marfil/80">
            En 2022 Alfonso escribió su vida académica y profesional. Ese texto es la fuente
            principal de este museo.
          </p>
          <Fuente id="arrivillaga-2022">
            Laruduna, la casa de Sylvia Lucrecia Shaw Arrivillaga, le dice adiós.
          </Fuente>
        </div>
        <figure className="mt-10 max-w-[20rem] lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[22rem] lg:max-w-none lg:-translate-y-1/2">
          <img
            src="/archivo/fotografias/maya-hohn-2.jpg"
            alt="Cuatro músicos del grupo Maya Hohn con sus instrumentos en un camino de tierra."
            className="w-full"
          />
          <figcaption className="mt-3 text-(length:--text-nota) text-marfil/60">
            Maya Hohn. Fotografía de Sylvia Shaw Arrivillaga, Colección Casa Laruduna.{" "}
            <Link href="/archivo-visual" className="enlace">
              Ver sus fotografías
            </Link>
          </figcaption>
        </figure>
      </>
    ),
  },
  {
    titulo: "El sonido",
    escena: "sonido",
    ondas: true,
    contenido: (
      <>
        <h2 className="text-(length:--text-portada) leading-[0.92]">Grabar donde se toca</h2>
        <ol className="mt-10 max-w-[44rem] border-t border-marfil/20">
          {sonoras.map((p) => (
            <li key={p.slug} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-marfil/20 py-2.5">
              <span className="font-serif text-(length:--text-entrada) leading-none text-bronce">
                {p.anio}
              </span>
              <Link href={`/biblioteca#${p.slug}`} className="enlace self-center">
                {p.titulo}
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-[50ch] text-(length:--text-nota) text-marfil/60">
          El museo cataloga estas producciones. No reproduce audio hasta contar con los originales
          digitalizados y el permiso de sus intérpretes.
        </p>
      </>
    ),
  },
  {
    titulo: "El territorio",
    escena: "territorio",
    contenido: (
      <>
        <h2 className="text-(length:--text-portada) leading-[0.92]">Del Caribe a la frontera</h2>
        <ul className="mt-10 flex max-w-[46rem] flex-wrap gap-x-6 gap-y-2 font-serif text-(length:--text-entrada) leading-snug">
          {lugares.map((l) => (
            <li key={l.id}>{l.nombre}</li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/atlas" className="enlace text-bronce">
            Ver estos lugares en el mapa
          </Link>
        </p>
      </>
    ),
  },
  {
    titulo: "La obra",
    fondo: "bg-verde",
    contenido: (
      <>
        <p className="font-serif text-[clamp(6rem,3rem+18vw,18rem)] leading-[0.8] text-bronce">
          {publicaciones.length}
        </p>
        <h2 className="mt-6 max-w-[20ch] text-(length:--text-titulo)">
          obras escritas y sonoras catalogadas, de {Math.min(...anios)} a {Math.max(...anios)}
        </h2>
        <p className="mt-6 max-w-[50ch] text-marfil/85">
          Cada una con su fuente y su estado de verificación.
        </p>
        <p className="mt-9">
          <Link
            href="/biblioteca"
            className="inline-block rounded-full bg-marfil px-6 py-3 font-medium text-carbon transition-colors hover:bg-bronce"
          >
            Abrir la biblioteca
          </Link>
        </p>
      </>
    ),
  },
  {
    titulo: "Lo que sigue",
    escena: "legado",
    contenido: (
      <>
        <h2 className="max-w-[14ch] text-(length:--text-portada) leading-[0.92]">
          La casa continúa
        </h2>
        <p className="mt-8 max-w-[50ch] text-(length:--text-entrada) leading-snug text-marfil/90">
          Su hijo la ha convertido en este museo digital. Falta lo que solo Alfonso puede contar:
        </p>
        <ul className="mt-8 max-w-[52ch] list-disc space-y-3 pl-5 marker:text-bronce">
          {pendientes.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="mt-10">
          <Link
            href="/"
            className="inline-block rounded-full bg-marfil px-6 py-3 font-medium text-carbon transition-colors hover:bg-bronce"
          >
            Entrar al museo
          </Link>
        </p>
      </>
    ),
  },
];

export default function Recorrido() {
  return (
    <main id="museo" className="recorrido sobre-oscuro bg-carbon text-marfil">
      <Guia titulos={estancias.map((e) => e.titulo)} />
      {estancias.map((e, i) => (
        <section
          key={e.titulo}
          id={`paso-${i}`}
          data-paso={i}
          aria-label={e.titulo}
          className={`estancia relative flex min-h-svh snap-start flex-col justify-center overflow-hidden px-5 pb-44 pt-28 md:px-12 md:pb-40 ${e.fondo ?? "bg-carbon"}`}
        >
          {e.escena && (
            <>
              <Escena nombre={e.escena} prioridad={i === 0} paralaje={0.14} className="estancia-fondo" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/70 to-carbon/40 md:bg-linear-to-r md:from-carbon md:via-carbon/75 md:to-transparent"
              />
            </>
          )}
          {e.ondas && <Ondas className="opacity-70 mix-blend-screen" />}
          <div className="estancia-texto relative">{e.contenido}</div>
        </section>
      ))}
    </main>
  );
}
