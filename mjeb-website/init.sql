-- Initialisation de la base de données MJEB
-- Ce fichier est exécuté automatiquement lors du premier démarrage du conteneur PostgreSQL

-- Créer un utilisateur admin par défaut (pour le développement)
INSERT INTO users (openid, name, email, role, "createdAt", "updatedAt", "lastSignedIn")
VALUES ('admin-user-openid', 'MJEB Admin', 'admin@mjeb.org', 'admin', NOW(), NOW(), NOW())
ON CONFLICT (openid) DO NOTHING;

-- Insérer quelques articles d'exemple
INSERT INTO articles (title, slug, description, content, published, "createdAt", "updatedAt")
VALUES
  ('Bienvenue sur le site MJEB', 'bienvenue-mjeb', 'Découvrez le Mouvement des Jeunes Engagés de Bababé', 'Le MJEB est une organisation dédiée au développement durable de Bababé...', true, NOW(), NOW()),
  ('Projet Horizon 2026', 'projet-horizon-2026', 'Notre vision pour l''avenir de Bababé', 'Le projet Horizon 2026 vise à transformer Bababé en un modèle de développement durable...', true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insérer quelques partenaires d'exemple
INSERT INTO partners (name, description, category, website, "createdAt", "updatedAt")
VALUES
  ('Ministère de l''Environnement', 'Partenaire institutionnel pour le développement durable', 'Institutionnel', 'https://environnement.mr', NOW(), NOW()),
  ('ONG Développement Local', 'Association locale de développement', 'ONG', 'https://devlocal.mr', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;