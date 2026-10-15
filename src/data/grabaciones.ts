import type { EstadoRegistro } from "./fuentes";

// Grabaciones del archivo de la casa: audio para la Fonoteca y vídeo para el
// Archivo visual. Archivos en /public/archivo/audio y /public/archivo/video,
// solo con permiso de difusión.

export type Grabacion = {
  id: string;
  tipo: "audio" | "video";
  archivo: string;
  poster?: string; // imagen fija para los vídeos
  titulo: string;
  descripcion: string;
  duracion: string;
  fecha?: string;
  lugar?: string;
  participantes?: string;
  credito?: string;
  procedencia?: string;
  derechos?: string;
  nota?: string;
  fuentes: string[];
  estado: EstadoRegistro;
};

export const grabaciones: Grabacion[] = [
  {
    id: "el-soplo-segunda-parte",
    tipo: "audio",
    archivo: "/archivo/audio/el-soplo-segunda-parte.m4a",
    titulo: "El soplo, segunda parte",
    descripcion: "Grabación sonora conservada en el archivo de la casa.",
    duracion: "2 min 9 s",
    procedencia: "Archivo Casa Laruduna",
    derechos: "Difusión autorizada por la familia",
    nota: "Es la pista 2 de un disco de 24 pistas que todavía no está identificado. Intérpretes, lugar y fecha, por confirmar.",
    fuentes: ["archivo-laruduna"],
    estado: "pendiente de verificar",
  },
  {
    id: "campo-huehuetenango-2008",
    tipo: "video",
    archivo: "/archivo/video/campo-huehuetenango-2008.mp4",
    poster: "/archivo/video/campo-huehuetenango-2008.jpg",
    titulo: "Tejedora en telar de cintura",
    descripcion:
      "Una tejedora trabaja en su telar de cintura y conversa mientras teje, en una sala con textiles expuestos.",
    duracion: "1 min 16 s",
    fecha: "2008",
    lugar: "Huehuetenango",
    procedencia: "Archivo Casa Laruduna, trabajo de campo",
    derechos: "Difusión autorizada por la familia",
    nota: "Lugar y año tomados del nombre del archivo original. Nombre de la tejedora y autoría de la grabación, por confirmar.",
    fuentes: ["archivo-laruduna"],
    estado: "pendiente de verificar",
  },
];

export const audios = grabaciones.filter((g) => g.tipo === "audio");
export const videos = grabaciones.filter((g) => g.tipo === "video");
