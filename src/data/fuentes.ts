// Registro de fuentes documentales. Todo dato publicado en el museo debe
// remitir a una de estas fuentes mediante su id.

export type EstadoRegistro =
  | "borrador"
  | "pendiente de verificar"
  | "revisado"
  | "publicado"
  | "restringido";

export type Fuente = {
  id: string;
  cita: string;
  url?: string;
  tipo: "primaria" | "secundaria" | "catálogo";
  licencia?: string;
  consultada: string; // fecha ISO de la última consulta
  nota?: string;
};

export const fuentes: Fuente[] = [
  {
    id: "arrivillaga-2022",
    cita: "Arrivillaga-Cortés, A. (2022). Laruduna, la casa de Sylvia Lucrecia Shaw Arrivillaga, le dice adiós: Guatemala, 14 de enero de 1957-3 de mayo de 2022. Ciencias Sociales y Humanidades, 9(2), 121-130.",
    url: "https://doi.org/10.36829/63CHS.v9i2.1561",
    tipo: "primaria",
    licencia: "CC BY-NC-SA 4.0",
    consultada: "2026-10-11",
    nota: "Texto completo leído. Fuente principal sobre el origen de Casa Laruduna.",
  },
  {
    id: "gil-2007",
    cita: "Gil, G. (2007, 22 de abril). Pasión por los xul. Prensa Libre, Revista D, pp. 8-10.",
    url: "https://manuelgiron.ch/alfonso.html",
    tipo: "secundaria",
    consultada: "2026-10-11",
    nota: "Entrevista consultada a través de una reproducción en la web de Manuel Girón, no en el original impreso. Fotografía de Carlos Sebastián.",
  },
  {
    id: "cefol-1982",
    cita: "Centro de Estudios Folklóricos, Universidad de San Carlos de Guatemala. Noticias bibliográficas del Centro, primer semestre de 1982.",
    url: "https://ceceg.usac.edu.gt/wp-content/uploads/2025/09/14.-Bibliographic-News-from-the-Center.pdf",
    tipo: "primaria",
    consultada: "2026-10-11",
    nota: "Consultado en la versión en inglés publicada por el CECEG.",
  },
  {
    id: "csh-2019",
    cita: "Arrivillaga, A. (2019). Hablamos garífuna, comemos ereba, bailamos yancunu y reímos con uraga. La cultura garífuna: patrimonio intangible de la humanidad. Ciencias Sociales y Humanidades, 6(1), 55-70.",
    url: "https://doi.org/10.36829/63CHS.v6i1.771",
    tipo: "primaria",
    licencia: "CC BY-NC-SA 4.0",
    consultada: "2026-10-11",
  },
  {
    id: "udea-2010",
    cita: "Ficha del artículo en Boletín de Antropología, Universidad de Antioquia.",
    url: "https://revistas.udea.edu.co/index.php/boletin/article/view/7945",
    tipo: "catálogo",
    consultada: "2026-10-11",
  },
  {
    id: "dialnet-punta",
    cita: "Ficha del capítulo en Dialnet.",
    url: "https://dialnet.unirioja.es/servlet/articulo?codigo=3317356",
    tipo: "catálogo",
    consultada: "2026-10-11",
  },
  {
    id: "digi-fantasia",
    cita: "Ficha de la publicación en la Dirección General de Investigación, USAC.",
    url: "https://digi.usac.edu.gt/edigi/fantasia-garifuna.html",
    tipo: "catálogo",
    consultada: "2026-10-11",
  },
  {
    id: "ufm-maderas",
    cita: "Registro en el catálogo de la Biblioteca Ludwig von Mises, Universidad Francisco Marroquín.",
    url: "https://biblioteca.ufm.edu/opac/record/1080329",
    tipo: "catálogo",
    consultada: "2026-10-11",
    nota: "Visto solo en resultados de búsqueda; falta abrir el registro completo.",
  },
  {
    id: "iaph-2025",
    cita: "Ficha del artículo en revista PH, Instituto Andaluz del Patrimonio Histórico.",
    url: "https://doi.org/10.33349/2025.116.5962",
    tipo: "catálogo",
    consultada: "2026-10-11",
  },
  {
    id: "subrosa-273",
    cita: "Fichas de distribuidoras (Forced Exposure, Soundohm) del disco SR 273, Sub Rosa.",
    url: "https://www.forcedexposure.com/Catalog/SR.273CD.html",
    tipo: "secundaria",
    consultada: "2026-10-11",
    nota: "Las distribuidoras dan fechas de edición distintas (2008 y 2009). Falta el libreto.",
  },
];

fuentes.push({
  id: "familia-2026",
  cita: "Familia de Alfonso Arrivillaga Cortés. Indicaciones para la creación del Museo Casa Laruduna, 2026.",
  tipo: "primaria",
  consultada: "2026-10-11",
  nota: "Testimonio directo de la familia, promotora del museo.",
});

export const fuentePorId = (id: string) => fuentes.find((f) => f.id === id);
