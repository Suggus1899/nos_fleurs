import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const products = getProducts();

  const staticPages = [
    { path: "/", priority: 1.0 },
    { path: "/catalogo", priority: 0.9 },
    { path: "/nosotros", priority: 0.7 },
    { path: "/contacto", priority: 0.8 },
    { path: "/cuidados", priority: 0.5 },
    { path: "/preguntas-frecuentes", priority: 0.5 },
    { path: "/envios-y-cambios", priority: 0.5 },
  ];

  return [
    ...staticPages.map(({ path, priority }) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...products.map((product) => ({
      url: `${base}/producto/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
