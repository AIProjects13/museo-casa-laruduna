import type { NextConfig } from "next";

// EXPORTAR=1 genera el sitio como archivos estáticos en out/, para alojarlo
// en cualquier servidor sin funciones.
const estatico = process.env.EXPORTAR === "1";

const nextConfig: NextConfig = {
  ...(estatico ? { output: "export" as const, trailingSlash: true } : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
