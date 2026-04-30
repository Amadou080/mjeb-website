export type StaticArticle = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
};

export type StaticPartner = {
  id: number;
  name: string;
  description?: string;
  category?: string;
  website?: string;
  logoUrl?: string;
};

export const STATIC_ARTICLES: StaticArticle[] = [
  // Laisse vide pour l'instant: aucune actualite publiee.
];

export const STATIC_PARTNERS: StaticPartner[] = [
  // Laisse vide pour l'instant: aucun partenaire officiel.
];
