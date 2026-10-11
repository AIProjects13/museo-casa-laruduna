import type { Metadata } from "next";
import { Escena } from "@/components/Escena";
import { publicaciones } from "@/data/publicaciones";
import Catalogo from "./Catalogo";

export const metadata: Metadata = {
  title: "Biblioteca digital",
  description:
    "Catálogo de publicaciones de Alfonso Arrivillaga Cortés y de Casa Laruduna, con fuente y estado de verificación.",
  alternates: { canonical: "/biblioteca" },
};

export default function Biblioteca() {
  const pendientes = publicaciones.filter((p) => p.estado !== "revisado").length;
  const anios = publicaciones.map((p) => p.anio);
  return (
    <main id="museo">
      <section className="sobre-oscuro relative flex min-h-[78svh] flex-col justify-end overflow-hidden bg-carbon px-5 pb-14 pt-36 text-marfil md:px-12 md:pb-20">
        <Escena nombre="memoria" prioridad />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/55 to-carbon/25 md:bg-linear-to-r md:from-carbon md:via-carbon/65 md:to-transparent"
        />
        <div className="relative">
          <h1 className="max-w-[12ch] text-(length:--text-portada) leading-[0.92]">
            Biblioteca digital
          </h1>
          <p className="mt-8 max-w-[52ch] text-(length:--text-entrada) leading-snug text-marfil/90">
            {publicaciones.length} obras escritas y sonoras, de {Math.min(...anios)} a{" "}
            {Math.max(...anios)}. {pendientes} tienen todavía algún dato por comprobar, y así se
            indica en cada ficha.
          </p>
          <p className="mt-4 max-w-[60ch] text-marfil/70">
            La biblioteca enlaza a los editores y repositorios originales. No aloja documentos
            mientras no conste el permiso de difusión.
          </p>
        </div>
      </section>

      <section className="grano relative px-5 pb-24 pt-6 md:px-12 md:pb-36">
        <div className="relative">
          <Catalogo />
        </div>
      </section>
    </main>
  );
}
