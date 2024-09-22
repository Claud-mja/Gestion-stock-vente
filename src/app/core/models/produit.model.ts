export interface ProduitCreate{
    nom : string;
    ref : string;
    seriazable : boolean;
    perissable : boolean;
    qt_equivalance : number;
    seuil : number;
    prixachat : number;
    prixvente : number;
    type : string;
    categ : string;
    casier : string;
    uniter : string;
}

export type ProduitList = {
    id : string;
    nom : string;
    ref : string;
    photo : string;
    cat : string;
    types : string;
    uniter : string;
    seuil : number;
    prixachat : number;
    prixvente : number;
    prix_virtuel : number;
    qt_stock : number;
    qt_stock_pan : number;
    persissable : boolean;
    seriazable : boolean;
    depot : string;
    zone : string;
    casier : string;
    etat : string;
}


export interface ProduitInfo{
    id : string;
    nom : string;
    ref : string;
    photo : string;
    categ : string;
    uniter : string;
    prixAchat : Number;
    prixVente : Number;
    prixVirtuel : Number;
    qtStock : string;
    qtStockPan : string;
    seuil : number;
    perissable : boolean;
    serizable : boolean;
    depot : string;
    zone : string;
    casier : string;
    details : string;
    qtEquivalence : number;
    etat : string;
}