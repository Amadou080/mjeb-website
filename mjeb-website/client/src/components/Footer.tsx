import { Link } from "wouter";
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Projets", href: "/projects" },
    { label: "Actualités", href: "/news" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/mjeb",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/mjeb",
      label: "Instagram",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/+22247350265",
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-950 to-blue-950/95 text-white">
      {/* Main Footer Content */}
      <div className="container py-1 md:py-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-white p-1.5 rounded-md">
                <img src="/mjeb-logo.jpg" alt="MJEB" className="h-9 w-auto" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight block leading-none">MJEB</span>
                <span className="text-[9px] text-white/50 uppercase tracking-wider font-semibold">
                  Bababé, Mauritanie
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Le Mouvement des Jeunes Engagés de Bababé crée un impact positif et durable à travers l'innovation, l'engagement et la solidarité.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-red-600 hover:text-white transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:mjeb.contact@gmail.com"
                className="flex items-center gap-3 text-sm text-white/65 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors flex-shrink-0">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span>mjeb.contact@gmail.com</span>
              </a>
              <a
                href="tel:+22247350265"
                className="flex items-center gap-3 text-sm text-white/65 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors flex-shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span>+222 47 35 02 65 - 48 07 36 25</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-white/65">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span>Bababé, Mauritanie</span>
              </div>
            </div>
          </div>

          {/* CTA Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5">
              Rejoignez-nous
            </h4>
            <p className="text-sm text-white/60 mb-5 leading-relaxed">
              Devenez membre du MJEB et contribuez au développement de Bababé.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 active:scale-95"
            >
              Nous Rejoindre
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>
            &copy; {currentYear} Mouvement des Jeunes Engagés de Bababé (MJEB). Tous droits réservés.
          </p>

        </div>
      </div>
    </footer>
  );
}
