export interface RavitaillementCreate {
    id ?: number,
    id_fournisseur : number,
    titre : string,
    montant : string,
    date_creation ?: Date,
    date_validation ?: Date,
    remarque?: string,
    etat ?: number
}

export type RavitaillementListType =  {
    id : number,
    fournisseur : string,
    titre : string,
    montant : string,
    date_validation : Date,
    payer : number,
    rap : number;
    
}
export interface RavitaillementList  {
    id : string,
    fournisseur : string,
    titre : string,
    montant : string,
    date_validation : Date,
    payer : number,
    rap : number;
    
}

export interface RavitaillementInfo {
    id : string,
    fournisseur_name : string,
    fournisseur_adresse : string,
    fournisseur_tel : string,
    fournisseur_email : string,
    titre : string,
    montant : number,
    date_creation : Date,
    dateajout : Date,
    date_validation : Date,
    remarque : string,
    etat : string
}