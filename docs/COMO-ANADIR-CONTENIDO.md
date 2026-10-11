# Cómo añadir contenido al museo

Todo el contenido vive en dos sitios:

- **Los datos** (textos, fichas, fechas): archivos de `src/data/`.
- **Los archivos** (audio, PDF, fotografías): carpetas de `public/archivo/`.

Después de cualquier cambio, ejecuta `npm run exportar` y sube la carpeta `out/`, o deja
que el alojamiento lo haga solo si el proyecto está conectado a un repositorio.

## Regla antes de añadir nada

1. Cada dato necesita una fuente. Si es nueva, añádela primero en `src/data/fuentes.ts`.
2. Cada archivo necesita permiso de difusión. Sin permiso, no se sube.
3. Lo dudoso se marca `estado: "pendiente de verificar"`; lo comprobado, `"revisado"`.

## Añadir una publicación o un disco

En `src/data/publicaciones.ts`, copia una entrada existente y cambia sus campos. El campo
`slug` es su dirección permanente (`/biblioteca#slug`): no lo cambies después.

## Subir un audio

1. Guarda el archivo en `public/archivo/audio/`, por ejemplo `maya-hohn-1993.mp3`.
2. En la ficha de esa producción (`src/data/publicaciones.ts`) añade:
   `audio: "/archivo/audio/maya-hohn-1993.mp3",`

La Fonoteca mostrará el reproductor en lugar de «Sin audio todavía».

## Subir un documento PDF

1. Guarda el archivo en `public/archivo/documentos/`.
2. En su ficha añade: `pdf: "/archivo/documentos/nombre.pdf",`

La ficha de la biblioteca mostrará el botón «Leer el documento (PDF)».

## Subir una fotografía

1. Guarda la imagen en `public/archivo/fotografias/` (JPG o WebP, 2000 px de lado mayor).
2. Añade una entrada en `src/data/fotografias.ts` con título, descripción, fecha, lugar,
   crédito, procedencia, derechos y fuente.

La sala Archivo visual mostrará la galería en cuanto haya una entrada.

## Añadir un hito a la cronología

En `src/data/cronologia.ts`. El campo `obras` enlaza con los `slug` de la biblioteca.

## Añadir un lugar al atlas

En `src/data/lugares.ts`, con longitud y latitud comprobadas.

## Cambiar los textos de las salas

En `src/data/museo.ts`: introducción, hechos documentados y lista de pendientes de cada sala.

## Imágenes y vídeos de ambiente

Están en `public/escenas/` y `public/hero/`; los originales, en `recursos/`. Son
ilustraciones contemporáneas y llevan siempre su pie. Nunca se mezclan con `public/archivo/`.
