/** Vidéos TikTok regroupées dans la galerie (plus dans les fiches projets). */

export type GalleryTikTokVideo = {
  id: string;
  title: string;
  url: string;
  /** Pour filtrer avec les catégories de la galerie (id CATEGORIES) */
  categoryId: string;
};

export const GALLERY_TIKTOK_VIDEOS: GalleryTikTokVideo[] = [
  {
    id: "festival-horizons",
    title: "Festival Bababé Horizons — MJEB",
    url: "https://vt.tiktok.com/ZSHCEr5Y7/",
    categoryId: "concert",
  },
  {
    id: "bababe-art-concert",
    title: "Concert — Bababé Art",
    url: "https://vt.tiktok.com/ZSHCESKyT/",
    categoryId: "art",
  },
  {
    id: "green-temoignage-1",
    title: "Témoignage Bababé GREEN",
    url: "https://vt.tiktok.com/ZSHCEtecF/",
    categoryId: "green",
  },
  {
    id: "green-temoignage-2",
    title: "Témoignage Bababé GREEN 2",
    url: "https://vt.tiktok.com/ZSHCEboGY/",
    categoryId: "green",
  },
  {
    id: "formation-educative",
    title: "Formation éducative",
    url: "https://vt.tiktok.com/ZSHCECe9L/",
    categoryId: "conference",
  },
];
