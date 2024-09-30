export interface SimulationType {
    id: number;
    nom: string;
    dateSimulation: Date;
    remarque: string;
    etat : string;
}

export interface LivraisonType {
    id : number;
    titre : string;
    livreur : string;
    direction : string;
    date_creation : Date;
    status : string;
}

export const SimulationData: SimulationType[] = [
    {
        id: 1,
        nom: "Simulation A",
        dateSimulation: new Date("2024-01-15"),
        remarque: "Première simulation pour évaluer les performances.",
        etat: "En cours"
    },
    {
        id: 2,
        nom: "Simulation B",
        dateSimulation: new Date("2024-02-10"),
        remarque: "Simulation de test pour le scénario B.",
        etat: "Terminée"
    },
    {
        id: 3,
        nom: "Simulation C",
        dateSimulation: new Date("2024-03-05"),
        remarque: "Analyse des résultats pour le modèle C.",
        etat: "En attente"
    },
    {
        id: 4,
        nom: "Simulation D",
        dateSimulation: new Date("2024-04-20"),
        remarque: "Simulation avancée avec des paramètres ajustés.",
        etat: "Annulée"
    },
    {
        id: 5,
        nom: "Simulation E",
        dateSimulation: new Date("2024-05-30"),
        remarque: "Revue des résultats pour optimiser les performances.",
        etat: "Complète"
    }
];


export const LivraisonData: LivraisonType[] = [
    {
      id: 1,
      titre: 'Livraison de Matériaux de Construction',
      livreur: 'Jean Mickael',
      direction: 'Chantier Rue de la Paix, Paris',
      date_creation: new Date('2024-09-15'),
      status: 'en cours',
    },
    {
      id: 2,
      titre: 'Livraison d\'Équipements Électroniques',
      livreur: 'Patrick Rousseau',
      direction: 'Tech Park, Lyon',
      date_creation: new Date('2024-09-10'),
      status: 'livrée',
    },
    {
      id: 3,
      titre: 'Livraison de Produits Alimentaires',
      livreur: 'Jordan',
      direction: 'Supermarché Carrefour, Marseille',
      date_creation: new Date('2024-09-12'),
      status: 'annulée',
    },
    {
      id: 4,
      titre: 'Livraison de Meubles',
      livreur: 'Gregory',
      direction: 'Résidence BelleVue, Nice',
      date_creation: new Date('2024-09-13'),
      status: 'en cours',
    },
    {
      id: 5,
      titre: 'Livraison de Matériel Médical',
      livreur: 'Livan',
      direction: 'Hôpital Central, Bordeaux',
      date_creation: new Date('2024-09-11'),
      status: 'livrée',
    },
  ];
  