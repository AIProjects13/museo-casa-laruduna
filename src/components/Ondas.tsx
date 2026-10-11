"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const OndasEscena = dynamic(() => import("./OndasEscena"), { ssr: false });

// Carga la escena 3D solo si el dispositivo puede con ella y el visitante no
// ha pedido menos movimiento; y solo la anima mientras está en pantalla.
export default function Ondas({ className = "" }: { className?: string }) {
  const marco = useRef<HTMLDivElement>(null);
  const [apto, setApto] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const conexion = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let webgl = false;
    try {
      webgl = !!document.createElement("canvas").getContext("webgl2");
    } catch {}
    setApto(
      webgl &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !conexion?.saveData &&
        (navigator.hardwareConcurrency ?? 4) > 2,
    );
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "10% 0px" });
    if (marco.current) io.observe(marco.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={marco} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {apto && visible && <OndasEscena activo={visible} />}
    </div>
  );
}
