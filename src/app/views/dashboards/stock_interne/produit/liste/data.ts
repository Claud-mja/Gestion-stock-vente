export type DataTableProduitsType = {
  id: string;
  photo: string
  name: string
  ref: string
  seuil: number
  prixAchat: number
  prixVente: number
  cat: string
  types: string
  depot: string
  uniter: string
  produit: string
  etat: string
  qtStock: number
}

export const DataTableProduct: DataTableProduitsType[] = [
  {
    id: "PR1002",
    photo: 'https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp',
    name: 'Coca-cola',
    ref: 'BS-56',
    seuil: 20,
    prixAchat: 2500.00,
    prixVente: 2600.00,
    cat: 'Electrique',
    types: 'Type A',
    depot: 'Centrale',
    uniter: 'Kilogramme',
    produit: 'Sucre',
    etat: 'Creer',
    qtStock: 4
  },
  {
    id: "PR1003",
    photo: 'https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp',
    name: 'Coca-cola4',
    ref: 'BS-56',
    seuil: 20,
    prixAchat: 2500.00,
    prixVente: 2600.00,
    cat: 'Electrique',
    types: 'Type A',
    depot: 'Centrale',
    uniter: 'Kilogramme',
    produit: 'Farine',
    etat: 'En Stock',
    qtStock: 2,
  },
  {
    id: "PR1004",
    photo: 'https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp',
    name: 'Coca-cola56',
    ref: 'BS-56',
    seuil: 20,
    prixAchat: 2500.00,
    prixVente: 2600.00,
    cat: 'Electrique',
    types: 'Type A',
    depot: 'Centrale',
    uniter: 'Kilogramme',
    produit: 'Huile',
    etat: 'A commander',
    qtStock: 2,
  },
  {
    id: "PR1005",
    photo: 'https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp',
    name: 'Coca-cola85',
    ref: 'BS-56',
    seuil: 20,
    prixAchat: 2500.00,
    prixVente: 2600.00,
    cat: 'Electrique',
    types: 'Type A',
    depot: 'Centrale',
    uniter: 'Kilogramme',
    produit: 'Riz',
    etat: 'En Stock',
    qtStock: 0,
  },
//   {
//     id: 5,
//     photo: 'https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp',
//     name: 'Pâtes',
//     ref: 'Spaghetti',
//     seuil: 30,
//     prixAchat: 2000,
//     prixVente: 3000,
//     cat: 'Alimentation',
//     types: 'Non Perissable',
//     depot: 'Depot 5',
//     uniter: 'Paquet',
//     produit: 'Pâtes',
//     etat: 'En Stock',
//     qtStock: 350,
//     prixVirtuel: 2900,
//     qtStockPan: 75,
//     options: ''
//   },
//   {
//     id: 6,
//     photo: 'https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp',
//     name: 'Café',
//     ref: 'Arabica',
//     seuil: 8,
//     prixAchat: 10000,
//     prixVente: 12000,
//     cat: 'Boissons',
//     types: 'Non Perissable',
//     depot: 'Depot 6',
//     uniter: 'Kg',
//     produit: 'Café',
//     etat: 'En Stock',
//     qtStock: 150,
//     prixVirtuel: 11500,
//     qtStockPan: 40,
//     options: ''
//   },
//   {
//     id: 7,
//     photo: 'https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp',
//     name: 'Thé',
//     ref: 'Vert',
//     seuil: 12,
//     prixAchat: 6000,
//     prixVente: 7500,
//     cat: 'Boissons',
//     types: 'Non Perissable',
//     depot: 'Depot 7',
//     uniter: 'Boîte',
//     produit: 'Thé',
//     etat: 'En Stock',
//     qtStock: 250,
//     prixVirtuel: 7200,
//     qtStockPan: 60,
//     options: ''
//   },
//   {
//     id: 8,
//     photo: 'https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp',
//     name: 'Chocolat',
//     ref: 'Noir',
//     seuil: 10,
//     prixAchat: 15000,
//     prixVente: 18000,
//     cat: 'Confiserie',
//     types: 'Perissable',
//     depot: 'Depot 8',
//     uniter: 'Tablette',
//     produit: 'Chocolat',
//     etat: 'A commander',
//     qtStock: 100,
//     prixVirtuel: 17500,
//     qtStockPan: 25,
//     options: ''
//   },
]

export const paginateData: DataTableProduitsType[] = [
  ...DataTableProduct, // Ajout des données existantes de DataTableProduct
//   {
//     id: 9,
//     photo: 'https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp',
//     name: 'Lait',
//     ref: 'Entier',
//     seuil: 20,
//     prixAchat: 5000,
//     prixVente: 7000,
//     cat: 'Boissons',
//     types: 'Liquide',
//     depot: 'Depot 9',
//     uniter: 'Litre',
//     produit: 'Lait',
//     etat: 'En Stock',
//     qtStock: 200,
//     prixVirtuel: 6800,
//     qtStockPan: 40,
//     options: ''
//   },
//   {
//     id: 10,
//     photo: 'https://api.croq-kilos.com/media/cache/article_banner_webp/uploads/medias/61e92b883c2bd666378151.webp',
//     name: 'Beurre',
//     ref: 'Demi-sel',
//     seuil: 15,
//     prixAchat: 12000,
//     prixVente: 15000,
//     cat: 'Produits Laitiers',
//     types: 'Perissable',
//     depot: 'Depot 10',
//     uniter: 'Kg',
//     produit: 'Beurre',
//     etat: 'A commander',
//     qtStock: 80,
//     prixVirtuel: 14500,
//     qtStockPan: 30,
//     options: ''
//   },
]

