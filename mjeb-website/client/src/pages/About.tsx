import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Zap, Users, Award } from "lucide-react";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function About() {

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[280px] md:min-h-[360px] bg-cover bg-center overflow-hidden animate-in fade-in slide-in-from-top duration-700">
        <img
          src="/gallery/Bababe GREEN/bababe green  (7).jpg"
          alt="About hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-secondary/85" />

        <div className="container max-w-3xl mx-auto relative z-10 h-full flex flex-col justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-3">À Propos du MJEB</h1>
          <p className="text-lg text-white/95 max-w-2xl font-medium">
            Découvrez l'histoire, la mission et les valeurs du Mouvement des Jeunes Engagés de Bababé
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-6 md:py-8 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-[240px] md:h-[280px]">
              <img
                src="/gallery/Bababe GREEN/bababe green  (1).jpg"
                alt="Affiche MJEB"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            <div className="animate-in fade-in slide-in-from-right duration-700">
              <div className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full font-semibold mb-3">
                Notre Histoire
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary mb-4">
                Un mouvement né de la passion
              </h2>
              <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                <p>
                  Le MJEB a été fondé par un groupe de jeunes passionnés de Bababé qui voulaient créer une organisation pour mobiliser la jeunesse et promouvoir le développement local. Depuis sa création, le MJEB a réalisé plusieurs projets dans les domaines de l'éducation, de l'environnement et de la culture.
                </p>
                <p>
                  Notre association est née de la conviction que les jeunes sont les acteurs clés du changement social. En rassemblant des talents divers et en créant des espaces de collaboration, nous avons pu transformer des idées en actions concrètes qui bénéficient à toute la communauté de Bababé.
                </p>
                <p>
                  Aujourd'hui, le MJEB compte plus de 500 membres actifs et continue de grandir. Nous sommes fiers d'avoir impacté la vie de plus de 10 000 personnes à travers nos différentes initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Objectives */}
      <section className="py-6 md:py-8 bg-gray-50 animate-in fade-in slide-in-from-bottom duration-700">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary mb-3">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-sm page-muted max-w-xl mx-auto font-medium">
              Les principes qui guident chaque action du MJEB
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Mission */}
            <Card className="p-4 border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-black uppercase text-primary mb-3">Notre Mission</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Mobiliser, former et accompagner les jeunes pour qu'ils deviennent des acteurs responsables du développement social, culturel et environnemental de Bababé.
              </p>
            </Card>

            {/* Vision */}
            <Card className="p-4 border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-black uppercase text-primary mb-3">Notre Vision</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Une Bababé prospère, inclusive et durable où les jeunes sont des leaders du changement positif et où chaque voix compte.
              </p>
            </Card>

            {/* Values */}
            <Card className="p-4 border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-black uppercase text-primary mb-3">Nos Valeurs</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Engagement, Intégrité, Collaboration, Innovation et Responsabilité sociale.
              </p>
            </Card>
          </div>

          {/* Objectives */}
          <div className="bg-white rounded-xl shadow-lg p-5">
            <h3 className="text-2xl font-black uppercase text-primary mb-6 text-center">Nos Objectifs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Créer des opportunités d'apprentissage et de développement pour les jeunes",
                "Promouvoir l'engagement civique et la participation communautaire",
                "Protéger l'environnement et combattre le changement climatique",
                "Valoriser et promouvoir la culture locale et les talents artistiques",
                "Faciliter l'entrepreneuriat et l'innovation chez les jeunes",
                "Créer des partenariats durables avec les organisations locales et internationales"
              ].map((objective, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-foreground/80">{objective}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-6 md:py-8 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Users, number: "500+", label: "Membres actifs" },
              { icon: Award, number: "25+", label: "Projets réalisés" },
              { icon: Heart, number: "10K+", label: "Personnes impactées" },
              { icon: Zap, number: "7", label: "Domaines d'action" }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <p className="text-3xl md:text-4xl font-black text-white mb-1">{stat.number}</p>
                  <p className="text-white/80 text-xs md:text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-2 md:py-4 bg-gray-25">
        <div className="container max-w-1xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary mb-4">
            Rejoignez notre mouvement
          </h2>
          <p className="text-sm page-muted mb-4 max-w-xl mx-auto font-medium">
            Vous êtes passionné par le changement social ? Rejoignez-nous et soyez part de la transformation de Bababé.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-mjeb-primary-sm">
              Nous contacter
              <ArrowRight className="w-2 h-2" />
            </Link>
            <Link href="/projects" className="btn-mjeb-outline-sm">
              Découvrir nos projets
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
