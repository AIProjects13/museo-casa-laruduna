import type { MetadataRoute } from "next";
import { SITIO } from "@/data/museo";

// Las versiones de prueba no se indexan. El sitio definitivo se abre a
// buscadores definiendo SITIO_PUBLICO=1 en el alojamiento.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (process.env.SITIO_PUBLICO !== "1") return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITIO.url}/sitemap.xml` };
}
