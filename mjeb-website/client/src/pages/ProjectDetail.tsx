import { useRoute } from "wouter";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, ChevronRight, Share2 } from "lucide-react";
import Layout from "@/components/Layout";
import { PROJECTS } from "@/lib/projects";
import { cn } from "@/lib/utils";

function projectCardClasses() {
  return "group flex flex-col bg-card border border-border/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300";
}

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const [, navigate] = useLocation();
  const id = params?.id ? Number(params.id) : null;
  const project = PROJECTS.find((item) => item.id === id);

  const highlightResults = project?.results.slice(0, 3) ?? [];

  if (!project) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-black uppercase text-primary mb-4">Projet non trouvé</h1>
            <p className="page-muted mb-8">
              Le projet que vous recherchez n&apos;existe pas ou a été supprimé.
            </p>
            <Link href="/projects" className="btn-mjeb-outline-sm gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour aux projets
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const Icon = project.icon;

  return (
    <Layout>
      {/* Fil d&apos;Ariane — bandeau discret */}
      <nav
        aria-label="Fil d'Ariane"
        className="border-b border-border bg-muted/30"
      >
        <div className="container py-3 text-sm page-muted">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" aria-hidden />
            <li>
              <Link href="/projects" className="hover:text-foreground transition-colors">
                Projets
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" aria-hidden />
            <li className="text-primary font-bold truncate max-w-[min(100%,12rem)] sm:max-w-md">
              {project.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero — image pleine largeur, légende en bas (style WVI) */}
      <header className="relative min-h-[380px] md:min-h-[480px] flex flex-col justify-end bg-primary">
        <div className="absolute inset-0">
          <img src={project.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/25" />
        </div>
        <div className="relative z-10 container pb-10 md:pb-14 pt-24 md:pt-32 text-primary-foreground">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tous les projets
          </Link>
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/90 font-black mb-3">
            {project.status}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white max-w-4xl leading-[1.1] mb-4">
            {project.title}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/95 max-w-2xl leading-relaxed font-medium">
            {project.subtitle}
          </p>
        </div>
      </header>

      {/* Jalons / résultats clés — bandeau type chiffres WVI */}
      {highlightResults.length > 0 && (
        <section className="border-b border-border bg-card">
          <div className="container py-10 md:py-12">
            <div
              className={cn(
                "grid gap-8 md:gap-6",
                highlightResults.length === 1 && "md:grid-cols-1 max-w-2xl mx-auto text-center",
                highlightResults.length === 2 && "md:grid-cols-2",
                highlightResults.length >= 3 && "md:grid-cols-3"
              )}
            >
              {highlightResults.map((line, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <p className="text-lg md:text-xl font-black text-red-600 leading-snug">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Corps de page */}
      <article className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* En-tête article + partage */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-border mb-10 md:mb-12">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="w-6 h-6" aria-hidden />
                </span>
                <div>
                  <p className="font-black uppercase text-primary">MJEB</p>
                  <p className="text-sm page-muted font-medium">Mouvement pour la jeunesse engagée de Bababé</p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-red-600 hover:underline self-start sm:self-center"
                aria-label="Partager ce projet"
              >
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </div>

            <section className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary leading-snug mb-4">
                Notre engagement sur ce projet
              </h2>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                {project.detailedDescription}
              </p>
            </section>

            <section className="mb-12 md:mb-16 rounded-lg border border-border/80 bg-muted/30 p-6 md:p-8">
              <h2 className="text-lg font-black text-primary uppercase tracking-wide mb-4">
                Objectifs
              </h2>
              <ul className="space-y-3">
                {project.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-foreground/85">
                    <span className="mt-2 inline-flex h-2 w-2 rounded-full bg-secondary shrink-0" />
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary leading-snug mb-6">
                Pourquoi ce projet ?
              </h2>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">{project.context}</p>
            </section>

            <section className="mb-12 md:mb-16 rounded-xl border-2 border-red-600/40 bg-red-50/60 p-6 md:p-8 text-center md:text-left">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600 mb-2">
                Galerie
              </p>
              <h3 className="text-lg md:text-xl font-black uppercase text-primary mb-2">
                Vidéos TikTok de nos activités
              </h3>
              <p className="text-sm md:text-base page-muted font-medium mb-4 max-w-xl md:mx-0 mx-auto">
                Les extraits vidéo sont regroupés dans la page Galerie, avec les photos.
              </p>
              <Link
                href="/gallery#videos-tiktok"
                className="btn-mjeb-primary-sm inline-flex"
              >
                Ouvrir la galerie — vidéos
              </Link>
            </section>
          </div>

          {/* Domaines d&apos;action — grille type &quot;How we do it&quot; */}
          <div className="max-w-5xl mx-auto mt-4 md:mt-8">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-primary mb-6 md:mb-8 text-center md:text-left">
              Nos activités sur le terrain
            </h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {project.activities.map((activity, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border/60 bg-card hover:border-primary/25 transition-colors"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm md:text-base text-foreground/85 leading-snug">{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-3xl mx-auto mt-14 md:mt-20">
            <section className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary leading-snug mb-6">
                Résultats et impact
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {project.results.map((result, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-lg border border-border/60 bg-muted/20"
                  >
                    <p className="text-sm md:text-base text-foreground/85 leading-relaxed">{result}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border-l-4 border-secondary bg-muted/40 p-6 md:p-8">
                <h3 className="text-lg font-black uppercase text-primary mb-2">Impact global</h3>
                <p className="text-foreground/80 leading-relaxed">{project.impact}</p>
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-10 md:gap-12 mb-12 md:mb-16">
              <div>
                <h3 className="text-xl font-black uppercase text-primary mb-3">Bénéficiaires</h3>
                <p className="text-foreground/80 leading-relaxed">{project.beneficiaries}</p>
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-primary mb-3">Ressources</h3>
                <p className="text-foreground/80 leading-relaxed">{project.resources}</p>
              </div>
            </section>

            <section className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary leading-snug mb-6">
                Points de vigilance
              </h2>
              <ul className="space-y-3">
                {project.risks.map((risk, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded-lg border border-border/60 bg-background text-sm md:text-base text-foreground/85"
                  >
                    {risk}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>

      {/* Bandeau CTA — style campagne WVI */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0 md:max-w-none flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-3">
                Comment participer ?
              </h2>
              <p className="text-white/95 text-base md:text-lg leading-relaxed max-w-xl font-medium">
                Rejoignez le MJEB et contribuez à la transformation de Bababé aux côtés de la communauté.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end shrink-0">
              {project.ctas.map((cta, idx) => (
                <Link
                  key={idx}
                  href={cta.href}
                  className={idx === 0 ? "btn-mjeb-cta-blue" : "btn-mjeb-cta-white"}
                >
                  {cta.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Autres projets — mêmes cartes que la liste */}
      <section className="py-14 md:py-24 bg-muted/30 border-t border-border/80">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mb-10 md:mb-14">
            <p className="page-eyebrow mb-2">Poursuivre la lecture</p>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-primary leading-tight">
              D&apos;autres projets du MJEB
            </h2>
            <p className="page-muted mt-3 text-base md:text-lg font-medium">
              Découvrez d&apos;autres initiatives pour la jeunesse, la culture et l&apos;environnement à Bababé.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PROJECTS.filter((item) => item.id !== project.id).map((other) => {
              const OtherIcon = other.icon;
              return (
                <article key={other.id} className={projectCardClasses()}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={other.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <OtherIcon className="w-4 h-4" aria-hidden />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide truncate">
                        {other.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-primary leading-snug mb-1 group-hover:text-red-600 transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-sm font-bold text-red-600 mb-3 uppercase tracking-wide">{other.subtitle}</p>
                    <p className="text-sm page-muted leading-relaxed flex-1 line-clamp-3">
                      {other.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(`/projects/${other.id}`)}
                      className="wvi-link mt-5 text-left"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
