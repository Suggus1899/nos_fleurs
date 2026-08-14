export const OCCASIONS = ["Cumpleaños", "Aniversario", "Condolencias"] as const;
export type Occasion = (typeof OCCASIONS)[number];

export type Product = {
  slug: string;
  name: string;
  latin: string;
  price: string;
  description: string;
  occasion: Occasion;
};

export const PRODUCTS: Product[] = [
  {
    slug: "ramo-amanecer",
    name: "Ramo Amanecer",
    latin: "Ranunculus asiaticus",
    price: "$8.500",
    description:
      "Ranúnculos en degradé de coral a marfil, cortados al amanecer y envueltos en papel kraft. Un ramo pequeño para empezar el día.",
    occasion: "Cumpleaños",
  },
  {
    slug: "arreglo-plaza",
    name: "Arreglo Plaza",
    latin: "Dahlia pinnata",
    price: "$12.900",
    description:
      "Dalias de pétalo denso combinadas con follaje de estación, armadas en base de cerámica. Pensado para mesas y living.",
    occasion: "Aniversario",
  },
  {
    slug: "ramo-bruma",
    name: "Ramo Bruma",
    latin: "Paeonia lactiflora",
    price: "$15.200",
    description:
      "Peonías en tonos empolvados, el ramo más pedido de la temporada. Disponibilidad limitada por origen del cultivo.",
    occasion: "Cumpleaños",
  },
  {
    slug: "ramo-jardin",
    name: "Ramo Jardín",
    latin: "Rosa hybrid",
    price: "$10.400",
    description:
      "Rosas de jardín de tallo largo, sueltas y sin armado rígido, como recién cortadas. Ideal para regalo.",
    occasion: "Aniversario",
  },
  {
    slug: "arreglo-ceremonia",
    name: "Arreglo Ceremonia",
    latin: "Hydrangea macrophylla",
    price: "$18.700",
    description:
      "Hortensias en volumen sobre base amplia, pensadas para eventos y ceremonias. Se coordina fecha de entrega.",
    occasion: "Condolencias",
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}
