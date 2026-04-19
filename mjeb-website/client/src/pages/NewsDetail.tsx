import { useRoute } from "wouter";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:slug");
  const slug = params?.slug as string;

  const { data: article, isLoading } = trpc.articles.getBySlug.useQuery(slug, {
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="h-8 bg-muted rounded animate-pulse"></div>
            <div className="h-96 bg-muted rounded animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-black uppercase text-primary mb-4">Article non trouvé</h1>
            <p className="page-muted mb-8 font-medium">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Link href="/news" className="btn-mjeb-outline-sm gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour aux actualités
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-secondary/5 border-b border-border">
        <div className="container py-4">
          <Link href="/news" className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-red-600 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24 bg-white">
        <article className="container max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm page-muted mb-4 font-medium">
              {article.publishedAt && format(new Date(article.publishedAt), "d MMMM yyyy", { locale: fr })}
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-primary mb-6">
              {article.title}
            </h1>
            {article.description && (
              <p className="text-lg text-foreground/80 leading-relaxed">
                {article.description}
              </p>
            )}
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
              {article.imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                <video
                  src={article.imageUrl}
                  className="w-full h-auto object-cover max-h-[600px] bg-black"
                  controls
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
          )}

          {/* Content */}
          {article.content && (
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {article.content}
              </div>
            </div>
          )}

          {/* Meta Info */}
          <Card className="p-8 border-0 shadow-lg bg-secondary/5">
            <h3 className="font-black uppercase text-primary mb-4">À propos de cet article</h3>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="page-muted mb-1 text-xs font-bold uppercase tracking-wide">Publié le</p>
                <p className="font-semibold text-foreground">
                  {article.publishedAt && format(new Date(article.publishedAt), "d MMMM yyyy", { locale: fr })}
                </p>
              </div>
              <div>
                <p className="page-muted mb-1 text-xs font-bold uppercase tracking-wide">Catégorie</p>
                <p className="font-semibold text-foreground">Actualités MJEB</p>
              </div>
            </div>
          </Card>
        </article>
      </section>

      {/* Related Articles CTA */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary mb-6">
            Autres Actualités
          </h2>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
            Découvrez nos autres articles et restez informé de nos dernières activités.
          </p>
          <Link href="/news" className="btn-mjeb-primary">
            Voir toutes les actualités
          </Link>
        </div>
      </section>
    </Layout>
  );
}
