import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Lock } from "lucide-react";
import { Link } from "wouter";

export default function Login() {
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
              L'acces administrateur est temporairement desactive pour stabiliser la version publique.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Merci de revenir plus tard. La partie utilisateur du site reste disponible.
            </p>
            <Link
              href="/"
              className="btn-mjeb-primary w-full py-3 text-lg inline-flex justify-center"
            >
              Retour a l'accueil
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
