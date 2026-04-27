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
  {
    id: 1,
    title: "Lancement de l'operation Bababe Clean",
    slug: "lancement-operation-bababe-clean",
    description:
      "Des jeunes volontaires ont mene une grande action de nettoyage dans plusieurs quartiers de Bababe.",
    content:
      "Le MJEB a organise une journee citoyenne consacree a l'assainissement des rues et espaces publics. Cette activite a rassemble des jeunes benevoles, des leaders communautaires et des habitants engages.\n\nL'objectif etait de sensibiliser sur l'hygiene urbaine et de renforcer l'esprit de responsabilite collective. D'autres editions seront organisees dans les prochaines semaines.",
    imageUrl: "/gallery/Bababe Clean/bababe clean  (1).jpg",
    publishedAt: "2026-03-08T10:00:00.000Z",
  },
  {
    id: 2,
    title: "Festival Bababe Horizon: edition reussie",
    slug: "festival-bababe-horizon-edition-reussie",
    description:
      "Une forte mobilisation autour de la culture, du sport et de la citoyennete a marque cette nouvelle edition.",
    content:
      "Le festival Bababe Horizon a reuni artistes, associations et jeunes de la commune autour de moments de partage et de celebration.\n\nLe programme a combine performances culturelles, competitions sportives et messages de sensibilisation. Le MJEB remercie tous les partenaires et benevoles qui ont contribue au succes de cette edition.",
    imageUrl: "/gallery/CONCERT/cons (2).jpg",
    publishedAt: "2026-02-21T14:30:00.000Z",
  },
  {
    id: 3,
    title: "Atelier de developpement artistique des jeunes",
    slug: "atelier-developpement-artistique-jeunes",
    description:
      "Des sessions de formation artistique ont permis aux jeunes talents locaux de renforcer leurs competences.",
    content:
      "Dans le cadre de son programme culturel, le MJEB a anime un atelier dedie a la creation artistique. Les participants ont travaille sur des activites pratiques en musique, expression sceniqe et arts visuels.\n\nCette initiative vise a accompagner les jeunes talents de Bababe et a creer des opportunites d'expression et d'epanouissement.",
    imageUrl: "/gallery/Bababe Art/art (3).jpg",
    publishedAt: "2026-01-15T09:15:00.000Z",
  },
];

export const STATIC_PARTNERS: StaticPartner[] = [
  {
    id: 1,
    name: "Commune de Bababe",
    category: "Partenaires Institutionnels",
    description:
      "Appui institutionnel aux initiatives citoyennes et communautaires du MJEB.",
    website: "https://example.com",
  },
  {
    id: 2,
    name: "Collectif Horizon Jeunesse",
    category: "ONG Internationales",
    description:
      "Accompagnement technique pour les actions de sensibilisation et d'education.",
    website: "https://example.com",
  },
  {
    id: 3,
    name: "Entreprise Sahel Solidaire",
    category: "Sponsors Locaux",
    description:
      "Soutien materiel et logistique des campagnes environnementales locales.",
    website: "https://example.com",
  },
];
