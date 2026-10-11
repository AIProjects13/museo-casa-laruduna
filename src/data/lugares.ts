// Lugares que las fuentes citan como escenarios del trabajo documentado.
// Las coordenadas son las de la población o el área que nombra la fuente y
// sirven solo para situar el punto en la previsualización del atlas: están
// pendientes de comprobar una a una antes de publicar el atlas definitivo.

export type Lugar = {
  id: string;
  nombre: string;
  region: string;
  lon: number;
  lat: number;
  nota: string;
  fuentes: string[];
};

export const lugares: Lugar[] = [
  {
    id: "livingston",
    nombre: "Livingston",
    region: "Izabal, Guatemala",
    lon: -88.75,
    lat: 15.83,
    nota: "Aquí nació Casa Laruduna. En 1991 se grabó el álbum de música garífuna de los Encuentros de Músicos.",
    fuentes: ["arrivillaga-2022"],
  },
  {
    id: "totonicapan",
    nombre: "Totonicapán",
    region: "Guatemala",
    lon: -91.36,
    lat: 14.91,
    nota: "Primer Encuentro de Músicos de la Tradición Popular, 1989.",
    fuentes: ["arrivillaga-2022"],
  },
  {
    id: "alta-verapaz",
    nombre: "Alta Verapaz",
    region: "Guatemala",
    lon: -90.37,
    lat: 15.47,
    nota: "Encuentro de músicos q'eqchi', 1992. La fuente nombra el departamento, no la población.",
    fuentes: ["arrivillaga-2022"],
  },
  {
    id: "peten",
    nombre: "Petén",
    region: "Guatemala",
    lon: -89.89,
    lat: 16.93,
    nota: "Encuentro de músicos de tradición popular, 1994. La fuente nombra el departamento, no la población.",
    fuentes: ["arrivillaga-2022"],
  },
  {
    id: "jacaltenango",
    nombre: "Jacaltenango",
    region: "Huehuetenango, Guatemala",
    lon: -91.71,
    lat: 15.67,
    nota: "Trabajo sobre la música y la danza de los popti'.",
    fuentes: ["arrivillaga-2022"],
  },
  {
    id: "santa-eulalia",
    nombre: "Santa Eulalia",
    region: "Huehuetenango, Guatemala",
    lon: -91.46,
    lat: 15.73,
    nota: "Grabación de la Marimba Club Amistad, 1998.",
    fuentes: ["arrivillaga-2022"],
  },
  {
    id: "amatenango",
    nombre: "Amatenango de la Frontera",
    region: "Chiapas, México",
    lon: -92.11,
    lat: 15.43,
    nota: "Campamentos de población guatemalteca refugiada: talleres y los casetes de 1993.",
    fuentes: ["arrivillaga-2022"],
  },
  {
    id: "manabique",
    nombre: "Punta de Manabique",
    region: "Izabal, Guatemala",
    lon: -88.5,
    lat: 15.92,
    nota: "Una de las áreas protegidas de Izabal estudiadas por la casa en los años noventa.",
    fuentes: ["arrivillaga-2022"],
  },
  {
    id: "lachua",
    nombre: "Laguna Lachuá",
    region: "Alta Verapaz, Guatemala",
    lon: -90.67,
    lat: 15.92,
    nota: "Estudio técnico del área protegida.",
    fuentes: ["arrivillaga-2022"],
  },
  {
    id: "masca",
    nombre: "Masca",
    region: "Honduras",
    lon: -88.33,
    lat: 15.66,
    nota: "Encuentro de educación intercultural bilingüe organizado desde Livingston.",
    fuentes: ["arrivillaga-2022"],
  },
];
