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
    image: "/gallery/CONCERT/cons  (63).jpg",
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
    image: "/gallery/Bababe Clean/bababe clean  (1).jpg",
    icon: Droplet,
    status: "Annuelle",
    activities: [
      "Nettoyage des rues",
      "Assainissement des espaces publics",
      "Sensibilisation à l'hygiène",
      "Création de jardins propres",
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
      "La ville de Bababé fait face à des défis récurrents liés à la gestion des déchets et à l’insalubrité dans certains espaces publics stratégiques. Les zones à forte fréquentation, telles que les marchés, les abords des écoles, les centres de santé et certains quartiers résidentiels, sont souvent confrontées à une accumulation de déchets, exposant ainsi la population à des risques sanitaires importants.\n\nFace à ce constat, le projet Bababé Clean a été conçu comme une réponse adaptée aux réalités locales, en s’appuyant sur une approche participative et collaborative. L’objectif est non seulement de nettoyer ces espaces, mais aussi de sensibiliser la population aux conséquences de l’insalubrité sur la santé publique, notamment en termes de propagation de maladies.\n\nLa mise en œuvre de ce projet se fait en étroite collaboration avec les autorités municipales, permettant ainsi de renforcer l’impact des actions à travers un appui institutionnel et logistique. Cette synergie entre acteurs communautaires et institutions locales constitue un levier essentiel pour assurer la réussite et la pérennité des initiatives.",
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
    image: "/gallery/Bababe GREEN/bababe green  (1).jpg",
    icon: Leaf,
    status: "Actif",
    activities: [
      "Plantations massives d'arbres",
      "Création de jardins communautaires",
      "Sensibilisation environnementale",
      "Suivi et maintenance",
      "Éducation écologique"
    ],
    impact: "5000+ arbres plantés, 10 jardins créés",
    detailedDescription:
      "Le Mouvement des Jeunes Engagés de Bababé (MJEB) porte, à travers le projet Bababé GREEN, une vision durable de transformation environnementale de la ville. Cette initiative annuelle de reboisement urbain s’inscrit dans une dynamique proactive visant à restaurer l’équilibre écologique local et à améliorer les conditions de vie des populations.\n\nAu-delà de la simple plantation d’arbres, Bababé GREEN représente un engagement structuré en faveur de la lutte contre la dégradation environnementale. Le MJEB mobilise des jeunes bénévoles, des partenaires institutionnels et des acteurs communautaires autour d’actions concrètes de reboisement, tout en intégrant des activités de sensibilisation sur l’importance des espaces verts.\n\nNotre engagement repose également sur la durabilité des actions entreprises. Ainsi, une attention particulière est accordée au choix d’espèces adaptées au climat sahélien, à la formation des participants aux techniques de plantation et d’entretien, ainsi qu’au suivi des arbres plantés. À travers ce projet, le MJEB ambitionne de créer une culture écologique forte et de faire de chaque citoyen un acteur engagé dans la préservation de son environnement.",
    objectives: [
      "Améliorer le couvert végétal de Bababé.",
      "Lutter contre la désertification.",
      "Sensibiliser à la protection de l'environnement."
    ],
    context:
      "🌍 La ville de Bababé, à l’image de nombreuses localités sahéliennes, est confrontée aux effets du changement climatique, notamment la désertification, la dégradation des sols et la rareté des espaces verts. Ces phénomènes ont des conséquences directes sur le cadre de vie des populations, notamment en termes de hausse des températures, de dégradation de la qualité de l’air et de vulnérabilité environnementale.\n\nFace à ces défis, le projet Bababé GREEN a été conçu comme une réponse concrète et adaptée aux réalités locales. L’augmentation du couvert végétal apparaît comme une solution essentielle pour améliorer le microclimat urbain, limiter l’érosion des sols et offrir des espaces de vie plus sains et plus agréables aux habitants.\n\nPar ailleurs, ce projet vise à sensibiliser la population, en particulier les jeunes, à l’importance de la protection de l’environnement. En impliquant directement la communauté dans les actions de plantation, le MJEB favorise une appropriation collective des enjeux écologiques et encourage des comportements responsables à long terme.\n\nEn initiant Bababé GREEN, le MJEB ne se limite pas à planter des arbres : il contribue à construire un avenir plus durable, résilient et harmonieux pour l’ensemble de la communauté.",
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
    detailedDescription: `Notre engagement sur ce projet

Le Mouvement des Jeunes Engagés de Bababé (MJEB) s’inscrit, à travers le projet Bababé ART, dans une vision ambitieuse où la culture et l’expression artistique deviennent des moteurs essentiels du développement social, de l’éducation citoyenne et de la transformation urbaine. Conscient du potentiel immense de la jeunesse locale, le MJEB œuvre à créer un cadre structuré et inclusif permettant aux jeunes de s’exprimer librement, de valoriser leurs talents et de participer activement à la construction d’une identité collective forte.

Bababé ART dépasse largement le cadre d’un simple projet culturel. Il constitue un véritable espace d’engagement, où l’art est utilisé comme un langage universel pour transmettre des messages puissants liés à l’environnement, à la paix, à la solidarité, à l’histoire locale et aux défis contemporains. À travers des initiatives telles que la réalisation de fresques murales, l’organisation de concerts, les ateliers de création artistique et les performances urbaines, le MJEB transforme les espaces publics en lieux vivants de dialogue, de réflexion et d’inspiration.

L’engagement du MJEB dans ce projet repose sur une approche participative et durable. Les jeunes artistes ne sont pas seulement des exécutants, mais de véritables acteurs du changement, impliqués dans la conception, la réalisation et la diffusion des œuvres. Cette démarche favorise le développement de compétences artistiques, renforce la confiance en soi et encourage l’esprit d’initiative chez les jeunes.

Par ailleurs, Bababé ART contribue activement à l’embellissement de la ville en redonnant vie à des espaces parfois négligés. Les murs deviennent des supports d’expression porteurs de sens, transformant l’environnement urbain en un véritable musée à ciel ouvert. Cette transformation visuelle participe à renforcer le sentiment de fierté et d’appartenance des habitants, tout en créant une identité culturelle forte et reconnaissable pour Bababé.

Enfin, à travers ce projet, le MJEB ambitionne de structurer progressivement un écosystème culturel local durable, capable de soutenir les jeunes talents sur le long terme, de favoriser les échanges artistiques et de positionner Bababé comme un pôle émergent de créativité et d’innovation culturelle.`,
    objectives: [
      "Promouvoir l'expression artistique des jeunes.",
      "Valoriser les artistes locaux.",
      "Embellir l'espace urbain avec des messages de paix."
    ],
    context: `Pourquoi ce projet ?

La mise en place du projet Bababé ART trouve son origine dans plusieurs constats majeurs liés à la situation de la jeunesse et à la place de la culture dans la ville. Malgré un potentiel artistique riche et diversifié, de nombreux jeunes talents de Bababé évoluent dans un environnement où les opportunités d’expression, de formation et de valorisation restent limitées. Ce manque d’encadrement et de visibilité peut freiner le développement personnel des jeunes et limiter leur contribution positive à la société.

En parallèle, les espaces publics de la ville, bien qu’essentiels à la vie communautaire, manquent souvent de dynamisme visuel et d’identité culturelle forte. Dans un contexte où la jeunesse constitue une part importante de la population, il devient essentiel de créer des initiatives capables de canaliser cette énergie vers des actions constructives, créatives et porteuses de sens.

C’est dans cette perspective que Bababé ART a été conçu comme une réponse innovante et inclusive. En utilisant l’art comme outil d’intervention sociale, le MJEB cherche à offrir aux jeunes une alternative positive, leur permettant d’exprimer leurs idées, leurs émotions et leurs aspirations à travers des formes artistiques accessibles et impactantes.

Le projet répond également à un besoin de sensibilisation communautaire. Les œuvres réalisées ne sont pas uniquement esthétiques, elles véhiculent des messages éducatifs et sociaux visant à éveiller les consciences sur des thématiques importantes telles que la protection de l’environnement, la cohésion sociale, la paix et le respect des valeurs culturelles. Ainsi, l’art devient un moyen puissant de communication et d’éducation informelle au sein de la communauté.

En impliquant directement les jeunes, les artistes locaux et les habitants dans la réalisation des activités, le MJEB favorise une appropriation collective du projet. Cette dynamique participative renforce les liens sociaux, encourage le dialogue intergénérationnel et contribue à bâtir une communauté plus unie et résiliente.

En initiant Bababé ART, le MJEB affirme avec force que la culture et la créativité ne sont pas des éléments secondaires, mais des piliers fondamentaux du développement. Ce projet incarne une vision où l’art devient un outil de transformation durable, capable d’inspirer, de rassembler et de donner une nouvelle image à la ville de Bababé.`,
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
    impact: "1000+ personnes sensibilisées",
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
