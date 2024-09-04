export interface RavitaillementType {
    id: number;
    nom: string;
    dateValidation: string;
    fournisseur: string;
    montant: number;
    paye: number;
    rap: number;
}

// Example data (replace with actual data or API call)
export const RavitaillementData: RavitaillementType[] = [
    {
    id: 1,
    nom: "Ravitaillement A",
    dateValidation: "2024-08-25",
    fournisseur: "Fournisseur A",
    montant: 1500,
    paye: 1200,
    rap: 300,
},
{
    id: 2,
    nom: "Ravitaillement B",
    dateValidation: "2024-08-28",
    fournisseur: "Fournisseur B",
    montant: 2000,
    paye: 1800,
    rap: 200,
},
{
    id: 3,
    nom: "Ravitaillement C",
    dateValidation: "2024-09-01",
    fournisseur: "Fournisseur C",
    montant: 2500,
    paye: 2300,
    rap: 200,
},
{
    id: 4,
    nom: "Ravitaillement D",
    dateValidation: "2024-09-03",
    fournisseur: "Fournisseur D",
    montant: 3000,
    paye: 2900,
    rap: 100,
},
{
    id: 5,
    nom: "Ravitaillement E",
    dateValidation: "2024-09-05",
    fournisseur: "Fournisseur E",
    montant: 1800,
    paye: 1600,
    rap: 200,
}

];

export const paginateData: RavitaillementType[] = [
    {
    id: 1,
    nom: "Ravitaillement A",
    dateValidation: "2024-08-25",
    fournisseur: "Fournisseur A",
    montant: 1500,
    paye: 1200,
    rap: 300,
},
{
    id: 2,
    nom: "Ravitaillement B",
    dateValidation: "2024-08-28",
    fournisseur: "Fournisseur B",
    montant: 2000,
    paye: 1800,
    rap: 200,
},
{
    id: 3,
    nom: "Ravitaillement C",
    dateValidation: "2024-09-01",
    fournisseur: "Fournisseur C",
    montant: 2500,
    paye: 2300,
    rap: 200,
},
{
    id: 4,
    nom: "Ravitaillement D",
    dateValidation: "2024-09-03",
    fournisseur: "Fournisseur D",
    montant: 3000,
    paye: 2900,
    rap: 100,
},
{
    id: 5,
    nom: "Ravitaillement E",
    dateValidation: "2024-09-05",
    fournisseur: "Fournisseur E",
    montant: 1800,
    paye: 1600,
    rap: 200,
}

];
