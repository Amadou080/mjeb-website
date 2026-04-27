import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    const subject = encodeURIComponent(`Contact MJEB - ${formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:mjeb.contact@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Votre application email va s'ouvrir pour envoyer le message.");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center overflow-hidden">
        <img
          src="/gallery/9.png"
          alt="Contact hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-secondary/08"></div>

        <div className="container relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase text-white mb-4">Nous Contacter</h1>
          <p className="text-xl text-white/95 max-w-2xl font-medium">
            Vous avez une question, une proposition ou vous voulez nous soutenir ? Contactez-nous !
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase text-primary mb-2">Email</h3>
              <a
                href="mailto:mjeb.contact@gmail.com"
                className="page-muted hover:text-red-600 transition-colors break-all font-medium"
              >
                mjeb.contact@gmail.com
              </a>
              <p className="text-sm page-muted mt-2">Réponse sous 24-48h</p>
            </Card>

            <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-secondary text-white rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase text-primary mb-2">Téléphone</h3>
              <a
                href="tel:+22247350265"
                className="page-muted hover:text-red-600 transition-colors font-medium"
              >
                +222 47 35 02 65 - 48 07 36 25
              </a>
              <p className="text-sm page-muted mt-2">Lun-Ven: 9h-17h</p>
            </Card>

            <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase text-primary mb-2">Localisation</h3>
              <p className="page-muted font-medium">
                Bababé<br />
                Mauritanie
              </p>
              <p className="text-sm page-muted mt-2">Siège social</p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-primary mb-6">
                Envoyez-nous un message
              </h2>
              <p className="text-lg page-muted mb-8 font-medium">
                Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible. Nous apprécions vos suggestions, questions et partenariats potentiels.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Send, title: "Rapide", desc: "Réponse sous 24-48h" },
                  { icon: Mail, title: "Transparent", desc: "Communication directe" },
                  { icon: Clock, title: "Disponible", desc: "Toujours à l'écoute" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{item.title}</p>
                        <p className="text-sm page-muted font-medium">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Card id="contact-form" className="p-8 border-0 shadow-xl bg-white scroll-mt-24">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nom complet *
                  </label>
                  <Input
                    type="text"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border-border focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="border-border focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    placeholder="Votre message..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="btn-mjeb-primary w-full py-6 text-base"
                >
                  Envoyer le message
                  <Send className="w-5 h-5" />
                </Button>

                <p className="text-xs text-foreground/60 text-center">
                  Nous respectons votre vie privée. Vos données ne seront jamais partagées.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-primary mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-lg page-muted max-w-2xl mx-auto font-medium">
              Trouvez les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "Comment puis-je rejoindre le MJEB ?",
                a: "Contactez-nous via le formulaire ci-dessus ou envoyez un email à mjeb.contact@gmail.com. Nous vous fournirons toutes les informations nécessaires."
              },
              {
                q: "Quels sont les domaines d'action du MJEB ?",
                a: "Le MJEB intervient dans 7 domaines : culture, environnement, éducation, entrepreneuriat, santé, sports et développement communautaire."
              },
              {
                q: "Comment puis-je soutenir le MJEB ?",
                a: "Vous pouvez nous soutenir en rejoignant nos projets, en faisant un don, ou en devenant partenaire. Contactez-nous pour plus de détails."
              },
              {
                q: "Où se trouve le siège du MJEB ?",
                a: "Notre siège social est basé à Bababé, Mauritanie. Vous pouvez nous contacter par email ou téléphone pour une visite."
              }
            ].map((faq, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-black uppercase text-primary mb-3">{faq.q}</h3>
                <p className="page-muted font-medium">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-1 md:py-3 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-4">
            Prêt à nous rejoindre ?
          </h2>
          <p className="text-lg text-white/95 mb-4 max-w-2xl mx-auto font-medium">
            Envoyez-nous votre message et commençons à créer ensemble un impact positif à Bababé.
          </p>
          <a href="#contact-form" className="btn-mjeb-cta-white inline-flex">
            Retour au formulaire
          </a>
        </div>
      </section>
    </Layout>
  );
}
