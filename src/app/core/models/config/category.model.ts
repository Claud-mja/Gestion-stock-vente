export interface CategoryCreate {
    type : string;
    nom : string;
    val : string;
    photo ?: string;
}

export interface CategoryList{
    id : string;
    nom : string;
    val : string;
    photo : string;
    type : string;
    etat_lib : string
}