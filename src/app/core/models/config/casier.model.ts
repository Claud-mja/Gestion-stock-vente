export interface CasierCreate {
    id_zone : string,
    nom : string,
    val : string
}

export interface CasierList {
    id : string;
    nom : string,
    val : string,
    depot : string;
    zone : string;
    etat : string;
}