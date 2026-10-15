import type { EstadoRegistro } from "./fuentes";

// Fotografías del archivo visual. Cada entrada apunta a un archivo guardado en
// /public/archivo/fotografias y solo debe añadirse con permiso de difusión.

export type Fotografia = {
  archivo: string; // "/archivo/fotografias/nombre.jpg"
  titulo: string;
  descripcion: string; // texto alternativo: qué se ve en la imagen
  coleccion?: string; // agrupa las fotos en la galería
  fecha?: string;
  lugar?: string;
  credito?: string; // autoría de la fotografía
  procedencia?: string; // colección o archivo de origen
  derechos?: string; // permiso o licencia
  relacion?: string[]; // slugs de src/data/publicaciones.ts
  nota?: string;
  fuentes: string[]; // ids de src/data/fuentes.ts
  estado: EstadoRegistro;
};

const SYLVIA = "Sylvia Lucrecia Shaw Arrivillaga";
const CASA = "Colección Casa Laruduna";
const PERMISO = "Difusión autorizada por la familia";

export const fotografias: Fotografia[] = [
  {
    archivo: "/archivo/fotografias/maya-hohn-2.jpg",
    titulo: "Maya Hohn",
    descripcion:
      "Cuatro músicos de pie en un camino de tierra con una mandolina rotulada «Maya Hohn», un violín, una guitarra grande y una guitarra.",
    coleccion: "Maya Hohn",
    credito: SYLVIA,
    procedencia: CASA,
    derechos: PERMISO,
    relacion: ["maya-hohn-canta-desde-el-refugio", "tributo-a-la-esperanza"],
    nota: "El grupo grabó con la casa en el refugio (1993). Fecha y lugar de la fotografía, por confirmar.",
    fuentes: ["archivo-laruduna"],
    estado: "pendiente de verificar",
  },
  {
    archivo: "/archivo/fotografias/maya-hohn-1.jpg",
    titulo: "Maya Hohn, retrato del grupo",
    descripcion:
      "Retrato cercano de los cuatro integrantes de Maya Hohn con mandolina, violín y guitarras.",
    coleccion: "Maya Hohn",
    credito: SYLVIA,
    procedencia: CASA,
    derechos: PERMISO,
    relacion: ["maya-hohn-canta-desde-el-refugio", "tributo-a-la-esperanza"],
    nota: "Fecha y lugar, por confirmar.",
    fuentes: ["archivo-laruduna"],
    estado: "pendiente de verificar",
  },
  {
    archivo: "/archivo/fotografias/xajla-1.jpg",
    titulo: "Marimbistas, Xajla",
    descripcion:
      "Cinco marimbistas con baquetas en la mano, de pie en una calle empedrada de un pueblo de montaña.",
    coleccion: "Xajla",
    credito: SYLVIA,
    procedencia: CASA,
    derechos: PERMISO,
    nota: "El nombre «Xajla» procede del archivo original. Lugar, fecha y nombres de los músicos, por confirmar.",
    fuentes: ["archivo-laruduna"],
    estado: "pendiente de verificar",
  },
  {
    archivo: "/archivo/fotografias/xajla-2.jpg",
    titulo: "Marimbistas sentados, Xajla",
    descripcion:
      "Los mismos cinco marimbistas sentados en una banqueta frente a una pared, con sus baquetas.",
    coleccion: "Xajla",
    credito: SYLVIA,
    procedencia: CASA,
    derechos: PERMISO,
    nota: "Lugar, fecha y nombres de los músicos, por confirmar.",
    fuentes: ["archivo-laruduna"],
    estado: "pendiente de verificar",
  },
  {
    archivo: "/archivo/fotografias/aurora.jpg",
    titulo: "Músicos con guitarras, «Aurora»",
    descripcion:
      "Siete hombres en el campo, entre árboles, con guitarras y un guitarrón.",
    coleccion: "Aurora",
    credito: SYLVIA,
    procedencia: CASA,
    derechos: PERMISO,
    nota: "«Aurora» es el nombre del archivo original. Lugar, fecha y grupo, por confirmar.",
    fuentes: ["archivo-laruduna"],
    estado: "pendiente de verificar",
  },
];
