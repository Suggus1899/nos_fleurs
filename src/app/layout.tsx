import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Nos Fleurs — Flores de temporada en Maracay",
  description:
    "Ramos y arreglos florales hechos a mano, entregados el mismo día en Maracay, estado Aragua. Catálogo de temporada en USD.",
  openGraph: {
    siteName: "Nos Fleurs",
    type: "website",
    locale: "es_VE",
    images: [
      {
        url: "https://images.pexels.com/photos/11774827/pexels-photo-11774827.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 800,
        alt: "Nos Fleurs — Flores de temporada en Maracay",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
