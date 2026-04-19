import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mx-4 shadow-lg border border-border bg-card">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-red-600" />
            </div>
          </div>

          <h1 className="text-4xl font-black text-primary mb-2">404</h1>

          <h2 className="text-xl font-black uppercase text-primary mb-4">
            Page introuvable
          </h2>

          <p className="page-muted mb-8 leading-relaxed font-medium">
            La page demandée n&apos;existe pas ou a été déplacée.
          </p>

          <div
            id="not-found-button-group"
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              type="button"
              onClick={handleGoHome}
              className="btn-mjeb-cta-blue"
            >
              <Home className="w-4 h-4" />
              Retour à l&apos;accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
