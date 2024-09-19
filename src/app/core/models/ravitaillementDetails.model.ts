export type RavDetailsList =  {
    id ?: string;
    id_ravitaillement : string;
    id_produit : string;
    prod_name : string;
    prod_image : string;
    remarque ?: string;
    qt_ajouter : number; 
    pu_achat : number;
    pu_vente : number;
    montant : number;
}

export interface RavDetailInfo {
    id : string;
    produit : string;
    ravitaillement : string;
    qt_stock : number;
    pu_achat : number;
    pu_vente : number;
    montant : number
}