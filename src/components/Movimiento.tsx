"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Movimiento ligado al scroll para todo el sitio, sin dependencias:
//  - [data-paralaje="0.2"]  se desplaza según su posición en pantalla (capas con profundidad)
//  - [data-revelar]         recibe la clase "visto" la primera vez que entra en pantalla
export default function Movimiento() {
  const ruta = usePathname();

  useEffect(() => {
    const calma = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("visto");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-revelar]").forEach((el) => io.observe(el));
    if (calma) return () => io.disconnect();

    let pendiente = 0;
    const mover = () => {
      pendiente = 0;
      const alto = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-paralaje]").forEach((el) => {
        const marco = (el.parentElement ?? el).getBoundingClientRect();
        if (marco.bottom < -alto * 0.3 || marco.top > alto * 1.3) return;
        const centro = marco.top + marco.height / 2 - alto / 2;
        el.style.transform = `translate3d(0, ${(centro * -Number(el.dataset.paralaje)).toFixed(1)}px, 0)`;
      });
    };
    const alDesplazar = () => {
      if (!pendiente) pendiente = requestAnimationFrame(mover);
    };
    mover();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar);
    return () => {
      io.disconnect();
      cancelAnimationFrame(pendiente);
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
    };
  }, [ruta]);

  return null;
}
