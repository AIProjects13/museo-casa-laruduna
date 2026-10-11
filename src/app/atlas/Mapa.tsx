"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Map as MapaGL } from "maplibre-gl";
import { lugares } from "@/data/lugares";

// Previsualización del atlas: cartografía de OpenFreeMap (datos de
// OpenStreetMap) teñida con la paleta del museo. Los puntos aparecen uno a
// uno y la cámara vuela hasta el lugar elegido.

const ESTILO = "https://tiles.openfreemap.org/styles/dark";
// encuadre que contiene todos los lugares, sea cual sea el tamaño de pantalla
const lons = lugares.map((l) => l.lon);
const lats = lugares.map((l) => l.lat);
const ENCUADRE: [[number, number], [number, number]] = [
  [Math.min(...lons), Math.min(...lats)],
  [Math.max(...lons), Math.max(...lats)],
];

export default function Mapa() {
  const caja = useRef<HTMLDivElement>(null);
  const mapa = useRef<MapaGL | null>(null);
  const [elegido, setElegido] = useState(lugares[0].id);
  const [fallo, setFallo] = useState(false);
  const lugar = lugares.find((l) => l.id === elegido)!;

  useEffect(() => {
    let vivo = true;
    const calma = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    import("maplibre-gl")
      .then((gl) => {
        if (!vivo || !caja.current) return;
        // el hilo de trabajo de MapLibre se sirve desde /public/maplibre
        gl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
        const m = new gl.Map({
          container: caja.current,
          style: ESTILO,
          center: [-86, 14.5],
          zoom: 4.2,
          attributionControl: { compact: true },
          cooperativeGestures: true,
        });
        mapa.current = m;
        m.addControl(new gl.NavigationControl({ showCompass: false }), "bottom-right");
        m.on("error", () => {});

        // con "style.load" basta: no hace falta esperar a que lleguen todas las teselas
        m.once("style.load", () => {
          // se tiñe el estilo base con la paleta del museo y se quita el ruido
          for (const capa of m.getStyle().layers) {
            const id = capa.id;
            try {
              if (capa.type === "background") m.setPaintProperty(id, "background-color", "#141a18");
              else if (id === "water") m.setPaintProperty(id, "fill-color", "#22332f");
              else if (id === "waterway") m.setPaintProperty(id, "line-color", "#22332f");
              else if (/^(landcover|landuse)/.test(id)) m.setPaintProperty(id, "fill-color", "#19221f");
              else if (/^boundary/.test(id)) {
                m.setPaintProperty(id, "line-color", "#c1a275");
                m.setPaintProperty(id, "line-opacity", 0.35);
              } else if (/^(highway|railway|aeroway|road|building|place_other|place_suburb|place_village)/.test(id))
                m.setLayoutProperty(id, "visibility", "none");
              else if (capa.type === "symbol") {
                m.setPaintProperty(id, "text-color", "#e7ddcb");
                m.setPaintProperty(id, "text-opacity", 0.5);
                m.setPaintProperty(id, "text-halo-color", "#141a18");
              }
            } catch {}
          }

          // hilos desde Livingston a cada lugar
          const origen = lugares[0];
          m.addSource("hilos", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: lugares.slice(1).map((l) => ({
                type: "Feature" as const,
                properties: {},
                geometry: {
                  type: "LineString" as const,
                  coordinates: [
                    [origen.lon, origen.lat],
                    [l.lon, l.lat],
                  ],
                },
              })),
            },
          });
          m.addLayer({
            id: "hilos",
            type: "line",
            source: "hilos",
            paint: { "line-color": "#c1a275", "line-opacity": 0.3, "line-width": 1, "line-dasharray": [2, 3] },
          });

          lugares.forEach((l, i) => {
            const punto = document.createElement("button");
            punto.type = "button";
            punto.className = "punto-atlas";
            punto.dataset.lugar = l.id;
            punto.style.animationDelay = `${1.2 + i * 0.28}s`;
            punto.setAttribute("aria-label", `${l.nombre}, ${l.region}`);
            punto.addEventListener("click", () => setElegido(l.id));
            new gl.Marker({ element: punto }).setLngLat([l.lon, l.lat]).addTo(m);
          });

          m.fitBounds(ENCUADRE, { padding: 56, duration: calma ? 0 : 5200, essential: true });
        });
      })
      .catch(() => setFallo(true));

    return () => {
      vivo = false;
      mapa.current?.remove();
      mapa.current = null;
    };
  }, []);

  const ir = (id: string) => {
    setElegido(id);
    const l = lugares.find((x) => x.id === id)!;
    mapa.current?.flyTo({ center: [l.lon, l.lat], zoom: 8.2, duration: 2600, essential: true });
  };

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".punto-atlas").forEach((p) => {
      if (p.dataset.lugar === elegido) p.setAttribute("aria-current", "true");
      else p.removeAttribute("aria-current");
    });
  }, [elegido]);

  return (
    <div className="grid lg:grid-cols-[22rem_1fr]">
      <div className="order-2 border-t border-marfil/15 px-5 py-8 md:px-12 lg:order-1 lg:max-h-[82svh] lg:overflow-y-auto lg:border-r lg:border-t-0 lg:px-8">
        <ul>
          {lugares.map((l) => (
            <li key={l.id} className="border-b border-marfil/15">
              <button
                type="button"
                onClick={() => ir(l.id)}
                aria-pressed={l.id === elegido}
                className="group w-full py-4 text-left"
              >
                <span className="block font-serif text-2xl leading-tight transition-colors group-hover:text-bronce group-aria-pressed:text-bronce">
                  {l.nombre}
                </span>
                <span className="text-(length:--text-nota) text-marfil/55">{l.region}</span>
              </button>
              {l.id === elegido && (
                <div className="pb-5">
                  <p className="max-w-[40ch] text-marfil/85">{l.nota}</p>
                  <p className="mt-2 text-(length:--text-nota) text-marfil/55">
                    Posición aproximada.{" "}
                    <Link href={`/fuentes#${l.fuentes[0]}`} className="enlace">
                      Ver la fuente
                    </Link>
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative order-1 h-[62svh] lg:order-2 lg:h-[82svh]">
        <div ref={caja} className="size-full" aria-label={`Mapa. Lugar elegido: ${lugar.nombre}`} role="application" />
        {fallo && (
          <p className="absolute inset-0 grid place-items-center px-8 text-center text-marfil/70">
            El mapa no ha podido cargarse. La lista de lugares sigue disponible.
          </p>
        )}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_40px_#141a18]" />
      </div>
    </div>
  );
}
