// Genera el sitio estático en out/ listo para subir a cualquier alojamiento.
import { execSync } from "node:child_process";

execSync("npx next build", { stdio: "inherit", env: { ...process.env, EXPORTAR: "1" } });
await import("./aplanar-export.mjs");
