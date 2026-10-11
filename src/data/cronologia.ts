import type { EstadoRegistro } from "./fuentes";

// Cronología de la exposición permanente. Cada hito remite a sus fuentes
// (src/data/fuentes.ts) y, cuando procede, a fichas de la biblioteca.

export type Hilo = "Formación" | "La casa" | "Sonido" | "Obra escrita";

export type Hito = {
  fecha: string; // tal como se muestra; puede ser aproximada
  orden: number; // año usado solo para ordenar
  hilo: Hilo;
  titulo: string;
  texto: string;
  lugar?: string;
  obras?: string[]; // slugs de src/data/publicaciones.ts
  fuentes: string[];
  estado: EstadoRegistro;
};

export const hilos: Hilo[] = ["Formación", "La casa", "Sonido", "Obra escrita"];

export const cronologia: Hito[] = [
  {
    fecha: "1959",
    orden: 1959,
    hilo: "Formación",
    titulo: "Nace en Guatemala",
    texto: "Así lo recoge la entrevista que le hizo Prensa Libre en 2007.",
    lugar: "Guatemala",
    fuentes: ["gil-2007"],
    estado: "pendiente de verificar",
  },
  {
    fecha: "1981",
    orden: 1981,
    hilo: "Formación",
    titulo: "Centro de Estudios Folklóricos",
    texto:
      "Entra como investigador al centro de la Universidad de San Carlos y queda a cargo del área de etnomusicología.",
    lugar: "Ciudad de Guatemala",
    fuentes: ["gil-2007", "cefol-1982"],
    estado: "revisado",
  },
  {
    fecha: "1982",
    orden: 1982,
    hilo: "Formación",
    titulo: "Ocho meses en Caracas",
    texto:
      "De abril a noviembre se especializa en etnomusicología en el INIDEF, con una beca de la Organización de los Estados Americanos. Ese año publica su introducción a la historia de los instrumentos musicales de la tradición popular.",
    lugar: "Caracas, Venezuela",
    obras: ["introduccion-historia-instrumentos-musicales"],
    fuentes: ["cefol-1982"],
    estado: "revisado",
  },
  {
    fecha: "Finales de los 80",
    orden: 1987,
    hilo: "La casa",
    titulo: "Honduras",
    texto:
      "Conoce a Sylvia Lucrecia Shaw Arrivillaga «quebrando la década de los ochentas, en Honduras. Tierra que nos marcó para siempre».",
    lugar: "Honduras",
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "Dos años después",
    orden: 1989,
    hilo: "La casa",
    titulo: "Casa Laruduna",
    texto:
      "Ya en Livingston nace Casa Laruduna, «como llamamos a nuestras iniciativas en crecimiento y a nuestro proyecto familiar».",
    lugar: "Livingston, Izabal",
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "1989",
    orden: 1989.5,
    hilo: "Sonido",
    titulo: "Primer Encuentro de Músicos",
    texto:
      "En Totonicapán empieza la serie de Encuentros de Músicos de la Tradición Popular: una forma de grabar en el lugar, cerca de quienes tocan.",
    lugar: "Totonicapán",
    obras: ["encuentro-musicos-totonicapan-1989"],
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "1991",
    orden: 1991,
    hilo: "Sonido",
    titulo: "Música garífuna de Livingston",
    texto:
      "Segundo álbum de la colección, grabado con el Grupo Despertar Garífuna «Marcos Sánchez Díaz».",
    lugar: "Livingston, Izabal",
    obras: ["musica-tradicional-garifuna-de-livingston"],
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "1992",
    orden: 1992,
    hilo: "Sonido",
    titulo: "Alta Verapaz",
    texto:
      "Encuentro de músicos q'eqchi'. El mismo año, con Sylvia Shaw, presenta en Chiapas unos apuntes para la comprensión del pueblo garífuna.",
    lugar: "Alta Verapaz",
    obras: ["encuentro-musicos-alta-verapaz-1992", "apuntes-para-la-comprension-del-pueblo-garifuna"],
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "1993",
    orden: 1993,
    hilo: "La casa",
    titulo: "Cantar desde el refugio",
    texto:
      "Con la población guatemalteca refugiada en Chiapas, la casa hace talleres y dos casetes dirigidos por Sylvia Shaw: De México me despido y Maya Hohn canta desde el refugio.",
    lugar: "Amatenango de la Frontera, Chiapas",
    obras: ["de-mexico-me-despido", "maya-hohn-canta-desde-el-refugio"],
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "1994",
    orden: 1994,
    hilo: "Sonido",
    titulo: "Petén",
    texto: "Cuarto y último álbum de los Encuentros de Músicos de la Tradición Popular.",
    lugar: "Petén",
    obras: ["encuentro-musicos-peten-1994"],
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "1995",
    orden: 1995,
    hilo: "Obra escrita",
    titulo: "Los popti'",
    texto: "Una aproximación a la música y la danza, escrita con Sylvia Shaw para La Tradición Popular.",
    lugar: "Jacaltenango, Huehuetenango",
    obras: ["los-popti-musica-y-danza"],
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "1997",
    orden: 1997,
    hilo: "Obra escrita",
    titulo: "El puerto de Livingston",
    texto:
      "Dos trabajos firmados con Sylvia Shaw: el estudio del puerto, su población y su urbanismo, y unas recomendaciones de lectura sobre los garífuna.",
    lugar: "Livingston, Izabal",
    obras: ["el-puerto-de-livingston-en-guatemala", "recomendaciones-de-lectura-sobre-los-garifuna"],
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "1998",
    orden: 1998,
    hilo: "Obra escrita",
    titulo: "De colonia a república",
    texto:
      "Publica su estudio sobre la conformación del caribe guatemalteco. La casa edita a la Marimba Club Amistad de Santa Eulalia.",
    lugar: "Santa Eulalia, Huehuetenango",
    obras: ["de-colonia-a-republica", "marimba-club-amistad-santa-eulalia"],
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "2007",
    orden: 2007,
    hilo: "Sonido",
    titulo: "350 horas de música",
    texto:
      "En una entrevista calcula así lo que ha grabado en el país durante unos 25 años. «Para mí, ese archivo es la memoria histórica del país».",
    fuentes: ["gil-2007"],
    estado: "pendiente de verificar",
  },
  {
    fecha: "2008",
    orden: 2008,
    hilo: "Obra escrita",
    titulo: "Senderos",
    texto: "Aparece el primer número de la revista de etnomusicología que edita.",
    fuentes: ["arrivillaga-2022", "csh-2019"],
    estado: "revisado",
  },
  {
    fecha: "2010",
    orden: 2010,
    hilo: "Obra escrita",
    titulo: "Diáspora, punta y marimba",
    texto:
      "Tres publicaciones en un año: la diáspora garífuna entre memorias y fronteras, la punta como ritmo de una nación y la historia de la Marimba Maderas de Mi Tierra.",
    obras: [
      "la-diaspora-garifuna-entre-memorias-y-fronteras",
      "la-punta-un-ritmo-para-festejar-la-nacion-garifuna",
      "la-marimba-maderas-de-mi-tierra",
    ],
    fuentes: ["udea-2010", "dialnet-punta", "ufm-maderas"],
    estado: "revisado",
  },
  {
    fecha: "2013",
    orden: 2013,
    hilo: "Obra escrita",
    titulo: "La nación garífuna",
    texto:
      "Un artículo sobre la construcción territorial a través de las fronteras y, con fotografías de Claudio Vásquez Bianchi, Fantasía garífuna.",
    obras: ["la-nacion-garifuna", "fantasia-garifuna"],
    fuentes: ["csh-2019", "digi-fantasia"],
    estado: "revisado",
  },
  {
    fecha: "2019",
    orden: 2019,
    hilo: "Obra escrita",
    titulo: "Patrimonio intangible",
    texto:
      "Sigue la nominación de la lengua, la música y la danza garífunas ante la Unesco y revisa qué hicieron los Estados después.",
    obras: ["hablamos-garifuna-comemos-ereba"],
    fuentes: ["csh-2019"],
    estado: "revisado",
  },
  {
    fecha: "2022",
    orden: 2022,
    hilo: "La casa",
    titulo: "Laruduna le dice adiós",
    texto:
      "Escribe la vida académica y profesional de Sylvia Lucrecia Shaw Arrivillaga, fallecida el 3 de mayo. Es la fuente principal de este museo.",
    obras: ["laruduna-la-casa-de-sylvia-lucrecia-shaw-arrivillaga"],
    fuentes: ["arrivillaga-2022"],
    estado: "revisado",
  },
  {
    fecha: "2025",
    orden: 2025,
    hilo: "Obra escrita",
    titulo: "Música y danza",
    texto:
      "Con Peitra Arana y Joshua Arana publica en la revista PH un artículo sobre la herencia de la nación garífuna.",
    obras: ["musica-y-danza-herencia-de-la-nacion-garifuna"],
    fuentes: ["iaph-2025"],
    estado: "revisado",
  },
];
