// Marca: un umbral. El vano de una puerta y, dentro, la línea del horizonte.
// Hereda el color del texto, así sirve sobre fondo claro y oscuro.

export function Umbral({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden="true" fill="none">
      <path d="M3 39V3h26v36" stroke="currentColor" strokeWidth="2" />
      <path d="M10 39V11h12v28" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10 27h12" stroke="currentColor" strokeWidth="1.25" />
      <path d="M0 39h32" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Umbral className="h-8 w-auto" />
      <span className="leading-none">
        <span className="block text-[0.7rem] tracking-[0.08em]">Museo Casa</span>
        <span className="block font-serif text-[1.35rem] tracking-[0.01em]">Laruduna</span>
      </span>
    </span>
  );
}
