// Tras `next build` en modo exportación, Next guarda los datos de precarga de
// cada ruta en carpetas (__next.ruta/__PAGE__.txt) pero el navegador los pide
// con puntos (__next.ruta.__PAGE__.txt). Este paso crea las copias con ese nombre.
import { cpSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

let copiados = 0;
function aplanar(dir, prefijo, destino) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) aplanar(ruta, `${prefijo}.${nombre}`, destino);
    else {
      cpSync(ruta, join(destino, `${prefijo}.${nombre}`));
      copiados++;
    }
  }
}
function recorrer(dir) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (!statSync(ruta).isDirectory()) continue;
    if (nombre.startsWith("__next.")) aplanar(ruta, nombre, dir);
    else if (nombre !== "_next") recorrer(ruta);
  }
}
recorrer("out");
console.log(`Datos de precarga aplanados: ${copiados}`);
