import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2, Shield, User } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "editor",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save user
    console.log("User submitted:", formData);
    setFormData({
      name: "",
      email: "",
      role: "editor",
    });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement API call to delete user
    console.log("Delete user:", id);
  };

  const handleEdit = (user: any) => {
    setFormData(user);
    setEditingId(user.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Gestion des Utilisateurs</h2>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              name: "",
              email: "",
              role: "editor",
            });
          }}
          className="bg-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Utilisateur
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-xl font-bold text-foreground mb-6">
            {editingId ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
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
                placeholder="Nom de l'utilisateur"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Rôle
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="user">Utilisateur</option>
                <option value="editor">Éditeur</option>
                <option value="admin">Administrateur</option>
              </select>
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

      {/* Users List */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/10 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Rôle
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    Aucun utilisateur pour le moment
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-secondary/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{user.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : user.role === "editor"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {user.role === "admin" ? (
                          <>
                            <Shield className="w-3 h-3" />
                            Administrateur
                          </>
                        ) : user.role === "editor" ? (
                          <>
                            <Edit2 className="w-3 h-3" />
                            Éditeur
                          </>
                        ) : (
                          <>
                            <User className="w-3 h-3" />
                            Utilisateur
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(user.id)}
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
