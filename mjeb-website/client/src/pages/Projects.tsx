import { Link, useLocation } from "wouter";
import Layout from "@/components/Layout";
import {
  ArrowRight,
  ChevronRight,
  Droplet,
  GraduationCap,
  Leaf,
  Music,
  Sparkles,
  Users,
} from "lucide-react";
import { PROJECTS } from "@/lib/projects";

const FOCUS_AREAS = [
  { label: "Culture & événements", icon: Music },
  { label: "Environnement & climat", icon: Leaf },
  { label: "Éducation & formation", icon: GraduationCap },
  { label: "Eau & assainissement", icon: Droplet },
  { label: "Communauté & citoyenneté", icon: Users },
  { label: "Créativité & arts", icon: Sparkles },
];

const IMPACT_STATS = [
  { value: "6", caption: "Projets actifs", href: "#nos-projets" },
  { value: "300+", caption: "Arbres plantés", href: "#nos-projets" },
  { value: "Plusieurs", caption: "Bénévoles mobilisés", href: "#nos-projets" },
  { value: "Plusieurs", caption: "Personnes touchées / an", href: "#nos-projets" },
];

function projectCardClasses() {
  return "group flex flex-col bg-card border border-border/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300";
}

export default function Projects() {
  const [, navigate] = useLocation();

  return (
    <Layout>
      {/* Hero — plein écran image + titre (style WVI homepage) */}
      <section className="relative min-h-[420px] md:min-h-[520px] flex flex-col justify-end bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src="/gallery/fond%20(1).jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/40" />
        </div>
        <div className="relative z-10 container pb-12 md:pb-16 pt-32 md:pt-40">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/90 font-black mb-3">
            MOUVEMENT DES JEUNES ENGAGÉS DE BABABÉ
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white max-w-4xl leading-[1.1] mb-4">
            Nos projets
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/95 max-w-2xl leading-relaxed mb-8 font-medium">
            Parce que nos actions sont ancrées dans la communauté, chaque initiative renforce
            l&apos;éducation, la culture et l&apos;environnement pour un Bababé plus solidaire.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#nos-projets" className="btn-mjeb-primary">
              Découvrir nos projets
            </a>
            <Link href="/contact" className="btn-mjeb-outline-on-dark">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Chiffres clés — bandeau type WVI */}
      <section className="border-b border-border bg-card">
        <div className="container py-1 md:py-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {IMPACT_STATS.map((stat) => (
              <a
                key={stat.caption}
                href={stat.href}
                className="text-center md:text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-black text-red-600 tabular-nums tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base page-muted mt-1 font-medium">{stat.caption}</p>
                <span className="inline-flex items-center gap-1 text-sm font-black uppercase tracking-widest text-red-600 mt-3 group-hover:underline">
                  En savoir plus
                  <ChevronRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
          <p className="text-center text-xs page-muted mt-8 md:mt-10 italic">
            * Chiffres indicatifs basés sur les activités du MJEB à Bababé
          </p>
        </div>
      </section>

      {/* Mission — bloc centré */}
      <section className="py-14 md:py-20 bg-muted/40">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-primary leading-snug mb-6">
              Ensemble, nous pouvons renforcer les jeunes et la communauté
            </h2>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-medium">
              Notre priorité est d&apos;accompagner les plus motivés à surmonter les obstacles
              sociaux et environnementaux et à construire un avenir durable. Nous agissons pour
              tous, dans le respect des réalités locales, avec la conviction que chaque projet
              compte aujourd&apos;hui et pour demain.
            </p>
            <Link href="/about" className="wvi-link mt-6">
              Qui sommes-nous
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Domaines d&apos;intervention — grille type &quot;How we do it&quot; */}
      <section className="py-14 md:py-20 bg-background border-y border-border/80">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
            <div>
              <p className="page-eyebrow mb-2">Comment nous agissons</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary">
                Nos domaines d&apos;intervention
              </h2>
            </div>
            <a
              href="#nos-projets"
              className="text-sm font-black uppercase tracking-widest text-red-600 inline-flex items-center gap-1 shrink-0 hover:underline"
            >
              Voir tous les projets
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {FOCUS_AREAS.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex flex-col items-center text-center p-4 md:p-5 rounded-lg border border-border/60 bg-card hover:border-primary/30 transition-colors"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <Icon className="w-6 h-6" aria-hidden />
                </span>
                <span className="text-xs md:text-sm font-bold text-primary leading-tight">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Grille projets — cartes type &quot;The World Where We Live&quot; */}
      <section id="nos-projets" className="py-14 md:py-24 bg-muted/30 scroll-mt-20">
        <div className="container">
          <div className="max-w-3xl mb-10 md:mb-14">
            <p className="page-eyebrow mb-2">Le terrain où nous agissons</p>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-primary leading-tight mb-4">
              Chaque projet raconte une facette de Bababé
            </h2>
            <p className="page-muted text-base md:text-lg leading-relaxed font-medium">
              Découvrez nos initiatives : culture, environnement, éducation et mobilisation
              citoyenne, au service d&apos;une communauté plus résiliente.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <article key={project.id} className={projectCardClasses()}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Icon className="w-4 h-4" aria-hidden />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide truncate">
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-primary leading-snug mb-1 group-hover:text-red-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-bold text-red-600 mb-3 uppercase tracking-wide">{project.subtitle}</p>
                    <p className="text-sm page-muted leading-relaxed flex-1 line-clamp-3">
                      {project.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(`/projects/${project.id}`)}
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

      {/* Bandeau campagne / CTA fort */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/gallery/Bababe Art/art%20(4).jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase leading-tight mb-4">
              Rejoignez le mouvement
            </h2>
            <p className="text-white/95 text-base md:text-lg leading-relaxed mb-6 font-medium">
              Vous souhaitez participer à un projet, proposer une idée ou devenir partenaire ?
              Chaque contribution renforce notre impact à Bababé.
            </p>
            <ul className="space-y-2 text-sm md:text-base text-white/95 font-medium">
              {[
                "Rejoindre l’équipe de bénévoles",
                "Proposer une nouvelle initiative",
                "Devenir partenaire ou sponsor",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <Link href="/contact" className="btn-mjeb-cta-blue">
              Nous contacter
            </Link>
            <Link href="/gallery" className="btn-mjeb-cta-white">
              Voir la galerie
            </Link>
          </div>
        </div>
      </section>

      {/* Impact global — phrase de clôture */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight text-primary leading-snug mb-4">
            Ensemble, nous construisons un Bababé plus vert, plus cultivé et plus uni
          </h2>
          <p className="page-muted mb-8 text-base font-medium max-w-2xl mx-auto">
            Les projets du MJEB s’appuient sur la communauté locale, les partenaires et les
            bénévoles pour un changement durable.
          </p>
          <Link href="/contact" className="btn-mjeb-primary gap-2">
            Faire la différence avec nous
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
