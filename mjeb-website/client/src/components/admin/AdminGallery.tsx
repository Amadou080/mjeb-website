import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Image, Video } from "lucide-react";

import { trpc } from "@/lib/trpc";

export default function AdminGallery() {
  const { data: galleryItems = [], refetch } = trpc.gallery.list.useQuery();
  const createMutation = trpc.gallery.create.useMutation({ onSuccess: () => refetch() });
  const deleteMutation = trpc.gallery.delete.useMutation({ onSuccess: () => refetch() });
  const uploadMutation = trpc.uploadFile.useMutation();

  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    mediaType: "image" as "image" | "video",
  });

  const toBase64 = (f: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = e => reject(e);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Veuillez sélectionner un fichier media");
    
    const base64 = await toBase64(file);
    const res = await uploadMutation.mutateAsync({ filename: file.name, base64 });
    const payload = { ...formData, mediaUrl: res.url };
    
    await createMutation.mutateAsync(payload);
    
    setFormData({
      title: "",
      description: "",
      category: "",
      mediaType: "image",
    });
    setFile(null);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Supprimer ce média ?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const categories = [
    "Bababe Art",
    "Concert",
    "Bababé Clean",
    "Bababe GREEN",
    "Conférence",
    "Assemblée Générale",
    "Sensibilisation",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Gestion de la Galerie</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un Média
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Ajouter un nouveau média
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Type de média
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mediaType"
                    value="image"
                    checked={formData.mediaType === "image"}
                  onChange={(e) =>
                    setFormData({ ...formData, mediaType: e.target.value as "image" | "video" })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Photo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={formData.mediaType === "video"}
                    onChange={(e) =>
                      setFormData({ ...formData, mediaType: e.target.value as any })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Vidéo</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Fichier
              </label>
              <input
                type="file"
                accept={formData.mediaType === "image" ? "image/*" : "video/*"}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

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
                placeholder="Titre du média"
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
                placeholder="Description du média"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-primary text-primary-foreground">
                Télécharger
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Aucun média pour le moment</p>
          </div>
        ) : (
          galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border-0 shadow-lg group">
              <div className="relative w-full h-48 bg-muted">
                {(item.mediaType as string) === "image" ? (
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                    <Video className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-foreground line-clamp-1">
                  {item.title || "Sans titre"}
                </p>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
