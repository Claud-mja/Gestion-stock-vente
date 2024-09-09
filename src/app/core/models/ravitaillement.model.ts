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
    id : number,
    fournisseur : string,
    titre : string,
    montant : string,
    date_validation : Date,
    payer : number,
    rap : number;
    
}

export interface RavitaillementInfo {
    id ?: number,
    fournisseur_name : string,
    titre : string,
    montant : string,
    date_creation : Date,
    dateajout : Date,
    datevalidation : Date,
    remarque : string,
    etat : string
}