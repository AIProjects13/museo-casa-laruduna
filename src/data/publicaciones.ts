import type { EstadoRegistro } from "./fuentes";

export type Categoria =
  | "Libros"
  | "Artículos científicos"
  | "Capítulos de libros"
  | "Publicaciones colectivas"
  | "Ensayos"
  | "Producción sonora";

export type Publicacion = {
  slug: string; // URL permanente: /biblioteca#slug
  titulo: string;
  autoria: string[];
  colaboradores?: string;
  anio: number;
  categoria: Categoria;
  publicadoEn: string;
  paginas?: string;
  doi?: string;
  isbn?: string;
  enlace?: string;
  licencia?: string;
  // Archivos propios, solo con permiso de difusión. Rutas dentro de /public:
  audio?: string; // p. ej. "/archivo/audio/maya-hohn-1993.mp3"
  pdf?: string; // p. ej. "/archivo/documentos/fantasia-garifuna.pdf"
  portada?: string; // cubierta real, p. ej. "/archivo/portadas/nombre.jpg"
  disponibilidad?: string; // sustituye al texto automático de la ficha
  estado: EstadoRegistro;
  fuentes: string[]; // ids de src/data/fuentes.ts
  nota?: string;
};

const AAC = "Alfonso Arrivillaga Cortés";
const SS = "Sylvia Shaw";

export const publicaciones: Publicacion[] = [
  {
    slug: "musica-y-danza-herencia-de-la-nacion-garifuna",
    titulo: "Música y danza: herencia de la nación garífuna",
    autoria: ["Peitra Arana", "Joshua Arana", AAC],
    anio: 2025,
    categoria: "Artículos científicos",
    publicadoEn: "revista PH, 116. Instituto Andaluz del Patrimonio Histórico",
    doi: "10.33349/2025.116.5962",
    licencia: "CC BY-NC-ND 3.0",
    estado: "revisado",
    fuentes: ["iaph-2025"],
  },
  {
    slug: "laruduna-la-casa-de-sylvia-lucrecia-shaw-arrivillaga",
    titulo:
      "Laruduna, la casa de Sylvia Lucrecia Shaw Arrivillaga, le dice adiós: Guatemala, 14 de enero de 1957-3 de mayo de 2022",
    autoria: [AAC],
    anio: 2022,
    categoria: "Ensayos",
    publicadoEn: "Ciencias Sociales y Humanidades, 9(2). Universidad de San Carlos de Guatemala",
    paginas: "121-130",
    doi: "10.36829/63CHS.v9i2.1561",
    licencia: "CC BY-NC-SA 4.0",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "hablamos-garifuna-comemos-ereba",
    titulo:
      "Hablamos garífuna, comemos ereba, bailamos yancunu y reímos con uraga. La cultura garífuna: patrimonio intangible de la humanidad",
    autoria: [AAC],
    anio: 2019,
    categoria: "Artículos científicos",
    publicadoEn: "Ciencias Sociales y Humanidades, 6(1). Universidad de San Carlos de Guatemala",
    paginas: "55-70",
    doi: "10.36829/63CHS.v6i1.771",
    licencia: "CC BY-NC-SA 4.0",
    estado: "revisado",
    fuentes: ["csh-2019"],
  },
  {
    slug: "la-coleccion-fotografica-victor-m-vadillo",
    titulo: "La colección fotográfica Víctor M. Vadillo. Una mirada al Petén del siglo XX",
    autoria: [SS, AAC],
    anio: 2018,
    categoria: "Artículos científicos",
    publicadoEn: "Ciencias Sociales y Humanidades, 5(1). Universidad de San Carlos de Guatemala",
    paginas: "131-149",
    doi: "10.36829/63CHS.v5i1.635",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "fantasia-garifuna",
    titulo: "Fantasía garífuna: estudio de sus expresiones culturales, musicales y gastronómicas",
    autoria: [AAC],
    colaboradores: "Fotografías de Claudio Vásquez Bianchi",
    anio: 2013,
    categoria: "Libros",
    publicadoEn: "Universidad de San Carlos de Guatemala, Dirección General de Investigación, Unidad de Publicaciones y Divulgación",
    paginas: "14 p.",
    enlace: "https://digi.usac.edu.gt/edigi/fantasia-garifuna.html",
    estado: "revisado",
    fuentes: ["digi-fantasia"],
    nota: "La ficha institucional no indica ISBN ni licencia.",
  },
  {
    slug: "la-nacion-garifuna",
    titulo: "La Nación garífuna. Una construcción territorial a través de las fronteras",
    autoria: [AAC],
    anio: 2013,
    categoria: "Artículos científicos",
    publicadoEn: "Ístmica, 16",
    paginas: "43-58",
    estado: "pendiente de verificar",
    fuentes: ["csh-2019"],
    nota: "Datos tomados de la autocita del autor en 2019. Falta cotejar con la ficha de la revista.",
  },
  {
    slug: "la-diaspora-garifuna-entre-memorias-y-fronteras",
    titulo: "La diáspora garífuna entre memorias y fronteras",
    autoria: [AAC],
    anio: 2010,
    categoria: "Artículos científicos",
    publicadoEn: "Boletín de Antropología, 24(41). Universidad de Antioquia",
    paginas: "84-95",
    doi: "10.17533/udea.boan.7945",
    licencia: "CC BY 4.0",
    estado: "revisado",
    fuentes: ["udea-2010", "csh-2019"],
    nota: "El número corresponde a 2010; la revista lo publicó en línea en marzo de 2011.",
  },
  {
    slug: "la-punta-un-ritmo-para-festejar-la-nacion-garifuna",
    titulo: "La Punta: un ritmo para festejar la nación garífuna",
    autoria: [AAC],
    colaboradores: "En A. Recasens y C. Spencer (coords.)",
    anio: 2010,
    categoria: "Capítulos de libros",
    publicadoEn:
      "A tres bandas. Mestizaje, sincretismo e hibridación en el espacio sonoro iberoamericano. Akal",
    isbn: "978-84-460-3225-0",
    estado: "pendiente de verificar",
    fuentes: ["dialnet-punta", "csh-2019"],
    nota: "Las fuentes discrepan en las páginas: 139-150 según Dialnet, 141-151 según la autocita de 2019.",
  },
  {
    slug: "la-marimba-maderas-de-mi-tierra",
    titulo: "La Marimba Maderas de Mi Tierra, embajadora musical de Guatemala",
    autoria: [AAC],
    colaboradores: "Segunda edición, ampliada y actualizada. Edición al cuidado de Paola Ketmaier",
    anio: 2010,
    categoria: "Libros",
    publicadoEn:
      "Secretaría de Asuntos Administrativos y de Seguridad de la Presidencia de la República (SAAS), Guatemala",
    isbn: "978-9929-8104-0-2",
    disponibilidad: "Copia digital en el archivo de la casa. Se publicará cuando lo autoricen los titulares de los derechos.",
    estado: "revisado",
    fuentes: ["doc-maderas-2010", "ufm-maderas"],
    nota: "Amplía dos trabajos anteriores del autor sobre la misma agrupación, de 2003 y 2004.",
  },
  {
    slug: "el-puerto-de-livingston-en-guatemala",
    titulo: "El Puerto de Livingston en Guatemala: población, urbanismo y desarrollo regional",
    autoria: [SS, AAC],
    anio: 1997,
    categoria: "Artículos científicos",
    publicadoEn: "Anuario de Ciencias Sociales, 2. Universidad de Aguascalientes",
    paginas: "19-41",
    estado: "pendiente de verificar",
    fuentes: ["arrivillaga-2022"],
    nota: "Citado así por el propio autor; falta localizar el anuario.",
  },
  {
    slug: "recomendaciones-de-lectura-sobre-los-garifuna",
    titulo: "Recomendaciones de lectura sobre los garífuna",
    autoria: [SS, AAC],
    anio: 1997,
    categoria: "Artículos científicos",
    publicadoEn: "Revista Estudios, 33. Universidad de San Carlos de Guatemala",
    paginas: "74-83",
    enlace:
      "https://iihaa.usac.edu.gt/archivohemerografico/wp-content/uploads/2017/11/32_estudios_ago_1997_arrivillaga.pdf",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "los-popti-musica-y-danza",
    titulo: "Los popti'. Una aproximación a la música y la danza",
    autoria: [SS, AAC],
    anio: 1995,
    categoria: "Artículos científicos",
    publicadoEn: "La Tradición Popular, 102. Centro de Estudios Folklóricos, USAC",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "apuntes-para-la-comprension-del-pueblo-garifuna",
    titulo: "Apuntes para la comprensión del pueblo garífuna",
    autoria: [SS, AAC],
    anio: 1992,
    categoria: "Publicaciones colectivas",
    publicadoEn:
      "Segundo Encuentro de Intelectuales Chiapas-Centroamérica. Instituto Chiapaneco de Cultura",
    paginas: "150-162",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "aj-instrumentos-musicales-mayas",
    titulo: "Aj' Instrumentos musicales mayas",
    autoria: [AAC],
    anio: 2006,
    categoria: "Libros",
    publicadoEn: "Universidad Intercultural de Chiapas, San Cristóbal de las Casas",
    isbn: "968-7846-81-X",
    portada: "/archivo/portadas/aj-instrumentos-musicales-mayas.jpg",
    disponibilidad: "Copia digital en el archivo de la casa. Se publicará cuando lo autoricen los titulares de los derechos.",
    estado: "revisado",
    fuentes: ["doc-aj-2006"],
  },
  {
    slug: "maderas-de-mi-tierra-70-anos",
    titulo: "Maderas de Mi Tierra, 70 años de vida exitosa",
    autoria: [AAC],
    anio: 2004,
    categoria: "Libros",
    publicadoEn: "Guatemala. Entidad editora por confirmar",
    estado: "pendiente de verificar",
    fuentes: ["doc-maderas-2010"],
    nota: "El autor la cita en el prólogo de 2010 como versión para el septuagésimo aniversario de la agrupación. Falta ver el ejemplar.",
  },
  {
    slug: "maderas-de-mi-tierra-la-marimba-de-una-epoca",
    titulo: "Maderas de Mi Tierra: la marimba de una época",
    autoria: [AAC],
    anio: 2003,
    categoria: "Artículos científicos",
    publicadoEn: "Boletín de La Tradición Popular. Centro de Estudios Folklóricos, USAC",
    estado: "pendiente de verificar",
    fuentes: ["doc-maderas-2010"],
    nota: "Citado por el autor en el prólogo de 2010. Falta el número del boletín.",
  },
  {
    slug: "el-jul-juaj-tijaax",
    titulo: "El Ju'l Juaj Tijaax. Abonando la resiembra, un reencuentro con la memoria colectiva",
    autoria: ["Diego Reanda Chiquival Primero", AAC],
    anio: 2000,
    categoria: "Artículos científicos",
    publicadoEn: "La Tradición Popular, 128. Boletín del Centro de Estudios Folklóricos, USAC",
    portada: "/archivo/portadas/la-tradicion-popular-128.jpg",
    disponibilidad: "Copia digital en el archivo de la casa. Se publicará cuando lo autoricen los titulares de los derechos.",
    estado: "revisado",
    fuentes: ["doc-tp128"],
  },
  {
    slug: "de-colonia-a-republica",
    titulo:
      "De colonia a república: lo social y el Estado en la conformación del caribe guatemalteco",
    autoria: [AAC],
    anio: 1998,
    categoria: "Capítulos de libros",
    publicadoEn:
      "Anuario del Centro de Estudios Superiores de México y Centroamérica, 1997. Universidad de Ciencias y Artes de Chiapas",
    paginas: "254-294",
    enlace: "https://repositorio.cesmeca.mx/handle/11595/773",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "introduccion-historia-instrumentos-musicales",
    titulo:
      "Introducción a la historia de los instrumentos musicales de la tradición popular guatemalteca",
    autoria: [AAC],
    colaboradores: "Fotografías de J. Manuel Guerra Caravantes",
    anio: 1982,
    categoria: "Artículos científicos",
    publicadoEn: "La Tradición Popular, 36. Boletín del Centro de Estudios Folklóricos, USAC",
    portada: "/archivo/portadas/la-tradicion-popular-36.jpg",
    disponibilidad: "Copia digital en el archivo de la casa. Se publicará cuando lo autoricen los titulares de los derechos.",
    estado: "revisado",
    fuentes: ["doc-tp36", "cefol-1982"],
  },
  {
    slug: "encuentro-musicos-peten-1994",
    titulo: "Encuentro de músicos de tradición popular de Petén",
    autoria: ["Músicos de la Tradición Popular de Guatemala"],
    colaboradores: "Colección Músicos de la Tradición Popular de Guatemala, 4",
    anio: 1994,
    categoria: "Producción sonora",
    publicadoEn: "Instituto Guatemalteco de Turismo, Casa Laruduna, Discos Vypro",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "maya-hohn-canta-desde-el-refugio",
    titulo: "Maya Hohn canta desde el refugio",
    autoria: ["Maya Hohn"],
    colaboradores: "Casete grabado por Sylvia Shaw",
    anio: 1993,
    categoria: "Producción sonora",
    publicadoEn: "Casa Laruduna",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "de-mexico-me-despido",
    titulo: "De México me despido",
    autoria: ["Varios intérpretes"],
    colaboradores: "Casete grabado por Sylvia Shaw",
    anio: 1993,
    categoria: "Producción sonora",
    publicadoEn: "Casa Laruduna",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "encuentro-musicos-alta-verapaz-1992",
    titulo: "I Encuentro de músicos de la tradición popular q'eqchi' de Alta Verapaz",
    autoria: ["Músicos de la Tradición Popular de Guatemala"],
    colaboradores: "Colección Músicos de la Tradición Popular de Guatemala, 3",
    anio: 1992,
    categoria: "Producción sonora",
    publicadoEn: "Instituto Guatemalteco de Turismo, Casa Laruduna, Discos de Centroamérica",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "musica-tradicional-garifuna-de-livingston",
    titulo: "Música tradicional garífuna de Livingston",
    autoria: ["Músicos de la Tradición Popular de Guatemala"],
    colaboradores: "Colección Músicos de la Tradición Popular de Guatemala, 2",
    anio: 1991,
    categoria: "Producción sonora",
    publicadoEn:
      "Instituto Guatemalteco de Turismo, Grupo Despertar Garífuna «Marcos Sánchez Díaz», Casa Laruduna, Discos de Centroamérica",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "encuentro-musicos-totonicapan-1989",
    titulo: "I Encuentro de músicos de la tradición popular de Totonicapán",
    autoria: ["Músicos de la Tradición Popular de Guatemala"],
    colaboradores: "Colección Músicos de la Tradición Popular de Guatemala, 1",
    anio: 1989,
    categoria: "Producción sonora",
    publicadoEn:
      "Instituto Guatemalteco de Turismo, Municipalidad de Totonicapán, Casa de la Cultura Totonicapense, Casa Laruduna",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "tributo-a-la-esperanza",
    titulo:
      "Tributo a la Esperanza. Canciones de amor y esperanza en el contexto del conflicto armado interno",
    autoria: ["Maya Hohn", "S. Montejo", "J. Chamalé"],
    colaboradores: "CD y casete grabados por Sylvia Shaw",
    anio: 1996,
    categoria: "Producción sonora",
    publicadoEn: "Casa Laruduna, Cruz Roja Internacional",
    estado: "pendiente de verificar",
    fuentes: ["arrivillaga-2022"],
    nota: "La misma fuente da dos años, 1996 y 1999. Falta ver el soporte original.",
  },
  {
    slug: "marimba-club-amistad-santa-eulalia",
    titulo:
      "Música tradicional de marimba del grupo q'anjob'al de Santa Eulalia, Huehuetenango",
    autoria: ["Marimba Club Amistad"],
    colaboradores: "Casete",
    anio: 1998,
    categoria: "Producción sonora",
    publicadoEn: "Yax Te' Foundation, Casa Laruduna",
    estado: "revisado",
    fuentes: ["arrivillaga-2022"],
  },
  {
    slug: "ibimeni-garifuna-traditional-music-from-guatemala",
    titulo: "Ibimeni: Garifuna Traditional Music from Guatemala",
    autoria: ["Ibimeni"],
    colaboradores:
      "Grabaciones originales de 1990 y textos de Alfonso Arrivillaga Cortés. Producción y selección de Juan Carlos Barrios; traducción de María del Pilar Alpírez; fotografías de Claudio Vásquez Bianchi",
    anio: 2008,
    categoria: "Producción sonora",
    publicadoEn: "Sub Rosa, SR289",
    disponibilidad: "Copia digital en el archivo de la casa. Se publicará cuando lo autoricen los titulares de los derechos.",
    estado: "pendiente de verificar",
    fuentes: ["doc-ibimeni", "subrosa-273"],
    nota: "El libreto confirma las grabaciones de 1990 y el número SR289; algunas distribuidoras citan SR 273. Falta el año de edición (2008 o 2009).",
  },
];

export const categorias = Array.from(new Set(publicaciones.map((p) => p.categoria)));

export function citaAPA(p: Publicacion) {
  const autores = p.autoria.join(", ");
  const paginas = p.paginas ? `, ${p.paginas}` : "";
  const doi = p.doi ? ` https://doi.org/${p.doi}` : "";
  return `${autores} (${p.anio}). ${p.titulo}. ${p.publicadoEn}${paginas}.${doi}`;
}

const TIPO_BIBTEX: Record<Categoria, string> = {
  Libros: "book",
  "Artículos científicos": "article",
  "Capítulos de libros": "incollection",
  "Publicaciones colectivas": "incollection",
  Ensayos: "article",
  "Producción sonora": "misc",
};

export function citaBibTeX(p: Publicacion) {
  const campos: [string, string | undefined][] = [
    ["author", p.autoria.join(" and ")],
    ["title", p.titulo],
    ["year", String(p.anio)],
    [p.categoria === "Libros" ? "publisher" : "howpublished", p.publicadoEn],
    ["pages", p.paginas],
    ["doi", p.doi],
    ["isbn", p.isbn],
    ["url", p.doi ? `https://doi.org/${p.doi}` : p.enlace],
    ["note", p.estado === "revisado" ? undefined : "Datos pendientes de verificar"],
  ];
  const cuerpo = campos
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");
  return `@${TIPO_BIBTEX[p.categoria]}{${p.slug.slice(0, 40)}-${p.anio},\n${cuerpo}\n}`;
}
