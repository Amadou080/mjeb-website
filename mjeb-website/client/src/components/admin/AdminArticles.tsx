import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AdminArticles() {
  const { data: articles = [], refetch } = trpc.articles.adminList.useQuery();
  const createMutation = trpc.articles.create.useMutation({ onSuccess: () => refetch() });
  const updateMutation = trpc.articles.update.useMutation({ onSuccess: () => refetch() });
  const deleteMutation = trpc.articles.delete.useMutation({ onSuccess: () => refetch() });

  const uploadMutation = trpc.uploadFile.useMutation();
  const [file, setFile] = useState<File | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    published: false,
    imageUrl: "",
  });

  const toBase64 = (f: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = e => reject(e);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = formData.imageUrl || "";
    
    if (file) {
      const base64 = await toBase64(file);
      const res = await uploadMutation.mutateAsync({ filename: file.name, base64 });
      imageUrl = res.url;
    }
    
    try {
      const payload = { ...formData, imageUrl };

      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: payload });
        toast.success("Actualité mise à jour");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Actualité créée avec succès");
      }
      setFormData({
        title: "",
        slug: "",
        description: "",
        content: "",
        published: false,
        imageUrl: "",
      });
      setFile(null);
      setShowForm(false);
    } catch (error: any) {
      console.error("Erreur lors de la publication:", error);
      toast.error(error.message || "Erreur lors de la publication de l'actualité");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleEdit = (article: any) => {
    setFormData({
      title: article.title || "",
      slug: article.slug || "",
      description: article.description || "",
      content: article.content || "",
      published: article.published || false,
      imageUrl: article.imageUrl || "",
    });
    setEditingId(article.id);
    setFile(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Gestion des Actualités</h2>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              title: "",
              slug: "",
              description: "",
              content: "",
              published: false,
              imageUrl: "",
            });
            setFile(null);
          }}
          className="bg-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Actualité
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-xl font-bold text-foreground mb-6">
            {editingId ? "Modifier l'actualité" : "Nouvelle actualité"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Titre
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Titre de l'actualité"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Slug
              </label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="slug-de-l-actualite"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Courte description"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Contenu
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Contenu complet de l'actualité"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Image (optionnel)
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full"
              />
              {file && (
                <p className="text-sm text-muted-foreground mt-1">
                  Fichier sélectionné: {file.name}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="published" className="text-sm font-semibold text-foreground">
                Publier cette actualité
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-primary text-primary-foreground">
                {editingId ? "Mettre à jour" : "Créer"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Articles List */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/10 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    Aucune actualité pour le moment
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="border-b border-border hover:bg-secondary/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{article.title}</p>
                      <p className="text-sm text-muted-foreground">{article.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {article.publishedAt && format(new Date(article.publishedAt), "d MMM yyyy", { locale: fr })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        article.published
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {article.published ? (
                          <>
                            <Eye className="w-3 h-3" />
                            Publié
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            Brouillon
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(article)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(article.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
