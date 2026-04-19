import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import AdminArticles from "@/components/admin/AdminArticles";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminPartners from "@/components/admin/AdminPartners";
import AdminUsers from "@/components/admin/AdminUsers";
import { FileText, Image, Users, Building2 } from "lucide-react";

type AdminTab = "articles" | "gallery" | "partners" | "users";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("articles");

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    // Not authenticated, redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  // This block is now handled earlier with redirect; keep for fallback UI if needed
  if (user && user.role !== "admin" && user.role !== "editor") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Accès Refusé
            </h1>
            <p className="text-sm text-muted-foreground">
              Vous n'avez pas les permissions nécessaires pour accéder au tableau de bord administrateur.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.name || "Administrateur"}. Gérez le contenu du site MJEB ici.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-border pb-4">
          <button
            onClick={() => setActiveTab("articles")}
            className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors ${
              activeTab === "articles"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/10 text-foreground hover:bg-secondary/20"
            }`}
          >
            <FileText className="w-4 h-4" />
            Actualités
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors ${
              activeTab === "gallery"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/10 text-foreground hover:bg-secondary/20"
            }`}
          >
            <Image className="w-4 h-4" />
            Galerie
          </button>
          <button
            onClick={() => setActiveTab("partners")}
            className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors ${
              activeTab === "partners"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/10 text-foreground hover:bg-secondary/20"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Partenaires
          </button>
          {user?.role === "admin" && (
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors ${
                activeTab === "users"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/10 text-foreground hover:bg-secondary/20"
              }`}
            >
              <Users className="w-4 h-4" />
              Utilisateurs
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "articles" && <AdminArticles />}
          {activeTab === "gallery" && <AdminGallery />}
          {activeTab === "partners" && <AdminPartners />}
          {activeTab === "users" && user?.role === "admin" && <AdminUsers />}
        </div>
      </div>
    </DashboardLayout>
  );
}
