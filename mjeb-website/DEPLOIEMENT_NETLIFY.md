# 🚀 Guide de Déploiement Frontend sur Netlify

## ✅ Prérequis

1. **Compte Netlify** : https://netlify.com (gratuit)
2. **Git** : Repository GitHub, GitLab ou Bitbucket
3. **Dépendances installées** : `pnpm i`

## 📋 Étapes de déploiement

### 1. Préparation du projet

```bash
# Vérifier que le build fonctionne localement
pnpm build

# Vérifier que dist/client est bien généré
ls dist/client/
```

### 2. Créer le repository Git

```bash
cd mjeb-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-utilisateur/mjeb-website.git
git push -u origin main
```

### 3. Connecter à Netlify

**Option A : Via l'interface Netlify (Recommandé)**

1. Aller sur https://app.netlify.com
2. Cliquer sur "New site from Git"
3. Choisir votre fournisseur (GitHub, GitLab, Bitbucket)
4. Sélectionner le repository `mjeb-website`
5. Les paramètres de build sont automatiquement détectés depuis `netlify.toml`

**Option B : Via la CLI Netlify**

```bash
npm install -g netlify-cli
netlify login
netlify init
```

### 4. Configurer les variables d'environnement sur Netlify

1. Aller dans **Settings → Build & Deploy → Environment**
2. Ajouter ces variables :

```
VITE_API_URL=https://votre-api-midjourney.com
OPENAI_API_KEY=sk-...
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET_NAME=...
```

⚠️ **Important** : Ne jamais commiter le `.env` avec les vrais secrets !

### 5. Déclencher le déploiement

- **Automatique** : Chaque push sur `main` déclenche un build
- **Manuel** : Depuis Netlify Dashboard → Trigger deploy

## 🔗 Configuration du Backend API

Votre frontend sur Netlify aura besoin de communiquer avec votre API Express.

### Options pour le backend :

**🟢 Railway** (Recommandé - gratuit, facile)
- https://railway.app
- Deploy depuis Git en 2 clics
- Inclut une BD PostgreSQL gratuite

**🟦 Render** (Gratuit + Pro)
- https://render.com
- Blue/green deploys gratuits

**🔵 Vercel** (Gratuit + Pro)
- https://vercel.com
- Serverless functions Node.js

### Exemple avec Railway :

1. Créer un nouveau projet Railway
2. Connecter ce GitHub repository
3. Ajouter une base de données PostgreSQL
4. Déployer le backend

Puis mettez à jour `VITE_API_URL` sur Netlify vers l'URL Railway.

## 🧪 Vérifier le déploiement

```bash
# Après le déploiement, tester l'API
curl https://votre-site-netlify.netlify.app/

# Vérifier les logs
netlify logs
```

## 🐛 Troubleshooting

### Erreur : "dist/client not found"
- Vérifier que `vite build` génère bien `dist/client`
- Vérifier la config dans `vite.config.ts`

### Erreur : CORS depuis Netlify vers API
- Ajouter l'URL Netlify dans `server/_core/index.ts` section CORS
- URL format: `https://votre-site.netlify.app`

### Erreur : 404 sur les routes React
- Le fichier `netlify.toml` contient déjà les redirects
- Vérifier que c'est bien déployé

### Erreur : Variables d'env non trouvées
- Vérifier les noms dans Netlify Dashboard
- Préfixe `VITE_` pour les variables accessibles au client
- Redéployer après ajout de variables

## 📞 Support

- Docs Netlify : https://docs.netlify.com
- Netlify Community : https://community.netlify.com
