export interface SimulationType {
    id: number;
    nom: string;
    dateSimulation: Date;
    remarque: string;
    etat : string;
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
