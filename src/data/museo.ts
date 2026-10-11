import type { EstadoRegistro } from "./fuentes";
import { publicaciones } from "./publicaciones";

export const SITIO = {
  nombre: "Museo Casa Laruduna",
  lema: "Un lugar donde la memoria permanece.",
  subtitulo: "Memoria, territorio, sonido y legado.",
  url: "https://www.laruduna.org",
};

export type Hecho = {
  texto: string;
  fuentes: string[];
  estado: EstadoRegistro;
};

export type Sala = {
  slug: string;
  nombre: string;
  resumen: string;
  situacion: string; // qué hay hoy en la sala, sin prometer de más
  intro: string;
  hechos: Hecho[];
  pendiente: string[];
};

const sonoras = publicaciones.filter((p) => p.categoria === "Producción sonora").length;

export const salas: Sala[] = [
  {
    slug: "la-casa",
    nombre: "La Casa",
    resumen: "Una memoria familiar: qué es Laruduna y de dónde viene su nombre.",
    situacion: "Historia documentada",
    intro:
      "Casa Laruduna nació en Livingston, en el Caribe guatemalteco, como el nombre de un proyecto familiar. Su protagonista es el antropólogo y etnomusicólogo Alfonso Arrivillaga Cortés; Sylvia Lucrecia Shaw Arrivillaga y su hijo forman parte de su origen y de su identidad. Este museo convierte esa memoria familiar en un archivo cultural abierto.",
    hechos: [
      {
        texto:
          "Alfonso Arrivillaga Cortés y Sylvia Lucrecia Shaw Arrivillaga se conocieron en Honduras a finales de la década de 1980. Dos años después, ya en Livingston, nació Casa Laruduna, «como llamamos a nuestras iniciativas en crecimiento y a nuestro proyecto familiar».",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto:
          "En 2007 Alfonso la describió así: «Laruduna no es ONG, ni una fundación, sino nuestras vidas». Un espacio con colecciones de fotografías y archivos de artículos, libros y documentos recogidos en el campo.",
        fuentes: ["gil-2007"],
        estado: "pendiente de verificar",
      },
      {
        texto:
          "Según esa misma entrevista, Laruduna es el nombre de un lugar de Livingston y significa «a la orilla del mar».",
        fuentes: ["gil-2007"],
        estado: "pendiente de verificar",
      },
      {
        texto:
          "La casa residió durante algunos años en una de las habitaciones de la Casa Grande de la Compañía Verapaz, en Livingston.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto:
          "Además de cintas magnetofónicas y casetes, el archivo reunió película en blanco y negro, ektachrome y rollos de súper 8, junto a colecciones de cerámica utilitaria y ritual, textiles y vidrio.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto:
          "Sylvia Lucrecia Shaw Arrivillaga (Guatemala, 14 de enero de 1957 - 3 de mayo de 2022), gestora cultural y traductora, dirigió las producciones musicales y buena parte de la gestión de Casa Laruduna.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto:
          "El nombre Laruduna reúne a Alfonso, a Sylvia y a su hijo, que continúa hoy la casa en forma de museo digital.",
        fuentes: ["familia-2026"],
        estado: "revisado",
      },
    ],
    pendiente: [
      "Confirmar con Alfonso el significado y la lengua de origen del nombre Laruduna.",
      "Fotografías familiares y documentos históricos, con autorización expresa de la familia.",
      "Nombres y funciones de las personas vinculadas hoy al proyecto.",
    ],
  },
  {
    slug: "alfonso-arrivillaga-cortes",
    nombre: "Alfonso Arrivillaga Cortés",
    resumen: "Exposición permanente. Entre territorios y sonidos.",
    situacion: "Cronología interactiva con 20 hitos",
    intro:
      "Antropólogo y etnomusicólogo guatemalteco, investigador titular de la Universidad de San Carlos de Guatemala, con más de cuatro décadas de trabajo sobre las músicas de Mesoamérica y la nación garífuna.",
    hechos: [
      {
        texto: "Nace en Guatemala en 1959.",
        fuentes: ["gil-2007"],
        estado: "pendiente de verificar",
      },
      {
        texto:
          "Desde 1981 investiga en el Centro de Estudios Folklóricos de la Universidad de San Carlos, donde queda a cargo del área de etnomusicología.",
        fuentes: ["gil-2007", "cefol-1982"],
        estado: "revisado",
      },
      {
        texto:
          "De abril a noviembre de 1982 se especializa en etnomusicología en el Instituto Interamericano de Etnomusicología y Folklore (INIDEF), en Caracas, con una beca de la Organización de los Estados Americanos.",
        fuentes: ["cefol-1982"],
        estado: "revisado",
      },
      {
        texto:
          "Entre 1989 y 1994, los Encuentros de Músicos de la Tradición Popular dejan cuatro álbumes grabados in situ: Totonicapán (1989), Livingston (1991), Alta Verapaz (1992) y Petén (1994).",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto:
          "En 2007 calcula en unas 350 horas la música que ha grabado en el país a lo largo de 25 años.",
        fuentes: ["gil-2007"],
        estado: "pendiente de verificar",
      },
      {
        texto:
          "En 2008 aparece el primer número de Senderos, revista de etnomusicología, de la que es editor.",
        fuentes: ["arrivillaga-2022", "csh-2019"],
        estado: "revisado",
      },
      {
        texto:
          "Cursa el doctorado y obtiene el Diploma de Estudios Avanzados en la Universidad Complutense de Madrid.",
        fuentes: ["iaph-2025"],
        estado: "pendiente de verificar",
      },
    ],
    pendiente: [
      "Fechas exactas de titulación y del periodo en Madrid.",
      "Retrato y fotografías de archivo autorizadas. El museo no generará retratos.",
      "Entrevistas y conferencias: localizar grabaciones y permisos.",
    ],
  },
  {
    slug: "biblioteca",
    nombre: "Biblioteca digital",
    resumen: "Libros, artículos, capítulos y publicaciones colectivas.",
    situacion: `${publicaciones.length} registros, cada uno con su fuente`,
    intro: "",
    hechos: [],
    pendiente: [],
  },
  {
    slug: "fonoteca",
    nombre: "Fonoteca",
    resumen: "El archivo sonoro: grabaciones de campo y producciones de la casa.",
    situacion: `Sala de escucha en preparación, ${sonoras} producciones`,
    intro:
      "Casa Laruduna produjo casetes y discos con músicos de distintas tradiciones de Guatemala, muchos grabados en el lugar. La sala de escucha se abrirá cuando existan los archivos digitalizados y los permisos de los intérpretes o sus comunidades.",
    hechos: [
      {
        texto:
          "De México me despido (1993) reunió a grupos de refugiados guatemaltecos en Chiapas que continuaron cultivando sus canciones con guitarras, guitarrillas, tunes y violines.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto:
          "Maya Hohn canta desde el refugio (1993) fue, según Alfonso, el material más escuchado de la casa.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
    ],
    pendiente: [
      "Digitalización de cintas y casetes originales.",
      "Permisos de difusión de cada grabación. Hasta tenerlos, los registros se mantienen restringidos.",
      "Transcripciones y fichas de participantes.",
    ],
  },
  {
    slug: "atlas",
    nombre: "Atlas",
    resumen: "Los lugares del trabajo documentado, del Caribe a los Cuchumatanes.",
    situacion: "Previsualización con 10 lugares",
    intro:
      "Estos lugares aparecen en las fuentes consultadas como escenarios de trabajo de Casa Laruduna. El mapa interactivo se construirá sobre esta lista, sin añadir puntos que no estén documentados.",
    hechos: [
      {
        texto: "Livingston, Izabal. Sede de Casa Laruduna y de los encuentros de 1991.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto:
          "Jacaltenango, Huehuetenango, y los campamentos de refugiados de Amatenango de la Frontera, Chiapas: Guadalupe Victoria, Los Llanos, Los Pocitos, Las Pacayas.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto: "Totonicapán (1989), Alta Verapaz (1992) y Petén (1994), sedes de los Encuentros de Músicos.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto:
          "Áreas protegidas de Izabal: Sierra Caral, Sierra Espíritu Santo, Sierra Santa Cruz, Bocas del Polochic, río Sarstún y Punta de Manabique. También la laguna Lachuá.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto: "Masca, Honduras. Encuentro de educación intercultural bilingüe.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto: "Santa Eulalia, Huehuetenango. Grabación de la Marimba Club Amistad (1998).",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
    ],
    pendiente: [
      "Coordenadas comprobadas de cada lugar.",
      "Vínculo de cada punto con publicaciones, fotografías y grabaciones.",
    ],
  },
  {
    slug: "archivo-visual",
    nombre: "Archivo visual",
    resumen: "Fotografía histórica, película y vídeo, con créditos y procedencia.",
    situacion: "A la espera de materiales autorizados",
    intro:
      "El archivo visual solo mostrará imágenes con procedencia y permiso conocidos. Las ilustraciones contemporáneas del museo se marcarán siempre como tales, separadas de la fotografía histórica.",
    hechos: [
      {
        texto:
          "Existe un registro fotográfico de las áreas protegidas estudiadas por la casa, descrito por Alfonso como un «estado fotográfico del medio».",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
      {
        texto:
          "La colección fotográfica de Víctor M. Vadillo, sobre el Petén del siglo XX, fue rescatada y estudiada por Sylvia Shaw.",
        fuentes: ["arrivillaga-2022"],
        estado: "revisado",
      },
    ],
    pendiente: [
      "Inventario de la Colección Casa Laruduna.",
      "Permisos de fotógrafos externos, entre ellos Daniel Hernández-Salazar y Carlos Sebastián.",
    ],
  },
  {
    slug: "exposiciones",
    nombre: "Exposiciones",
    resumen: "Relatos curados que combinan imagen, sonido, mapa y documento.",
    situacion: "Primera exposición en preparación",
    intro:
      "La primera exposición digital estará dedicada a Alfonso Arrivillaga Cortés. Se publicará cuando su cronología esté revisada por él o por la familia.",
    hechos: [],
    pendiente: ["Guion curatorial y selección de materiales de la primera exposición."],
  },
  {
    slug: "contacto",
    nombre: "Contacto",
    resumen: "Consultas académicas, colaboraciones y aportes de materiales.",
    situacion: "Formulario pendiente de activar",
    intro:
      "El museo recibirá consultas de investigación, propuestas de colaboración y aportes de documentos o grabaciones. El formulario se activará junto con el dominio; no se publica ninguna dirección personal sin consentimiento.",
    hechos: [],
    pendiente: ["Dirección de correo institucional y política de privacidad."],
  },
];

export const salaPorSlug = (slug: string) => salas.find((s) => s.slug === slug);
