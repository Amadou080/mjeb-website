import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Handshake, Target, Award } from "lucide-react";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { STATIC_PARTNERS } from "@/lib/staticContent";

export default function Partners() {
  const partners = STATIC_PARTNERS;

  const partnerCategories = [
    { icon: Target, label: "ONG Internationales", color: "bg-primary/10 text-primary" },
    { icon: Award, label: "Sponsors Locaux", color: "bg-secondary/10 text-secondary" },
    { icon: Handshake, label: "Partenaires Institutionnels", color: "bg-accent/10 text-accent" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center overflow-hidden">
        <img
          src="/mjeb-logo.jpg"
          alt="Partners hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/65 to-secondary/65"></div>

        <div className="container relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase text-white mb-4">Nos Partenaires</h1>
          <p className="text-xl text-white/95 max-w-2xl font-medium">
            Les organisations, ONG et sponsors qui soutiennent nos initiatives et nous aident à créer un impact positif
          </p>
        </div>
      </section>

      {/* Partnership Value */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-primary mb-4">
              Ensemble, nous créons l'impact
            </h2>
            <p className="text-lg page-muted max-w-2xl mx-auto font-medium">
              Les partenariats stratégiques sont au cœur de notre succès. Nous travaillons avec des organisations partageant nos valeurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Handshake,
                title: "Collaboration",
                desc: "Nous travaillons ensemble pour atteindre des objectifs communs"
              },
              {
                icon: Target,
                title: "Impact Durable",
                desc: "Nos partenaires nous aident à créer un changement positif et durable"
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Nous sélectionnons des partenaires de qualité et engagés"
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-black uppercase text-primary mb-3">{item.title}</h3>
                  <p className="page-muted font-medium">{item.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-primary mb-4">
              Nos Partenaires
            </h2>
            <p className="text-lg page-muted max-w-2xl mx-auto font-medium">
              Découvrez les organisations qui nous soutiennent
            </p>
          </div>

          {partners && partners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner) => (
                <Card
                  key={partner.id}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all bg-white"
                >
                  {partner.logoUrl && (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-6">
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-black uppercase text-primary mb-2">
                      {partner.name}
                    </h3>
                    {partner.category && (
                      <Badge className="mb-3 bg-secondary/20 text-secondary hover:bg-secondary/30">
                        {partner.category}
                      </Badge>
                    )}
                    {partner.description && (
                      <p className="page-muted text-sm mb-4 line-clamp-3 font-medium">
                        {partner.description}
                      </p>
                    )}
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 font-black uppercase tracking-widest text-xs hover:underline transition-colors flex items-center gap-2"
                      >
                        Visiter le site
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-10">
              <h3 className="text-3xl font-black uppercase text-primary mb-4">Soyez notre premier partenaire !</h3>
              <p className="page-muted text-lg mb-8 font-medium">Nous n'avons actuellement aucun partenaire officiel. C'est l'occasion idéale d'associer votre image à nos projets et d'avoir un impact direct sur notre communauté.</p>
              <Link href="/contact" className="btn-mjeb-primary">
                Devenir notre tout premier partenaire
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-primary mb-6">
                Intéressé par un partenariat ?
              </h2>
              <p className="text-lg page-muted mb-6 font-medium">
                Nous cherchons toujours des partenaires partageant nos valeurs et engagés pour créer un impact positif à Bababé.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Soutien financier et ressources",
                  "Expertise et savoir-faire",
                  "Visibilité et reconnaissance",
                  "Impact communautaire mesurable"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn-mjeb-primary">
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
              <h3 className="text-2xl font-black uppercase text-primary mb-6">Avantages du partenariat</h3>
              <div className="space-y-6">
                {[
                  { num: "01", title: "Visibilité", desc: "Présence sur notre site et communications" },
                  { num: "02", title: "Impact", desc: "Contribuer à des projets communautaires" },
                  { num: "03", title: "Réseau", desc: "Accès à notre communauté de 500+ membres" },
                  { num: "04", title: "Reconnaissance", desc: "Statut de partenaire officiel du MJEB" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="text-3xl font-black text-red-600">{item.num}</div>
                    <div>
                      <p className="font-bold text-foreground">{item.title}</p>
                      <p className="text-sm page-muted font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-2 md:py-5 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-4">
            Rejoignez notre réseau de partenaires
          </h2>
          <p className="text-lg text-white/95 mb-4 max-w-2xl mx-auto font-medium">
            Ensemble, créons un impact positif et durable à Bababé
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/contact" className="btn-mjeb-cta-blue">
              Commencer une conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/projects" className="btn-mjeb-cta-white">
              Voir nos projets
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
