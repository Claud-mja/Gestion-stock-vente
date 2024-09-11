export interface InventaireType {
    id: number;
    titre: string;
    remarque: string;
    responsable: string;
    etat: string;
}

export const InventaireData: InventaireType[] = [
    {
        id: 1,
        titre: "Inventaire A",
        remarque: "Remarque A",
        responsable: "Responsable A",
        etat: "Completed",
    },
    {
        id: 2,
        titre: "Inventaire B",
        remarque: "Remarque B",
        responsable: "Responsable B",
        etat: "Cancel",
    },
    {
        id: 3,
        titre: "Inventaire C",
        remarque: "Remarque C",
        responsable: "Responsable C",
        etat: "Pending",
    },
    {
        id: 4,
        titre: "Inventaire D",
        remarque: "Remarque D",
        responsable: "Responsable D",
        etat: "Pending",
    },
    {
        id: 5,
        titre: "Inventaire E",
        remarque: "Remarque E",
        responsable: "Responsable E",
        etat: "Cancel",
    },
];

export const paginateData: InventaireType[] = [
    {
        id: 1,
        titre: "Inventaire A",
        remarque: "Remarque A",
        responsable: "Responsable A",
        etat: "Pending",
    },
    {
        id: 2,
        titre: "Inventaire B",
        remarque: "Remarque B",
        responsable: "Responsable B",
        etat: "Completed",
    },
    {
        id: 3,
        titre: "Inventaire C",
        remarque: "Remarque C",
        responsable: "Responsable C",
        etat: "Completed",
    },
    {
        id: 4,
        titre: "Inventaire D",
        remarque: "Remarque D",
        responsable: "Responsable D",
        etat: "Pending",
    },
    {
        id: 5,
        titre: "Inventaire E",
        remarque: "Remarque E",
        responsable: "Responsable E",
        etat: "Cancel",
    },
];
