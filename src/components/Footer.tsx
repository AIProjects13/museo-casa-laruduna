import Link from "next/link";
import { salas, SITIO } from "@/data/museo";
import { Umbral } from "./Logo";

export default function Footer() {
  return (
    <footer className="sobre-oscuro bg-carbon px-5 py-16 text-marfil md:px-12 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Umbral className="h-14 w-auto text-bronce" />
          <p className="mt-6 max-w-[18ch] font-serif text-(length:--text-titulo) leading-none">
            {SITIO.lema}
          </p>
        </div>
        <nav aria-label="Pie: salas">
          <ul className="space-y-2">
            {salas.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="enlace">
                  {s.nombre}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/recorrido" className="enlace">
                Visita guiada
              </Link>
            </li>
          </ul>
        </nav>
        <div className="space-y-4 text-(length:--text-nota) text-marfil/75">
          <p>
            Museo digital independiente y sin ánimo de lucro. Cada dato publicado remite a una
            fuente; lo que aún no está comprobado se indica como pendiente.
          </p>
          <p>
            <Link href="/fuentes" className="enlace text-marfil">
              Fuentes y criterios de verificación
            </Link>
          </p>
          <p>
            Las escenas e imágenes de ambiente del sitio son ilustraciones contemporáneas
            generadas para el museo. No son fotografías de archivo ni documentos históricos.
          </p>
        </div>
      </div>
    </footer>
  );
}
