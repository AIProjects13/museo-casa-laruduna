import type { EstadoRegistro } from "./fuentes";

// Fotografías del archivo visual. Cada entrada apunta a un archivo guardado en
// /public/archivo/fotografias y solo debe añadirse con permiso de difusión.
// Mientras la lista esté vacía, la sala se muestra como «en preparación».

export type Fotografia = {
  archivo: string; // "/archivo/fotografias/nombre.jpg"
  titulo: string;
  descripcion: string; // texto alternativo: qué se ve en la imagen
  fecha?: string;
  lugar?: string;
  credito?: string; // autoría de la fotografía
  procedencia?: string; // colección o archivo de origen
  derechos?: string; // permiso o licencia
  fuentes: string[]; // ids de src/data/fuentes.ts
  estado: EstadoRegistro;
};

export const fotografias: Fotografia[] = [];
