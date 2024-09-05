export interface PayeType {
    id: number;
    idPannierType: number;
    idCaisse: number;
    dateCommande: string;
    dateAjout: string;
    remarque: string;
    admin: string;
    pannierType: string;
    client: string;
    montantReste: number;
    montantVerser: number;
    montantTotal: number;
}


export const PayeData: PayeType[] = [
    {
        id: 1,
        idPannierType: 101,
        idCaisse: 201,
        dateCommande: '2023-09-01',
        dateAjout: '2023-09-02',
        remarque: 'Première commande',
        admin: 'Admin1',
        pannierType: 'Pannier Standard',
        client: 'Client1',
        montantReste: 100.00,
        montantVerser: 200.00,
        montantTotal: 300.00
    },
    {
        id: 2,
        idPannierType: 102,
        idCaisse: 202,
        dateCommande: '2023-09-03',
        dateAjout: '2023-09-04',
        remarque: 'Commande express',
        admin: 'Admin2',
        pannierType: 'Pannier Premium',
        client: 'Client2',
        montantReste: 50.00,
        montantVerser: 150.00,
        montantTotal: 200.00
    },
    {
        id: 3,
        idPannierType: 103,
        idCaisse: 203,
        dateCommande: '2023-09-05',
        dateAjout: '2023-09-06',
        remarque: 'Livraison prioritaire',
        admin: 'Admin3',
        pannierType: 'Pannier Express',
        client: 'Client3',
        montantReste: 75.00,
        montantVerser: 225.00,
        montantTotal: 300.00
    }
];

export const paginateData: PayeType[] = [
    {
        id: 1,
        idPannierType: 101,
        idCaisse: 201,
        dateCommande: '2023-09-01',
        dateAjout: '2023-09-02',
        remarque: 'Première commande',
        admin: 'Admin1',
        pannierType: 'Pannier Standard',
        client: 'Client1',
        montantReste: 100.00,
        montantVerser: 200.00,
        montantTotal: 300.00
    },
    {
        id: 2,
        idPannierType: 102,
        idCaisse: 202,
        dateCommande: '2023-09-03',
        dateAjout: '2023-09-04',
        remarque: 'Commande express',
        admin: 'Admin2',
        pannierType: 'Pannier Premium',
        client: 'Client2',
        montantReste: 50.00,
        montantVerser: 150.00,
        montantTotal: 200.00
    },
    {
        id: 3,
        idPannierType: 103,
        idCaisse: 203,
        dateCommande: '2023-09-05',
        dateAjout: '2023-09-06',
        remarque: 'Livraison prioritaire',
        admin: 'Admin3',
        pannierType: 'Pannier Express',
        client: 'Client3',
        montantReste: 75.00,
        montantVerser: 225.00,
        montantTotal: 300.00
    }
    // Continue adding more entries as needed
];
