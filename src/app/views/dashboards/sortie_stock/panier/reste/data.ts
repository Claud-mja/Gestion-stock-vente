export interface ResteType {
    id: number;
    idClient: number;
    dtLivraison: Date;
    admin: string;
    pannierType: string;
    client: string;
    etat: string;
    montant: number;
    verser: number;
    reste: number;
    nbrArticle: number;
}

export const ResteData: ResteType[] = [
    {
        id: 1,
        idClient: 1001,
        dtLivraison: new Date('2024-09-01'),
        admin: 'Admin1',
        pannierType: 'Pannier A',
        client: 'Client A',
        etat: 'En attente',
        montant: 5000,
        verser: 2000,
        reste: 3000,
        nbrArticle: 10
    },
    {
        id: 2,
        idClient: 1002,
        dtLivraison: new Date('2024-09-02'),
        admin: 'Admin2',
        pannierType: 'Pannier B',
        client: 'Client B',
        etat: 'Livré',
        montant: 8000,
        verser: 8000,
        reste: 0,
        nbrArticle: 20
    },
    {
        id: 3,
        idClient: 1003,
        dtLivraison: new Date('2024-09-03'),
        admin: 'Admin3',
        pannierType: 'Pannier C',
        client: 'Client C',
        etat: 'Partiellement payé',
        montant: 6000,
        verser: 4000,
        reste: 2000,
        nbrArticle: 15
    }
];

export const paginateData: ResteType[] = [
    {
        id: 1,
        idClient: 1001,
        dtLivraison: new Date('2024-09-01'),
        admin: 'Admin1',
        pannierType: 'Pannier A',
        client: 'Client A',
        etat: 'En attente',
        montant: 5000,
        verser: 2000,
        reste: 3000,
        nbrArticle: 10
    },
    {
        id: 2,
        idClient: 1002,
        dtLivraison: new Date('2024-09-02'),
        admin: 'Admin2',
        pannierType: 'Pannier B',
        client: 'Client B',
        etat: 'Livré',
        montant: 8000,
        verser: 8000,
        reste: 0,
        nbrArticle: 20
    },
    {
        id: 3,
        idClient: 1003,
        dtLivraison: new Date('2024-09-03'),
        admin: 'Admin3',
        pannierType: 'Pannier C',
        client: 'Client C',
        etat: 'Partiellement payé',
        montant: 6000,
        verser: 4000,
        reste: 2000,
        nbrArticle: 15
    }
];