import type { Metadata } from "next";
import { fuentes } from "@/data/fuentes";

export const metadata: Metadata = {
  title: "Fuentes y criterios de verificación",
  alternates: { canonical: "/fuentes" },
};

const fecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es", { dateStyle: "long", timeZone: "UTC" });

export default function PaginaFuentes() {
  return (
    <main id="museo" className="grano relative px-5 pb-24 pt-40 md:px-12 md:pb-36 md:pt-52">
      <div className="relative">
        <h1 className="max-w-[14ch] text-(length:--text-portada) leading-[0.95]">Fuentes</h1>
        <div className="mt-10 max-w-[62ch] space-y-5">
          <p className="font-serif text-(length:--text-entrada) leading-snug">
            El museo no publica fechas, títulos ni hechos que no pueda remitir a una fuente.
          </p>
          <p>
            Un dato figura como «revisado» cuando se ha leído en una fuente primaria o en la ficha
            de la institución que lo publicó. Figura como «pendiente de verificar» cuando procede
            de una fuente secundaria, cuando las fuentes discrepan o cuando falta consultar el
            original. Los datos biográficos pendientes deberán confirmarse con la familia.
          </p>
        </div>
        <ol className="mt-16 border-t border-tinta/20">
          {fuentes.map((f) => (
            <li
              key={f.id}
              id={f.id}
              className="scroll-mt-28 border-b border-tinta/20 py-7 target:bg-marfil"
            >
              <p className="max-w-[80ch]">{f.cita}</p>
              <p className="mt-2 text-(length:--text-nota) text-tinta-suave">
                Fuente {f.tipo}
                {f.licencia && `, ${f.licencia}`}. Consultada el {fecha(f.consultada)}.{" "}
                {f.url && (
                  <a href={f.url} className="enlace" rel="noopener">
                    Abrir la fuente
                  </a>
                )}
              </p>
              {f.nota && (
                <p className="mt-2 max-w-[80ch] text-(length:--text-nota) text-arcilla">{f.nota}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
