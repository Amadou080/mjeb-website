# MJEB Website - Guide de Développement

## 🚀 Démarrage Rapide

### 1. Configuration de l'Environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env avec vos valeurs
nano .env
```

### 2. Base de Données PostgreSQL

#### Option A: Docker (Recommandé pour le développement)

```bash
# Démarrer PostgreSQL et pgAdmin
docker-compose up -d

# La base de données sera disponible sur:
# - PostgreSQL: localhost:5432
# - pgAdmin: http://localhost:8080 (admin@mjeb.org / admin123)
```

#### Option B: PostgreSQL Local/Nuage

Modifiez `.env` avec votre URL de base de données :
```bash
DATABASE_URL=postgresql://username:password@host:port/database
```

### 3. Installation et Migration

```bash
# Installer les dépendances
pnpm install

# Générer et appliquer les migrations
pnpm run db:generate
pnpm run db:push

# (Optionnel) Migrer depuis SQLite existant
pnpm run db:migrate-to-postgres

# (Optionnel) Ouvrir Drizzle Studio
pnpm run db:studio
```

### 4. Démarrage du Serveur

```bash
# Mode développement
pnpm run dev

# Le serveur sera disponible sur http://localhost:3002
```

## 📊 Gestion de la Base de Données

### Commandes Disponibles

```bash
# Générer les migrations
pnpm run db:generate

# Appliquer les migrations
pnpm run db:push

# Ouvrir l'interface Drizzle Studio
pnpm run db:studio

# Migrer depuis SQLite
pnpm run db:migrate-to-postgres
```

### Accès pgAdmin

- URL: http://localhost:8080
- Email: admin@mjeb.org
- Mot de passe: admin123

## 🔐 Variables d'Environnement Requises

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_APP_ID` | ID de l'application OAuth | `your_oauth_app_id` |
| `JWT_SECRET` | Secret pour les JWT (32+ caractères) | `your_super_secret_jwt_key` |
| `DATABASE_URL` | URL PostgreSQL | `postgresql://user:pass@localhost:5432/mjeb` |
| `OAUTH_SERVER_URL` | URL du serveur OAuth | `https://oauth.example.com` |
| `OWNER_OPEN_ID` | OpenID du propriétaire | `your_openid` |

## 🏗️ Architecture

- **Frontend**: React 19 + Vite + TailwindCSS + Radix UI
- **Backend**: Express + tRPC + TypeScript
- **Base de données**: PostgreSQL + Drizzle ORM
- **Authentification**: JWT + OAuth (à implémenter)
- **Déploiement**: Docker + Node.js

## 🚀 Déploiement en Production

### Prérequis

1. ✅ Variables d'environnement configurées
2. ✅ Base de données PostgreSQL accessible
3. ✅ OAuth configuré (remplacer la logique temporaire)
4. ✅ Tests passant
5. ✅ Health check endpoint fonctionnel

### Commandes de Déploiement

```bash
# Build pour la production
pnpm run build

# Démarrer en mode production
pnpm run start
```

### Services de Déploiement Recommandés

- **Vercel**: Pour le frontend statique
- **Railway/Render**: Pour l'API Node.js
- **Supabase**: Pour PostgreSQL managé
- **Cloudflare**: Pour le CDN et la sécurité

## 🔧 Dépannage

### Erreur de Connexion Base de Données

```bash
# Vérifier que PostgreSQL fonctionne
docker-compose ps

# Vérifier les logs
docker-compose logs postgres

# Tester la connexion
psql postgresql://mjeb_user:mjeb_password@localhost:5432/mjeb -c "SELECT 1;"
```

### Erreur de Variables d'Environnement

Le serveur refuse de démarrer si des variables requises sont manquantes. Vérifiez :

```bash
# Lister les variables définies
printenv | grep -E "(VITE_APP_ID|JWT_SECRET|DATABASE_URL|OAUTH_SERVER_URL|OWNER_OPEN_ID)"
```

### Migration depuis SQLite

Si vous aviez des données dans SQLite :

```bash
# S'assurer que .env pointe vers PostgreSQL
# Puis migrer
pnpm run db:migrate-to-postgres
```

## 📞 Support

Pour des problèmes spécifiques, vérifiez :
1. Les logs du serveur (`console.log`)
2. Les erreurs TypeScript (`pnpm run check`)
3. La configuration Docker (`docker-compose logs`)

---

**MJEB - Mouvement des Jeunes Engagés de Bababé**