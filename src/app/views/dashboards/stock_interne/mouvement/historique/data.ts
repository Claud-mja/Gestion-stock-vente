export interface HistoryType {
    id: number;
    idProduit: number;
    produit: string;
    quantite: number;
    pu: number; 
    montant: number;
    dateMvt: Date;
    ref: string;
    mode: string;
    etat: string;
    mvt: string;
  }
  
  export const HistoryData: HistoryType[] = [
    {
      id: 1,
      idProduit: 101,
      produit: 'Produit A',
      quantite: 10,
      pu: 1500,
      montant: 15000,
      dateMvt: new Date('2024-09-01'),
      ref: 'REF001',
      mode: 'Achat',
      etat: 'Terminé',
      mvt: 'Entrée'
    },
    {
      id: 2,
      idProduit: 102,
      produit: 'Produit B',
      quantite: 5,
      pu: 2000,
      montant: 10000,
      dateMvt: new Date('2024-09-02'),
      ref: 'REF002',
      mode: 'Vente',
      etat: 'En cours',
      mvt: 'Sortie'
    },
    {
      id: 3,
      idProduit: 103,
      produit: 'Produit C',
      quantite: 20,
      pu: 750,
      montant: 15000,
      dateMvt: new Date('2024-09-03'),
      ref: 'REF003',
      mode: 'Achat',
      etat: 'Terminé',
      mvt: 'Entrée'
    },
    {
      id: 4,
      idProduit: 104,
      produit: 'Produit D',
      quantite: 8,
      pu: 3000,
      montant: 24000,
      dateMvt: new Date('2024-09-04'),
      ref: 'REF004',
      mode: 'Vente',
      etat: 'Terminé',
      mvt: 'Sortie'
    },
    // Add more records as needed
  ];


  export const paginateData: HistoryType[] = [
    {
      id: 1,
      idProduit: 101,
      produit: 'Produit A',
      quantite: 10,
      pu: 1500,
      montant: 15000,
      dateMvt: new Date('2024-09-01'),
      ref: 'REF001',
      mode: 'Achat',
      etat: 'Terminé',
      mvt: 'Entrée'
    },
    {
      id: 2,
      idProduit: 102,
      produit: 'Produit B',
      quantite: 5,
      pu: 2000,
      montant: 10000,
      dateMvt: new Date('2024-09-02'),
      ref: 'REF002',
      mode: 'Vente',
      etat: 'En cours',
      mvt: 'Sortie'
    },
    {
      id: 3,
      idProduit: 103,
      produit: 'Produit C',
      quantite: 20,
      pu: 750,
      montant: 15000,
      dateMvt: new Date('2024-09-03'),
      ref: 'REF003',
      mode: 'Achat',
      etat: 'Terminé',
      mvt: 'Entrée'
    },
    {
      id: 4,
      idProduit: 104,
      produit: 'Produit D',
      quantite: 8,
      pu: 3000,
      montant: 24000,
      dateMvt: new Date('2024-09-04'),
      ref: 'REF004',
      mode: 'Vente',
      etat: 'Terminé',
      mvt: 'Sortie'
    },
    // Add more records as needed
  ];
  