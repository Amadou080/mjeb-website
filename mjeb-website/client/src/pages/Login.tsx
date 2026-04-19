import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Login() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      // Invalidate and refetch user data after successful login
      utils.auth.me.invalidate();
      toast.success("Connexion réussie");
      // Small delay to ensure cookie is set
      setTimeout(() => {
        window.location.href = "/admin";
      }, 100);
    },
    onError: (error) => {
      toast.error(error.message || "Échec de la connexion");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    // TEMPORAIRE: Utiliser le mot de passe comme code OAuth
    // TODO: Remplacer par OAuth réel
    loginMutation.mutate({ code: password, state: "admin" });
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full p-8 shadow-xl border-t-4 border-mjeb-orange bg-white">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-black uppercase text-primary">Administration</h1>
            <p className="page-muted mt-2 text-center font-medium">
              Veuillez entrer le mot de passe pour accéder au tableau de bord.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Mot de passe
              </label>
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full text-lg p-6"
              />
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending || !password}
              className="btn-mjeb-primary w-full py-6 text-lg disabled:opacity-50 disabled:pointer-events-none"
            >
              {loginMutation.isPending ? "Connexion..." : "Se Connecter"}
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
