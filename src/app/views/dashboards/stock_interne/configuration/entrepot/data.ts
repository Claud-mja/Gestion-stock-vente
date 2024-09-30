export interface EntrepotType {
    id: string;
    nom: string;
    valeur: string;
}

export const EntrepotData: EntrepotType[] = [
    {
        id: "D001",
        nom: 'Centrale',
        valeur: ''
    },
    {
        id:"D002",
        nom: 'Analakely',
        valeur: 'Petite vitesse'
    },
    {
        id: "D004",
        nom: 'Ambohipo',
        valeur: 'Jazz pub'
    },
];

export const paginateData: EntrepotType[] = [
    ...EntrepotData
];
