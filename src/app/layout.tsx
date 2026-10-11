import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Movimiento from "@/components/Movimiento";
import { SITIO } from "@/data/museo";
import "./globals.css";

const titulos = Newsreader({
  subsets: ["latin"],
  variable: "--font-titulos",
  style: ["normal", "italic"],
  display: "swap",
});

const texto = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-texto",
  display: "swap",
});

const descripcion =
  "Casa de memoria y archivo cultural abierto: la obra del antropólogo y etnomusicólogo guatemalteco Alfonso Arrivillaga Cortés y el legado de Casa Laruduna.";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: { default: SITIO.nombre, template: `%s | ${SITIO.nombre}` },
  description: descripcion,
  alternates: { canonical: "/" },
  robots: process.env.SITIO_PUBLICO === "1" ? undefined : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "es_GT",
    siteName: SITIO.nombre,
    title: SITIO.nombre,
    description: descripcion,
  },
};

export const viewport: Viewport = { themeColor: "#141A18" };

const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "Museum",
  name: SITIO.nombre,
  url: SITIO.url,
  description: descripcion,
  inLanguage: "es",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${titulos.variable} ${texto.variable}`}>
      <body>
        <a
          href="#museo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-marfil focus:px-4 focus:py-2 focus:text-carbon"
        >
          Ir al contenido
        </a>
        <Header />
        <Movimiento />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados) }}
        />
      </body>
    </html>
  );
}
