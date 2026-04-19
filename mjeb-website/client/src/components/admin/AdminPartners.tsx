import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2 } from "lucide-react";

import { trpc } from "@/lib/trpc";

export default function AdminPartners() {
  const { data: partners = [], refetch } = trpc.partners.list.useQuery();
  const createMutation = trpc.partners.create.useMutation({ onSuccess: () => refetch() });
  const updateMutation = trpc.partners.update.useMutation({ onSuccess: () => refetch() });
  const deleteMutation = trpc.partners.delete.useMutation({ onSuccess: () => refetch() });
  const uploadMutation = trpc.uploadFile.useMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    website: "",
    logoUrl: "",
  });

  const toBase64 = (f: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = e => reject(e);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let logoUrl = formData.logoUrl;
    if (file) {
      const base64 = await toBase64(file);
      const res = await uploadMutation.mutateAsync({ filename: file.name, base64 });
      logoUrl = res.url;
    }
    const payload = { ...formData, logoUrl };
    
    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    
    setFormData({ name: "", description: "", category: "", website: "", logoUrl: "" });
    setFile(null);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Supprimer ce partenaire ?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleEdit = (partner: any) => {
    setFormData({
      name: partner.name || "",
      description: partner.description || "",
      category: partner.category || "",
      website: partner.website || "",
      logoUrl: partner.logoUrl || "",
    });
    setEditingId(partner.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Gestion des Partenaires</h2>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              name: "",
              description: "",
              category: "",
              website: "",
            });
          }}
          className="bg-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Partenaire
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-xl font-bold text-foreground mb-6">
            {editingId ? "Modifier le partenaire" : "Nouveau partenaire"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Nom
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nom de l'organisation"
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
                placeholder="Description du partenaire"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Catégorie
              </label>
              <Input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="ONG, Sponsor, Partenaire, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Site web
              </label>
              <Input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
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

      {/* Partners List */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/10 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Site web
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {partners.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    Aucun partenaire pour le moment
                  </td>
                </tr>
              ) : (
                partners.map((partner) => (
                  <tr key={partner.id} className="border-b border-border hover:bg-secondary/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{partner.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {partner.category}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {partner.website && (
                        <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-80">
                          Visiter
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(partner)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(partner.id)}
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
