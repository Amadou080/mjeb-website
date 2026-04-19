import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { GALLERY_TIKTOK_VIDEOS } from "@/lib/galleryVideos";
import { ExternalLink, Play, X } from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "Tous", folder: "" },
  { id: "art", name: "Bababe Art", folder: "Bababe Art" },
  { id: "concert", name: "Concert", folder: "CONCERT" },
  { id: "clean", name: "Bababé Clean", folder: "Bababé Clean" },
  { id: "green", name: "Bababe GREEN", folder: "Bababe GREEN" },
  { id: "conference", name: "Conférence", folder: "CONFERENCE" },
  { id: "sensibilisation", name: "Sensibilisation", folder: "sensibilisation" },
  { id: "assembly", name: "Assemblée Générale", folder: "ASSAMBLE GENERAL" }
];

// Fonction pour générer les URLs des images
const generateImageUrls = () => {
  const images: { id: string; category: string; folder: string; url: string; title: string }[] = [];

  // Bababe Art - 65 images (art (1).jpg to art (65).jpg)
  for (let i = 1; i <= 65; i++) {
    images.push({
      id: `art-${i}`,
      category: "art",
      folder: "Bababe Art",
      url: `/gallery/Bababe Art/art (${i}).jpg`,
      title: `Bababe Art - Image ${i}`
    });
  }

  // Concert - 112 images (cons (1).jpg to cons (112).jpg)
  for (let i = 1; i <= 112; i++) {
    images.push({
      id: `concert-${i}`,
      category: "concert",
      folder: "CONCERT",
      url: `/gallery/CONCERT/cons (${i}).jpg`,
      title: `Concert - Image ${i}`
    });
  }

  // Bababé Clean - 53 images (bababe clean  (1).jpg to bababe clean  (53).jpg)
  for (let i = 1; i <= 53; i++) {
    images.push({
      id: `clean-${i}`,
      category: "clean",
      folder: "Bababé Clean",
      url: encodeURI(`/gallery/Bababe Clean/bababe clean  (${i}).jpg`),
      title: `Bababé Clean - Image ${i}`
    });
  }

  // Conference - 28 images (divers noms)
  const conferenceImages = ['15.jpg', '16.jpg', '19.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '3.jpg', '30.jpg', '31.jpg', '33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg', '4.jpg', '45.jpg', '46.jpg', '48.jpg', '8.jpg', 'Copie de 15.jpg', 'Copie de 16.jpg', 'Copie de 19.jpg', 'Copie de 21.jpg', 'Copie de 23.jpg', 'Copie de 24.jpg', 'Copie de 4.jpg'];
  conferenceImages.forEach((img, index) => {
    images.push({
      id: `conference-${index + 1}`,
      category: "conference",
      folder: "CONFERENCE",
      url: `/gallery/CONFERENCE/${img}`,
      title: `Conférence - Image ${index + 1}`
    });
  });

  // Sensibilisation - 8 images (1.jpg to 8.jpg)
  for (let i = 1; i <= 8; i++) {
    images.push({
      id: `sensibilisation-${i}`,
      category: "sensibilisation",
      folder: "sensibilisation",
      url: `/gallery/sensibilisation/${i}.jpg`,
      title: `Sensibilisation - Image ${i}`
    });
  }

  // Assembly - vérifier les images disponibles
  images.push({
    id: `assembly-1`,
    category: "assembly",
    folder: "ASSAMBLE GENERAL",
    url: `/gallery/ASSAMBLE GENERAL/AG PRESIDENT.jpg`,
    title: `Assemblée Générale - AG PRESIDENT`
  });

  // Bababe GREEN - 19 images (bababe green (1).jpg to bababe green (19).jpg)
  for (let i = 1; i <= 19; i++) {
    images.push({
      id: `green-${i}`,
      category: "green",
      folder: "Bababe GREEN",
      url: `/gallery/Bababe GREEN/bababe green  (${i}).jpg`,
      title: `Bababe GREEN - Image ${i}`
    });
  }

  return images;
};

import { trpc } from "@/lib/trpc";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(16);

  const { data: dbImages = [] } = trpc.gallery.list.useQuery();

  const catNameToId: Record<string, string> = {
    "Bababe Art": "art",
    "Concert": "concert",
    "Bababé Clean": "clean",
    "Bababe GREEN": "green",
    "Conférence": "conference",
    "Assemblée Générale": "assembly",
    "Sensibilisation": "sensibilisation",
  };

  const allImages = useMemo(() => {
    const staticImages = generateImageUrls();
    const dynamicImages = dbImages.map(item => ({
      id: `db-${item.id}`,
      category: catNameToId[item.category] || item.category,
      folder: item.category,
      url: item.mediaUrl,
      title: item.title || "Photo"
    }));
    return [...staticImages, ...dynamicImages];
  }, [dbImages]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") {
      return allImages;
    }
    return allImages.filter(img => img.category === selectedCategory);
  }, [selectedCategory, allImages]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(16);
  }, [selectedCategory]);

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const filteredTikTokVideos = useMemo(() => {
    if (selectedCategory === "all") {
      return GALLERY_TIKTOK_VIDEOS;
    }
    return GALLERY_TIKTOK_VIDEOS.filter((v) => v.categoryId === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (!GALLERY_TIKTOK_VIDEOS.length) return;
    if (document.getElementById("tiktok-embed-js")) return;
    const script = document.createElement("script");
    script.id = "tiktok-embed-js";
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Layout>
      {/* WVI Style Gallery Hero */}
      <section className="relative h-80 flex items-center bg-primary overflow-hidden">
        <img
          src="/gallery/Bababe Art/art (1).jpg"
          alt="Gallery Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/10" />
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Notre <span className="text-red-500">Galerie</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl font-medium">
            Photos, albums par thème et vidéos  de nos actions à Bababé.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white sticky top-16 lg:top-[72px] z-40 border-b border-border shadow-sm">
        <div className="container py-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-black uppercase tracking-widest text-primary/50 mr-2 hidden lg:block">Filtrer :</span>
            {CATEGORIES.map(cat => {
              const count = cat.id === "all" ? allImages.length : allImages.filter(i => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded transition-all duration-200 ${selectedCategory === cat.id
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {cat.name}
                  <span className="ml-1.5 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 md:py-16 bg-gray-50 min-h-screen">
        <div className="container">
          {filteredTikTokVideos.length > 0 && (
            <div
              id="videos-tiktok"
              className="scroll-mt-36 md:scroll-mt-40 mb-14 md:mb-16 rounded-xl border-4 border-red-600 bg-gradient-to-br from-zinc-900 via-zinc-900 to-primary p-6 md:p-10 shadow-2xl"
            >
              <p className="text-red-500 font-black uppercase tracking-[0.2em] text-xs mb-2">
                Vidéos
              </p>
              <h2 className="text-2xl md:text-4xl font-black uppercase text-white tracking-tight mb-2">
                Vidéos de nos activités
              </h2>
              <p className="text-white/80 text-sm md:text-base mb-8 max-w-2xl font-medium">
                {selectedCategory === "all"
                  ? "Revivez nos moments forts en image mjeb.  "
                  : "Vidéos pour la catégorie sélectionnée."}
              </p>
              <div className="grid gap-6 lg:grid-cols-2">
                {filteredTikTokVideos.map((v) => (
                  <div
                    key={v.id}
                    className="rounded-xl overflow-hidden border-2 border-white/20 bg-black/40 shadow-2xl"
                  >
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-5 md:p-6 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 transition-colors text-white group"
                    >
                      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/40 group-hover:scale-105 transition-transform">
                        <Play className="h-8 w-8 text-white fill-white ml-1" aria-hidden />
                      </span>
                      <span className="flex-1 text-left min-w-0">
                        <span className="block font-black uppercase tracking-wide text-sm md:text-base leading-snug">
                          {v.title}
                        </span>
                        <span className="inline-flex items-center gap-2 mt-2 text-xs font-bold uppercase tracking-widest text-white/90">
                          Ouvrir la vidéo
                          <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
                        </span>
                      </span>
                    </a>
                    <div className="p-4 md:p-6 bg-zinc-950 flex justify-center items-start overflow-x-auto">
                      <blockquote
                        className="tiktok-embed"
                        cite={v.url}
                        style={{ maxWidth: "605px", minWidth: "280px" }}
                      >
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {v.title} — voir la vidéo
                        </a>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-500">
              Affichage de <span className="text-primary font-black">{visibleImages.length}</span> sur <span className="text-primary font-black">{filteredImages.length}</span> photos
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {visibleImages.map(image => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="cursor-pointer group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e0e0e0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='14'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-bold truncate">{image.title}</p>
                    <p className="text-white/60 text-[10px] uppercase tracking-wider">{image.folder}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Voir Plus Button */}
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount(prev => prev + 16)}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm px-10 py-4 rounded shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                Voir plus
                <span className="text-white/60 font-normal normal-case text-xs">
                  ({filteredImages.length - visibleCount} restantes)
                </span>
              </button>
            </div>
          )}

          {filteredImages.length === 0 && (
            <div className="text-center py-32 bg-white shadow-sm border border-border rounded-lg">
              <p className="text-primary font-black uppercase tracking-widest text-xl opacity-50">Aucun contenu trouvé dans cette catégorie</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-mjeb-blue/95 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full bg-white p-2 md:p-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 md:-top-16 right-0 text-white hover:text-mjeb-orange transition-colors flex items-center gap-2 font-black uppercase tracking-widest p-2"
            >
              <span className="hidden md:inline">Fermer</span> <X className="w-8 h-8" />
            </button>
            <div className="relative group">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23333' width='800' height='600'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="mt-6 md:mt-8 p-4 border-l-8 border-red-600">
              <p className="text-xs font-black text-red-600 uppercase tracking-[0.3em] mb-2">{selectedImage.folder}</p>
              <h3 className="text-2xl md:text-3xl font-black text-primary leading-tight uppercase">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Impact Section - Large Stats */}
      <section className="section-primary border-t border-white/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 border border-white/20 hover:bg-white/5 transition-colors group">
              <p className="impact-big-number !text-white group-hover:scale-110 transition-transform">{allImages.length}</p>
              <p className="text-mjeb-orange font-black uppercase tracking-widest">Histoires Partagées</p>
            </div>
            <div className="p-8 border border-white/20 hover:bg-white/5 transition-colors group">
              <p className="impact-big-number !text-white group-hover:scale-110 transition-transform">{CATEGORIES.length - 1}</p>
              <p className="text-red-500 font-black uppercase tracking-widest">Catégories D'Impact</p>
            </div>
            <div className="p-8 border border-white/20 hover:bg-white/5 transition-colors group">
              <p className="impact-big-number !text-red-500 group-hover:scale-110 transition-transform">{filteredImages.length}</p>
              <p className="text-white font-black uppercase tracking-widest">Séléction Actuelle</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - WVI Banner */}
      <section className="section-white">
        <div className="container">
          <div className="bg-primary p-2 md:p-5 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left relative z-10">
              <h2 className="text-2xl md:text-3xl font-black uppercase mb-4 leading-tight">
                Participez à la construction du <span className="text-red-500">Bababé</span> de demain
              </h2>
              <p className="text-lg md:text-xl font-medium text-white/90">
                Vous avez des images ou des vidéos qui témoignent de notre changement ? Partagez-les avec nous.
              </p>
            </div>
            <Link href="/contact" className="btn-wvi-primary !px-12 !py-6 relative z-10 whitespace-nowrap">
              Nous Contacter
            </Link>
            <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 transform -skew-x-12 translate-x-1/2" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

