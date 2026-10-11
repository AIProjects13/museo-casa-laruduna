# Museo Casa Laruduna

Museo digital de Casa Laruduna y de la obra de Alfonso Arrivillaga Cortés.
Dominio previsto: https://www.laruduna.org

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
```

## Estructura

- `src/data/fuentes.ts`: registro de fuentes. Todo dato publicado remite a una por su `id`.
- `src/data/publicaciones.ts`: fichas de la biblioteca y la fonoteca.
- `src/data/museo.ts`: salas, hechos documentados y pendientes de cada una.
- `src/components/Hero.tsx`: entrada. Mide el scroll y decide entre la escena 3D y la alternativa CSS.
- `src/components/HeroScene.tsx`: escena Three.js (React Three Fiber).
- `src/app/[sala]/page.tsx`: plantilla común de las salas.
- `docs/INVESTIGACION.md`: inventario de fuentes, hechos confirmados y datos pendientes.

## Regla editorial

Ningún dato entra en `src/data` sin fuente. Lo que procede de una fuente secundaria, o de
fuentes que discrepan, se marca `pendiente de verificar` y así se muestra en el sitio.
Las imágenes generadas no se presentan nunca como fotografía histórica.

## Recursos generados

La escena de entrada es un vídeo generado con Seedance 1.0 Pro (APIMart), etalonado con ffmpeg
y exportado como secuencia WebP en `public/hero/` (`g` para escritorio, `m` para móvil).
En `recursos/` están el vídeo original, la petición enviada y el filtro de color, para poder
repetir o cambiar la exportación. Es una ilustración contemporánea, no un documento histórico.

Las cuatro escenas de ambiente (`public/escenas/`) se generaron con Gemini; los originales
están en `recursos/escenas/`. Llevan siempre el pie «Ilustración contemporánea».

## Publicar una versión estática

```bash
npm run exportar   # genera out/, listo para subir a cualquier alojamiento
```
