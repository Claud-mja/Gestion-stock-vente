export type InvDetailList =  {
    id ?: string;
    id_inventaire : string;
    id_produit : string;
    prod_name : string;
    prod_image : string;
    remarque ?: string;
    qt_stock_virtuel : number;
    qt_theorique ?: number; 
    qt_reelle : number;
    qt_difference : number;
    pu_achat : number;
    pu_vente : number;
}

export interface InvDetailInfo {
    id : string;
    produit : string;
    titre : string,
    inventaire : string;
    qt_stock : number;
    pu_achat : number;
    pu_vente : number;
    montant : number;
    etat : number;
    etat_lib : string;
}