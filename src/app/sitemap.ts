import type { MetadataRoute } from "next";
import { salas, SITIO } from "@/data/museo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...salas.map((s) => `/${s.slug}`), "/recorrido", "/fuentes"].map((ruta) => ({
    url: `${SITIO.url}${ruta}`,
  }));
}
