import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { ArrowRight, Mail, Phone, MapPin, Sparkles, Users, Heart, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const texts = [
    "L'AVENIR DE",
    "LE FUTUR DE",
    "LA VISION DE"
  ];

  useEffect(() => {
    const currentText = texts[textIndex];
    let timer: number | undefined;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timer = window.setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = window.setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = window.setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 60);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  }, [displayText, isDeleting, textIndex]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(100px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <img
            src="/gallery/fond (3).jpg"
            alt="MJEB Impact"
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Floating Elements Background */}
        <div className="absolute inset-0 z-1 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        {/* Left Container - Text Box */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg animate-slide-in-left">
            {/* Left Colored Border */}
            <div className="flex">
              <div className="w-2 bg-gradient-to-b from-red-600 to-red-500 animate-pulse-scale" />

              <div className="bg-white/98 backdrop-blur-md p-6 sm:p-10 md:p-12 flex-1 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 animate-shimmer">
                {/* Typewriter Text - PLUS LISIBLE */}
                <div className="mb-6">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-700 leading-tight min-h-[150px] sm:min-h-[170px] md:min-h-[200px]">
                    <span className="inline-block animate-bounce-in">{displayText}</span>
                    <br />
                    <span className="text-red-700 inline-block animate-bounce-in" style={{ animationDelay: "0.2s" }}>BABABÉ</span>
                    <br />
                    <span className="text-blue-700 inline-block animate-bounce-in" style={{ animationDelay: "0.4s" }}>EST</span>
                    <br />
                    <span className="text-blue-700 inline-block animate-bounce-in" style={{ animationDelay: "0.6s" }}>ENTRE NOS</span>
                    <br />
                    <span className="text-blue-700 inline-block animate-bounce-in" style={{ animationDelay: "0.8s" }}>MAINS</span>
                    <span className="animate-pulse text-red-700 ml-2 font-bold">|</span>
                  </h1>
                </div>

                {/* Description Text - BLANC SUR FOND BLANC */}
                <div className="bg-white/100 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-lg mb-8 border border-gray-200">
                  <p className="text-base sm:text-lg text-black font-semibold leading-relaxed opacity-0 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                    Nous sommes un mouvement de jeunes engagés pour la transformation sociale, culturelle et environnementale de notre communauté.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 opacity-0 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                  <button
                    type="button"
                    onClick={() => navigate("/projects")}
                    className="btn-mjeb-primary w-full hover:scale-105 hover:-translate-y-2 group"
                  >
                    <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    NOS PROJETS
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/contact")}
                    className="btn-mjeb-outline w-full hover:scale-105 hover:-translate-y-2"
                  >
                    NOUS REJOINDRE →
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-700 rounded-full opacity-0 animate-bounce-in" style={{ animationDelay: "1.2s" }} />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-700 rounded-full opacity-0 animate-bounce-in" style={{ animationDelay: "1.4s" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers Section */}
      <section className="section-primary relative overflow-hidden py-1 md:py-2">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container relative z-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
            {[
              { number: "500+", text: "Jeunes bénévoles actifs et engagés sur le terrain.", icon: Users },
              { number: "1000+", text: "Personnes bénéficiant directement de nos initiatives.", icon: Heart },
              { number: "+sieurs", text: "Projets communautaires réalisés avec succès.", icon: Zap },
              { number: "+sieurs", text: "Domaines d'intervention stratégiques pour le futur.", icon: Sparkles }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="opacity-0 group cursor-pointer"
                  style={{
                    animation: `slide-up 0.8s ease-out forwards`,
                    animationDelay: `${idx * 150}ms`
                  }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />
                    <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 group-hover:bg-white/10">
                      <Icon className="w-8 h-8 mb-3 text-red-400 group-hover:text-red-300 transition-colors" />
                      <div className="impact-big-number group-hover:scale-110 transition-transform duration-300 text-5xl md:text-6xl">{item.number}</div>
                      <div className="impact-desc text-white/80 text-sm md:text-base mt-3 group-hover:text-white transition-colors">{item.text}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-white overflow-hidden relative py-16 md:py-24">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <div className="w-full h-full bg-gradient-to-l from-blue-600" />
        </div>

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 opacity-0" style={{ animation: `slide-in-left 0.8s ease-out forwards` }}>
              <h2 className="section-title-wvi">Qui Sommes-Nous ?</h2>
              <p className="lead mb-8">
                Le MJEB (Mouvement des Jeunes Engagés de Bababé) est né d'une volonté commune : <strong>agir pour notre ville.</strong>
              </p>
              <div className="space-y-6 text-base sm:text-lg text-foreground/80">
                <p>
                  Depuis notre création, nous mobilisons l'énergie et la créativité de la jeunesse pour répondre aux défis locaux. Que ce soit par l'art, le nettoyage urbain ou la sensibilisation, chaque action compte.
                </p>
                <p>
                  Notre approche est participative : nous croyons que le changement durable vient de la base, porté par une jeunesse consciente et responsable.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 relative opacity-0" style={{ animation: `slide-in-right 0.8s ease-out forwards`, animationDelay: "0.4s" }}>
              <div className="relative z-10 shadow-2xl overflow-hidden border-4 sm:border-8 border-white hover:shadow-3xl hover:scale-105 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                <img
                  src="/gallery/Bababe GREEN/bababe green  (8).jpg"
                  alt="MJEB Team"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-gray relative py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="container relative z-10">
          <div className="mb-12 opacity-0" style={{ animation: `slide-in-left 0.8s ease-out forwards` }}>
            <h2 className="section-title-wvi mb-0">Nos Projets Phares</h2>
            <p className="lead mt-6">Découvrez comment nous transformons Bababé à travers des actions concrètes et durables.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {[
              {
                title: "Festival Bababé Horizon",
                desc: "Une célébration annuelle alliant culture, sport et citoyenneté.",
                image: "/gallery/Bababe GREEN/bababe green  (6).jpg",
              },
              {
                title: "Développement Artistique",
                desc: "Promouvoir les talents locaux à travers des ateliers créatifs.",
                image: "/gallery/bababe art  (1).jpg",
              },
              {
                title: "Opération Bababé Clean & Green",
                desc: "Campagnes d'assainissement et reboisement pour un Bababé durable.",
                image: "/gallery/bababe clean (3).jpg",
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className="wvi-card group opacity-0 hover:translate-y-[-20px] transition-all duration-300"
                style={{
                  animation: `slide-up 0.8s ease-out forwards`,
                  animationDelay: `${idx * 200 + 200}ms`
                }}
              >
                <div className="wvi-card-image relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="group-hover:scale-125 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="wvi-card-bar group-hover:h-0 transition-all duration-300" />
                <div className="wvi-card-content">
                  <h3 className="wvi-card-title text-lg sm:text-xl group-hover:text-red-600 transition-colors">{project.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/70 mb-6 group-hover:text-foreground transition-colors">{project.desc}</p>
                  <button
                    onClick={() => navigate("/projects")}
                    className="wvi-link text-xs sm:text-sm hover:gap-4 transition-all"
                  >
                    Lire la suite <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-1 sm:py-2 md:py-5 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-2xl" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-2xl" style={{ transform: `translateY(${-scrollY * 0.3}px)` }} />
        </div>

        <div className="container relative z-10 opacity-0" style={{ animation: `slide-up 0.8s ease-out forwards`, animationDelay: "0.3s" }}>
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase mb-2 sm:mb-4 leading-tight hover:text-red-200 transition-colors duration-300">
              Rejoignez le <span className="text-blue-200 hover:text-white transition-colors">mouvement</span> aujourd'hui
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-medium opacity-85 mb-4 sm:mb-6 hover:opacity-100 transition-opacity">
              Votre expertise, votre temps ou votre soutien peuvent faire la différence.
            </p>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 opacity-0 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="btn-mjeb-cta-blue hover:scale-110 hover:-translate-y-2"
              >
                Devenir Membre
              </button>
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="btn-mjeb-cta-white hover:scale-110 hover:-translate-y-2"
              >
                Nous Soutenir
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="section-primary border-t border-white/2 py-1 md:py-2">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-1 md:gap-2">
            {[
              { icon: Mail, label: "Email", value: "mjeb.contact@gmail.com" },
              { icon: Phone, label: "Téléphone", value: "+222 47 35 02 65" },
              { icon: MapPin, label: "Localisation", value: "Bababé, Mauritanie" }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-2 sm:gap-4 opacity-0 group hover:translate-y-[-10px] transition-all duration-300 cursor-pointer"
                  style={{
                    animation: `slide-up 0.8s ease-out forwards`,
                    animationDelay: `${idx * 200 + 200}ms`
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 text-red-400 group-hover:text-red-300 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-360 transition-transform duration-500" style={{ animation: `rotate-slow ${2 + idx}s linear infinite` }} />
                    <span className="text-xs sm:text-base font-bold uppercase tracking-widest">{item.label}</span>
                  </div>
                  <p className="text-base sm:text-xl font-medium break-all group-hover:text-white transition-colors">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
