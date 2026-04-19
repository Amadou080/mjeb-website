import { ArrowRight, Droplet, Leaf, Music, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Project = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: LucideIcon;
  status: string;
  activities: string[];
  impact: string;
  detailedDescription: string;
  objectives: string[];
  context: string;
  results: string[];
  beneficiaries: string;
  resources: string;
  risks: string[];
  ctas: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Festival Bababé Horizons",
    subtitle: "Notre événement phare annuel",
    description:
      "Un événement culturel et éducatif de plusieurs jours rassemblant la communauté autour d'activités variées et inspirantes. Plantation d'arbres, nettoyage, conférences, spectacles de théâtre et concerts live.",
    image: "/gallery/fond (2).jpg",
    icon: Music,
    status: "Annuelle",
    activities: [
      "Plantation d'arbres",
      "Nettoyage de la ville",
      "Conférences éducatives",
      "Spectacles de théâtre",
      "Concerts et musique live"
    ],
    impact: "Rassemble 1000+ personnes chaque année",
    detailedDescription:
      "Festival Bababé Horizons est un festival pluridisciplinaire qui mobilise les jeunes autour de la culture locale et de la solidarité environnementale. Il vise à sensibiliser aux enjeux sociaux tout en dynamisant la vie culturelle de Bababé.",
    objectives: [
      "Créer un événement fédérateur alliant culture et engagement citoyen.",
      "Sensibiliser aux enjeux de l'éducation, de la santé et de l'environnement.",
      "Renforcer la cohésion sociale et l'identité locale."
    ],
    context:
      "Bababé manquait d'événements structurants pour la jeunesse. Le festival répond à ce besoin en s'appuyant sur la disponibilité des jeunes après la rentrée et en s'alignant sur les initiatives nationales de lutte contre la désertification.",
    results: [
      "500 participants attendus chaque soir",
      "300 arbres plantés",
      "10 stands d'artisans et d'artistes locaux",
      "50 bénévoles mobilisés pour la logistique"
    ],
    beneficiaries:
      "Jeunesse de Bababé, artistes locaux, grand public et écoles primaires bénéficient de la collecte et des activités. ",
    resources:
      "Scène et matériel audio, tentes/stands, sécurité, matériel de nettoyage, sponsors locaux et 50 bénévoles d'encadrement.",
    risks: [
      "Faible participation",
      "Intempéries",
      "Manque de fonds",
      "Problèmes de sécurité"
    ],
    ctas: [
      { label: "Participer au Festival", href: "/contact" },
      { label: "Faire un don", href: "/contact" }
    ]
  },
  {
    id: 2,
    title: "Bababé Clean",
    subtitle: "Initiative de nettoyage communautaire",
    description:
      "Une campagne de nettoyage et d'assainissement lancée pour embellir notre communauté. Nous nettoyons les rues, espaces publics et sensibilisons à l'hygiène.",
    image: "/gallery/Bababe Clean/bababe clean (11.jpg",
    icon: Droplet,
    status: "Annuelle",
    activities: [
      "Nettoyage des rues",
      "Assainissement des espaces publics",
      "Sensibilisation à l'hygiène",
       "Collecte et tri des déchets",
      "Gestion des déchets"
    ],
    impact: "500+ personnes impactées, plusieurs zones nettoyées",
    detailedDescription:
      "Le Mouvement des Jeunes Engagés de Bababé (MJEB) s’inscrit dans une démarche active de transformation sociale et environnementale à travers l’initiative Bababé Clean. Ce projet incarne notre volonté de mobiliser durablement la jeunesse autour d’actions concrètes visant à améliorer le cadre de vie des populations locales.\n\nAu-delà d’une simple journée de nettoyage, Bababé Clean représente un engagement citoyen structuré, fondé sur la participation communautaire, la sensibilisation et la responsabilisation des habitants. Le MJEB met en place une organisation rigoureuse incluant la mobilisation des bénévoles, la coordination avec les autorités locales, ainsi que la mise à disposition de ressources matérielles nécessaires pour garantir l’efficacité des interventions.\n\nNotre engagement repose également sur une vision à long terme : faire émerger une culture de propreté et de respect de l’environnement au sein de la communauté. À travers cette initiative, nous cherchons à créer un changement durable des comportements, en impliquant activement les jeunes, les commerçants et l’ensemble des citoyens dans la préservation de leur environnement.",
    objectives: [
      "Assainir les rues et espaces publics.",
      "Inculquer des gestes écocitoyens.",
      "Prévenir les maladies liées à l'insalubrité."
    ],
    context:
      "Bababé possède plusieurs points névralgiques souvent encombrés. La campagne est coordonnée avec la mairie pour fixer une date stratégique et tirer parti du relais institutionnel.",
    results: [
      "1 tonne de déchets ramassée",
      "5 sites nettoyés",
      "100 volontaires mobilisés"
    ],
    beneficiaries:
      "Citoyens de Bababé, commerçants et visiteurs bénéficient d'un environnement plus sain.",
    resources:
      "Gants, sacs poubelle, balais, camions de mairie, 30 encadrants bénévoles.",
    risks: [
      "Météo défavorable",
      "Faible mobilisation",
      "Déchets dangereux"
    ],
    ctas: [
      { label: "Participer au nettoyage", href: "/contact" },
      { label: "Soutenir l'action", href: "/contact" }
    ]
  },
  {
    id: 3,
    title: "Bababé GREEN",
    subtitle: "Projet de reboisement massif",
    description:
      "Notre initiative de verdissement et reboisement pour combattre le changement climatique. Nous plantons des arbres, créons des jardins communautaires et sensibilisons à l'environnement.",
    image: "/gallery/Bababe GREEN/bababe green  (16).jpg",
    icon: Leaf,
    status: "Actif",
    activities: [
      "Plantations massives d'arbres",
      "Création de jardins communautaires",
      "Sensibilisation environnementale",
      "Suivi et maintenance",
      "Éducation écologique"
    ],
    impact: "500+ arbres plantés, amélioration de la qualité de l'air",
    detailedDescription:
      "Bababé GREEN est un projet annuel de reboisement urbain visant à augmenter le couvert végétal, réduire l'érosion et rendre la ville plus respirable.",
    objectives: [
      "Améliorer le couvert végétal de Bababé.",
      "Lutter contre la désertification.",
      "Sensibiliser à la protection de l'environnement."
    ],
    context:
      "Bababé est situé en zone sahélienne et subit la pression climatique. Le projet est soutenu par le Délégué Régional de l'Environnement et s'inscrit dans les initiatives de reboisement locales.",
    results: [
      "300 plants d'arbres distribués",
      "Objectif de survie > 80% après 6 mois",
      "Suivi régulier assuré par un comité municipal"
    ],
    beneficiaries:
      "La population profite d'une meilleure qualité de l'air et d'un environnement plus vert.",
    resources:
      "300 plants autochtones, pelles, arrosoirs, animateurs et partenaires environnementaux.",
    risks: [
      "Mortalité des plants",
      "Vandalisme",
      "Conditions sèches extrêmes"
    ],
    ctas: [
      { label: "Planter avec nous", href: "/contact" },
      { label: "Faire un don vert", href: "/contact" }
    ]
  },
  {
    id: 4,
    title: "Bababe Art",
    subtitle: "Promotion des talents artistiques",
    description:
      "Un projet dédié à la promotion et valorisation des talents artistiques locaux. Nous organisons des expositions, ateliers et événements culturels.",
    image: "/gallery/Bababe Art/art (2).jpg",
    icon: Music,
    status: "Actif",
    activities: [
      "Expositions d'art",
      "Ateliers créatifs",
      "Événements culturels",
      "Mentorat artistique",
      "Promotion des talents"
    ],
    impact: "10+ artistes soutenus",
    detailedDescription:
      "Bababe Art met en valeur la créativité locale dans la musique, le graffiti et l'artisanat, tout en renforçant la fierté culturelle de Bababé.",
    objectives: [
      "Promouvoir l'expression artistique des jeunes.",
      "Valoriser les artistes locaux.",
      "Embellir l'espace urbain avec des messages de paix."
    ],
    context:
      "Bababé dispose d'un patrimoine musical riche mais peu d'événements structurés pour les artistes. Le projet s'appuie sur des partenariats culturels locaux.",
    results: [
      "15 artistes participants",
      "Fresque urbaine peinte en direct",
      "Concerts rassemblant plus de 300 personnes"
    ],
    beneficiaries:
      "Artistes, artisans et le public jeune bénéficient d'une visibilité et d'opportunités culturelles.",
    resources:
      "Peinture, instruments, scène légère, animateurs et partenaires culturels.",
    risks: [
      "Place insuffisante",
      "Pollution sonore",
      "Problèmes techniques"
    ],
    ctas: [
      { label: "Découvrir les artistes", href: "/gallery" },
      { label: "Contribuer à l'art", href: "/contact" }
    ]
  },
  {
    id: 5,
    title: "Conférences Éducatives",
    subtitle: "Sensibilisation et formation",
    description:
      "Des conférences régulières sur des sujets importants : éducation, environnement, santé, entrepreneuriat. Nous invitons des experts et créons des espaces de dialogue.",
    image: "/gallery/CONFERENCE/15.jpg",
    icon: Users,
    status: "Actif",
    activities: [
      "Conférences mensuelles",
      "Ateliers de formation",
      "Débats communautaires",
      "Partage de connaissances",
      "Mentorat"
    ],
    impact: "500+ participants par an",
    detailedDescription:
      "Les conférences éducatives offrent aux jeunes de Bababé des formations sur l'entrepreneuriat, la santé, l'environnement et les droits civiques.",
    objectives: [
      "Informer sur l'éducation et l'entrepreneuriat.",
      "Renforcer les compétences des jeunes.",
      "Créer des espaces de dialogue."
    ],
    context:
      "Le manque de repères professionnels et le décrochage scolaire en zone rurale justifient ces conférences, souvent organisées avec des ONG et des enseignants locaux.",
    results: [
      "4 ateliers par an",
      "100 participants par session",
      "Quiz pré/post formation pour mesure de l'impact"
    ],
    beneficiaries:
      "Jeunes de 12 à 25 ans, étudiants et apprentis, ainsi que des adultes en reconversion.",
    resources:
      "Salle équipée, conférenciers bénévoles, matériel audiovisuel et supports pédagogiques.",
    risks: [
      "Contenu inadapté",
      "Manque de participants",
      "Disponibilité des experts"
    ],
    ctas: [
      { label: "S'inscrire à une conférence", href: "/contact" },
      { label: "Participer / Donner", href: "/contact" }
    ]
  },
  {
    id: 6,
    title: "Sensibilisation Communautaire",
    subtitle: "Éducation et engagement",
    description:
      "Des campagnes de sensibilisation sur des enjeux sociaux, environnementaux et sanitaires. Nous travaillons à créer une communauté consciente et engagée.",
    image: "/gallery/sensibilisation/1.jpg",
    icon: Leaf,
    status: "Actif",
    activities: [
      "Campagnes de sensibilisation",
      "Distribution d'informations",
      "Ateliers communautaires",
      "Engagement des jeunes",
      "Changement comportemental"
    ],
    impact: "100+ personnes sensibilisées",
    detailedDescription:
      "Sensibilisation Communautaire comprend des campagnes sur la santé, l'environnement et les droits, destinées à informer et mobiliser toute la population.",
    objectives: [
      "Informer sur l'hygiène et la santé.",
      "Mobiliser la communauté autour d'enjeux environnementaux.",
      "Renforcer la cohésion sociale."
    ],
    context:
      "Les zones rurales et villages environnants manquent souvent d'accès à l'information sanitaire; ces campagnes complètent les efforts des dispensaires et écoles locales.",
    results: [
      "4 campagnes par an",
      "1000 personnes atteintes",
      "Haute participation via radio rurale et leaders locaux"
    ],
    beneficiaries:
      "Toute la population de Bababé, en particulier les groupes vulnérables comme les femmes enceintes et les personnes âgées.",
    resources:
      "Brochures, kakemonos, haut-parleurs, partenaires santé et leaders communautaires.",
    risks: [
      "Indifférence du public",
      "Résistance culturelle",
      "Couverture médiatique limitée"
    ],
    ctas: [
      { label: "Rejoignez la campagne", href: "/contact" },
      { label: "Faire un don", href: "/contact" }
    ]
  }
];
