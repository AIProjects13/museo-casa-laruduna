"use client";

import { useEffect, useRef } from "react";
import { SITIO } from "@/data/museo";

// Entrada: un travelling por la sala hasta cruzar la puerta y salir al mar,
// guardado como secuencia de fotogramas en /public/hero y recorrido con el
// scroll. Encima, en tiempo real: polvo en la luz, respiración de cámara y
// paralaje con el cursor. La escena es una ilustración contemporánea generada
// para el museo, no un documento histórico.

const SECUENCIAS = {
  g: { carpeta: "/hero/g", total: 121 },
  m: { carpeta: "/hero/m", total: 61 },
};

const ROTULOS = [
  { en: 0.24, texto: "Livingston, finales de los años ochenta." },
  { en: 0.4, texto: "Una familia da nombre a su casa." },
  { en: 0.56, texto: "Casa Laruduna." },
];

// tramo del scroll que ocupa el travelling; después, la luz se vuelve papel
const FIN_SECUENCIA = 0.8;

const ruta = (carpeta: string, i: number) => `${carpeta}/${String(i + 1).padStart(3, "0")}.webp`;

function quiereMenos() {
  const conexion = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches || !!conexion?.saveData;
}

export default function Hero() {
  const seccion = useRef<HTMLElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const polvo = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = seccion.current!;
    const canvas = lienzo.current!;
    const capa = polvo.current!;
    const ctx = canvas.getContext("2d");
    const aire = capa.getContext("2d");
    if (quiereMenos() || !ctx || !aire) return;

    const movil = window.innerWidth < 768;
    const { carpeta, total } = movil ? SECUENCIAS.m : SECUENCIAS.g;
    const cuadros: (HTMLImageElement | undefined)[] = new Array(total);

    let p = 0; // avance del scroll, de 0 a 1
    let actual = 0; // fotograma mostrado, con inercia
    let pintado = -1;
    let bucle = 0;
    let visible = true;
    let vivo = true;
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;

    // motas de polvo con profundidad: las cercanas son mayores y se mueven más
    const motas = Array.from({ length: movil ? 38 : 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      fase: Math.random() * 6.28,
    }));

    const pintar = (i: number) => {
      // si el fotograma aún no ha llegado, se usa el anterior más cercano ya cargado
      let k = Math.max(0, Math.min(total - 1, i));
      while (k > 0 && !cuadros[k]) k--;
      const img = cuadros[k];
      if (!img || k === pintado) return;
      pintado = k;
      const escala = Math.max(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * escala;
      const h = img.height * escala;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      canvas.style.opacity = "1";
    };

    const cuadro = (ahora: number) => {
      bucle = 0;
      if (!visible) return;
      const t = ahora / 1000;

      // la cámara respira: unos fotogramas adelante y atrás aunque nadie haga scroll
      const quieto = 1 - Math.min(1, p / FIN_SECUENCIA);
      const objetivo =
        Math.min(1, p / FIN_SECUENCIA) * (total - 1) + Math.sin(t * 0.55) * (total / 55) * quieto;
      actual += (objetivo - actual) * 0.12;
      pintar(Math.round(actual));

      // paralaje suave con el cursor
      cx += (mx - cx) * 0.05;
      cy += (my - cy) * 0.05;
      el.style.setProperty("--mx", cx.toFixed(4));
      el.style.setProperty("--my", cy.toFixed(4));

      aire.clearRect(0, 0, capa.width, capa.height);
      aire.globalCompositeOperation = "lighter";
      for (const m of motas) {
        const deriva = t * (0.006 + m.z * 0.012);
        const x =
          ((m.x + deriva * 0.6 + Math.sin(t * 0.3 + m.fase) * 0.01 - cx * 0.02 * m.z + 1) % 1) *
          capa.width;
        const y =
          ((m.y - deriva + Math.cos(t * 0.24 + m.fase) * 0.012 - cy * 0.02 * m.z + 2) % 1) *
          capa.height;
        const r = (0.6 + m.z * 2.4) * (capa.width / 1600 + 0.4);
        const brillo = (0.1 + m.z * 0.3) * (0.6 + 0.4 * Math.sin(t * 0.8 + m.fase));
        const g = aire.createRadialGradient(x, y, 0, x, y, r * 3);
        g.addColorStop(0, `rgba(243,226,191,${brillo.toFixed(3)})`);
        g.addColorStop(1, "rgba(243,226,191,0)");
        aire.fillStyle = g;
        aire.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
      }
      bucle = requestAnimationFrame(cuadro);
    };
    const arrancar = () => {
      if (!bucle && visible) bucle = requestAnimationFrame(cuadro);
    };

    const medir = () => {
      const r = el.getBoundingClientRect();
      p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      for (const c of [canvas, capa]) {
        c.width = Math.round(c.clientWidth * dpr);
        c.height = Math.round(c.clientHeight * dpr);
      }
      pintado = -1;
      medir();
    };
    const alMover = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };

    // carga en orden, de pocos en pocos, para no competir con el resto de la página
    let siguiente = 0;
    const cargar = () => {
      if (!vivo || siguiente >= total) return;
      const i = siguiente++;
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        cuadros[i] = img;
        if (i <= Math.round(actual)) pintado = -1;
        cargar();
      };
      img.onerror = cargar;
      img.src = ruta(carpeta, i);
    };
    for (let n = 0; n < 4; n++) cargar();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      arrancar();
    });
    io.observe(el);

    ajustar();
    arrancar();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", ajustar);
    window.addEventListener("pointermove", alMover, { passive: true });
    return () => {
      vivo = false;
      io.disconnect();
      cancelAnimationFrame(bucle);
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", ajustar);
      window.removeEventListener("pointermove", alMover);
    };
  }, []);

  const saltar = () => {
    const destino = document.getElementById("museo");
    destino?.scrollIntoView({ behavior: "instant" });
    destino?.focus({ preventScroll: true });
  };

  return (
    <section
      ref={seccion}
      aria-label="Entrada al museo"
      className="sobre-oscuro relative h-[420vh] bg-carbon text-marfil motion-reduce:h-svh max-md:h-[330vh]"
      style={{ "--p": 0, "--mx": 0, "--my": 0 } as React.CSSProperties}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* la imagen se mueve un poco contra el cursor: da profundidad a la sala */}
        <div
          aria-hidden="true"
          className="absolute inset-0 will-change-transform motion-reduce:!transform-none"
          style={{
            transform:
              "translate3d(calc(var(--mx) * -22px), calc(var(--my) * -14px), 0) scale(calc(1.05 + max(0, var(--p) - 0.82) * 1.4))",
          }}
        >
          {/* primer fotograma: es lo que se ve sin JavaScript, con ahorro de datos o movimiento reducido */}
          <picture>
            <source media="(max-width: 767px)" srcSet={ruta(SECUENCIAS.m.carpeta, 0)} />
            <img
              src={ruta(SECUENCIAS.g.carpeta, 0)}
              alt=""
              fetchPriority="high"
              className="absolute inset-0 size-full object-cover"
            />
          </picture>
          <canvas
            ref={lienzo}
            className="absolute inset-0 size-full opacity-0 transition-opacity duration-700"
          />
        </div>

        {/* polvo en la luz, más cerca de la cámara que la imagen */}
        <canvas
          ref={polvo}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full motion-reduce:hidden"
          style={{ opacity: "calc(1 - max(0, var(--p) - 0.6) * 4)" }}
        />

        {/* sombra bajo el texto */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-carbon/85 via-carbon/35 via-40% to-transparent to-65% max-md:bg-linear-to-t max-md:from-carbon/95 max-md:via-carbon/45 max-md:via-45% max-md:to-carbon/25 max-md:to-100%"
          style={{ opacity: "calc(1 - var(--p) * 2.5)" }}
        />
        {/* viñeta de cine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial from-transparent from-55% to-carbon/70"
          style={{ opacity: "calc(1 - max(0, var(--p) - 0.6) * 3)" }}
        />

        {/* velo final: la luz del mar se vuelve el papel de la siguiente sala */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-papel"
          style={{ opacity: "calc((var(--p) - 0.84) * 6.5)" }}
        />

        {/* rótulos del recorrido: aparecen y se van según avanza el travelling */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 motion-reduce:hidden">
          {ROTULOS.map((r) => (
            <p
              key={r.texto}
              className="absolute inset-x-5 bottom-[14svh] text-center font-serif text-(length:--text-titulo) leading-tight text-marfil [text-shadow:0_2px_30px_rgb(20_26_24/0.95)] md:inset-x-12"
              style={{
                opacity: `calc(1 - max(var(--p) - ${r.en}, ${r.en} - var(--p)) * 13)`,
                transform: `translateY(calc((${r.en} - var(--p)) * 160px))`,
              }}
            >
              {r.texto}
            </p>
          ))}
        </div>
        <p className="sr-only">{ROTULOS.map((r) => r.texto).join(" ")}</p>

        {/* señal de scroll */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 right-5 flex items-center gap-3 text-(length:--text-nota) text-marfil/70 motion-reduce:hidden md:bottom-10 md:right-12"
          style={{ opacity: "calc(1 - var(--p) * 12)" }}
        >
          Desliza para entrar
          <span className="gotear block h-10 w-px bg-bronce" />
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-end px-5 pb-[13svh] md:px-12 md:pb-[11svh]"
          style={{
            opacity: "calc(1 - var(--p) * 6)",
            transform:
              "translate3d(calc(var(--mx) * 14px), calc(var(--p) * -90px + var(--my) * 8px), 0)",
          }}
        >
          <h1 aria-label="Museo Casa Laruduna">
            <span
              aria-hidden="true"
              className="alzar block font-sans text-(length:--text-entrada) font-normal tracking-normal"
            >
              Museo Casa
            </span>
            <span
              aria-hidden="true"
              className="-ml-[0.04em] block overflow-hidden pb-[0.08em] text-(length:--text-portada) leading-[0.92]"
            >
              {"Laruduna".split("").map((letra, i) => (
                <span
                  key={i}
                  className="letra inline-block"
                  style={{ animationDelay: `${0.25 + i * 0.07}s` }}
                >
                  {letra}
                </span>
              ))}
            </span>
          </h1>
          <p
            className="alzar mt-5 max-w-[26ch] text-(length:--text-entrada) leading-snug text-bronce"
            style={{ animationDelay: "0.95s" }}
          >
            {SITIO.subtitulo}
          </p>
          <div
            className="alzar mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
            style={{ animationDelay: "1.15s" }}
          >
            <a
              href="#museo"
              className="rounded-full bg-marfil px-6 py-3 font-medium text-carbon transition-colors hover:bg-bronce"
            >
              Explorar el museo
            </a>
            <button type="button" onClick={saltar} className="enlace py-3 text-(length:--text-nota)">
              Saltar la introducción
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
