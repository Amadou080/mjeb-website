import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Projets", href: "/projects" },
    { label: "Actualités", href: "/news" },
    { label: "Galerie", href: "/gallery" },
    { label: "Partenaires", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-[60]">
      {/* ── Main Navigation Bar ── */}
      <div
        className={`
          bg-mjeb-blue text-white transition-all duration-300
          ${isScrolled ? "shadow-xl shadow-black/20" : ""}
        `}
      >
        <div className="container flex items-center justify-between h-16 lg:h-[72px]">
          {/* ── Logo + Brand ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="bg-white p-1.5 rounded-md shadow-lg transition-transform group-hover:scale-105">
              <img
                src="/mjeb-logo.jpg"
                alt="MJEB Logo"
                className="h-9 lg:h-10 w-auto"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg lg:text-xl font-black tracking-tight uppercase">
                MJEB
              </span>
              <span className="text-[9px] lg:text-[10px] font-semibold text-white/60 uppercase tracking-wider mt-0.5 max-w-[180px]">
                Mouvement Des Jeunes Engagés de Bababé
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation (centered) ── */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto">
            {navItems.map((item) => {
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-3.5 py-2 text-[13px] font-bold uppercase tracking-wider transition-all duration-200
                    ${isActive
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                    }
                  `}
                >
                  {item.label}
                  {/* Active indicator line */}
                  <span
                    className={`
                      absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-red-500 transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isAuthenticated && user?.role === "admin" && (
              <Link
                href="/admin"
                className="hidden md:inline-flex items-center text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded transition-all"
              >
                Admin
              </Link>
            )}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:scale-[1.03] active:scale-95"
            >
              Nous Rejoindre
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      <div
        className={`
          lg:hidden fixed inset-0 z-50 transition-all duration-300
          ${isOpen ? "visible" : "invisible pointer-events-none"}
        `}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`
            absolute top-0 right-0 w-[85%] max-w-sm h-full bg-gradient-to-b from-blue-900 to-blue-950
            shadow-2xl transition-transform duration-300 ease-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="bg-white p-1 rounded">
                <img src="/mjeb-logo.jpg" alt="MJEB" className="h-7 w-auto" />
              </div>
              <span className="font-black text-white text-lg tracking-tight">MJEB</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col py-4 px-3 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
            {navItems.map((item, idx) => {
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 py-3.5 px-4 rounded-lg font-bold uppercase tracking-wider text-sm
                    transition-all duration-200
                    ${isActive
                      ? "bg-white/10 text-white border-l-2 border-red-500"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}

            {isAuthenticated && user?.role === "admin" && (
              <Link
                href="/admin"
                className="flex items-center gap-3 py-3.5 px-4 rounded-lg font-bold uppercase tracking-wider text-sm text-yellow-400/80 hover:text-yellow-400 hover:bg-white/5 transition-all mt-1 border-t border-white/5 pt-5"
                onClick={() => setIsOpen(false)}
              >
                Administration
              </Link>
            )}
          </nav>

          {/* Drawer Footer CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10 bg-blue-950/80 backdrop-blur">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest py-3.5 rounded text-sm transition-all shadow-lg active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              Nous Rejoindre
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
