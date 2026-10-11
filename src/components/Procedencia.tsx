import { fuentePorId, type EstadoRegistro } from "@/data/fuentes";

// Estado de verificación y fuentes de un dato o registro.
export function Estado({ estado }: { estado: EstadoRegistro }) {
  const revisado = estado === "revisado" || estado === "publicado";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-(length:--text-nota) ${
        revisado ? "text-verde" : "text-arcilla"
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${revisado ? "bg-verde" : "border border-arcilla"}`}
      />
      {revisado ? "Revisado con la fuente" : "Pendiente de verificar"}
    </span>
  );
}

export function Fuentes({ ids }: { ids: string[] }) {
  return (
    <span className="text-(length:--text-nota) text-tinta-suave">
      Fuente:{" "}
      {ids.map((id, i) => {
        const f = fuentePorId(id);
        if (!f) return null;
        const corta = f.cita.split(". ")[0].slice(0, 70);
        return (
          <span key={id}>
            {i > 0 && "; "}
            <a href={`/fuentes#${id}`} className="enlace">
              {corta}
            </a>
          </span>
        );
      })}
    </span>
  );
}
