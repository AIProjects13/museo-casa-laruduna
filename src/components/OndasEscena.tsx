"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

// Escultura sonora en 3D: un campo de líneas que ondulan en profundidad,
// como surcos o formas de onda apiladas. No representa ninguna grabación
// concreta; es una pieza visual.

const LINEAS = 44;
const PUNTOS = 150;
const ANCHO = 15;

function Campo() {
  const lineas = useMemo(() => {
    return Array.from({ length: LINEAS }, (_, j) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(PUNTOS * 3);
      for (let i = 0; i < PUNTOS; i++) {
        pos[i * 3] = (i / (PUNTOS - 1) - 0.5) * ANCHO;
        pos[i * 3 + 2] = -j * 0.36;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const cerca = 1 - j / LINEAS;
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#c1a275").lerp(new THREE.Color("#e7ddcb"), cerca * 0.5),
        transparent: true,
        opacity: 0.12 + cerca * 0.6,
      });
      return new THREE.Line(geo, mat);
    });
  }, []);

  useFrame(({ clock, camera, pointer }) => {
    const t = clock.elapsedTime;
    lineas.forEach((linea, j) => {
      const pos = linea.geometry.attributes.position as THREE.BufferAttribute;
      const fase = j * 0.33;
      for (let i = 0; i < PUNTOS; i++) {
        const u = i / (PUNTOS - 1);
        // envolvente: la energía se concentra en el centro y viaja de línea en línea
        const centro = 0.5 + Math.sin(t * 0.22 + fase * 0.5) * 0.16;
        const env = Math.exp(-((u - centro) ** 2) / 0.03);
        const onda =
          Math.sin(u * 46 + t * 1.5 + fase) * 0.5 +
          Math.sin(u * 91 - t * 2.1 + fase * 1.7) * 0.3 +
          Math.sin(u * 17 + t * 0.6) * 0.2;
        pos.setY(i, env * onda * (0.9 + Math.sin(t * 0.5 + fase) * 0.35));
      }
      pos.needsUpdate = true;
    });
    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.03;
    camera.position.y += (2.1 + pointer.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, -5);
  });

  return (
    <group>
      {lineas.map((l, j) => (
        <primitive key={j} object={l} />
      ))}
    </group>
  );
}

export default function OndasEscena({ activo }: { activo: boolean }) {
  return (
    <Canvas
      frameloop={activo ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 38, near: 0.1, far: 40, position: [0, 2.1, 6.5] }}
      aria-hidden="true"
    >
      <fog attach="fog" args={["#141a18", 6, 20]} />
      <Campo />
    </Canvas>
  );
}
