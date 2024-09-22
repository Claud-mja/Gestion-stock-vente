
export type InventaireList =  {
    id : string,
    titre : string,
    date_validation : Date,
    date_creation : Date,
    date_ok : Date,
    remarque : string,
    etat : number;
    etat_lib : string;
}

export interface InventaireCreate {
    titre : string,
    date_creation : Date,
    remarque : string,
}