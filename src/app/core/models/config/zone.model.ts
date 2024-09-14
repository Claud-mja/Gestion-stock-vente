export interface ZoneCreate {
    id_depot : string,
    nom : string,
    val : string
}

export type ZoneList = {
    id : string;
    depot : string;
    nom : string,
    val : string,
    etat : string;
}