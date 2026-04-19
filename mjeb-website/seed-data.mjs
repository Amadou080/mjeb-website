import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Données d'exemple pour les articles
const sampleArticles = [
  {
    title: "Festival Bababé Horizon 2026 - Lancement Officiel",
    slug: "festival-bababe-horizon-2026",
    description: "Découvrez le Festival Bababé Horizon, notre événement phare qui rassemble la communauté autour d'activités culturelles et éducatives.",
    content: `Le Festival Bababé Horizon est notre projet phare. C'est un événement culturel et éducatif sur 3 jours qui rassemble la communauté autour d'activités variées et inspirantes.

Activités du Festival :
- Plantation d'arbres
- Nettoyage de la ville
- Conférences éducatives
- Spectacles de théâtre
- Concerts et musique live

Dates : 26-28 septembre 2026
Lieu : Bababé, Brakna, Mauritanie

Nous vous invitons tous à participer à cet événement mémorable !`,
    published: true,
  },
  {
    title: "Initiative Bababé Clean - Nettoyage Communautaire",
    slug: "bababe-clean-initiative",
    description: "Le MJEB lance l'initiative Bababé Clean pour assainir et embellir notre communauté.",
    content: `L'initiative Bababé Clean est une campagne de nettoyage et d'assainissement lancée par le MJEB.

Objectifs :
- Nettoyer les rues et espaces publics
- Sensibiliser à l'hygiène et la propreté
- Créer une communauté plus saine
- Impliquer les jeunes dans l'action civique

Cette initiative a déjà impacté plus de 500 personnes et nettoyé 20 zones différentes de Bababé.`,
    published: true,
  },
  {
    title: "Projet Bababé GREEN - Reboisement Massif",
    slug: "bababe-green-project",
    description: "Le MJEB lance le projet Bababé GREEN pour verdir notre région et combattre le changement climatique.",
    content: `Le projet Bababé GREEN est notre initiative de verdissement et reboisement.

Activités :
- Plantations massives d'arbres
- Création de jardins communautaires
- Sensibilisation environnementale
- Suivi et maintenance des plantations

Depuis le lancement, nous avons planté plus de 5000 arbres et créé 10 jardins communautaires.`,
    published: true,
  },
];

// Données d'exemple pour les partenaires
const samplePartners = [
  {
    name: "ONG Environnement Mauritanie",
    description: "Organisation dédiée à la protection de l'environnement et au développement durable.",
    category: "ONG",
    website: "https://example.com",
  },
  {
    name: "Commune de Bababé",
    description: "Administration locale soutenant les initiatives communautaires.",
    category: "Gouvernement",
    website: "https://example.com",
  },
  {
    name: "Banque de Bababé",
    description: "Sponsor principal du Festival Bababé Horizon.",
    category: "Sponsor",
    website: "https://example.com",
  },
];

console.log("📊 Données d'exemple générées :");
console.log(`✓ ${sampleArticles.length} articles d'exemple`);
console.log(`✓ ${samplePartners.length} partenaires d'exemple`);
console.log("\n📁 Ressources disponibles :");
console.log("✓ Logo MJEB : mjeb logo.jpg");
console.log("✓ Photos : 620+ images dans 7 catégories");
console.log("✓ Documents : 2 rapports PDF");
