import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState, useMemo } from "react";

export default function News() {
  const { data: articles, isLoading } = trpc.articles.list.useQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    return articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [articles, searchQuery]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-70 bg-cover bg-center overflow-hidden">
        <img
          src="/gallery/AG PRESIDENT.jpg"
          alt="Actualités hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/10" />

        <div className="container relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">Actualités</h1>
          <p className="text-lg text-white/95 max-w-2xl font-medium">
            Restez informé de nos derniers projets, événements et initiatives
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b border-border">
        <div className="container">
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 page-muted" />
              <Input
                placeholder="Rechercher une actualité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-muted rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredArticles && filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/news/${article.slug}`}>
                  <a className="group h-full">
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                      {article.imageUrl && (
                        <div className="w-full h-48 bg-muted overflow-hidden">
                          {article.imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                              src={article.imageUrl}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              muted loop autoPlay playsInline
                            />
                          ) : (
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-xs font-black text-red-600 mb-2 uppercase tracking-widest">
                          {article.publishedAt && format(new Date(article.publishedAt), "d MMMM yyyy", { locale: fr })}
                        </p>
                        <h3 className="text-lg font-black uppercase text-primary mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm page-muted flex-1 line-clamp-3 font-medium">
                          {article.description}
                        </p>
                        <div className="mt-4 text-red-600 font-black uppercase tracking-widest text-xs group-hover:underline transition-all">
                          Lire la suite →
                        </div>
                      </div>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="page-muted text-lg font-medium">
                {searchQuery ? "Aucune actualité ne correspond à votre recherche" : "Aucune actualité pour le moment"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary mb-6">
            Restez Informé
          </h2>
          <p className="text-foreground/80 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et événements directement dans votre boîte mail.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1"
            />
            <button type="submit" className="btn-mjeb-primary-sm whitespace-nowrap">
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
