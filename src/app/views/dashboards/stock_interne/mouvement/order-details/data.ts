import { currency, currentYear } from '@/app/common/constants'
import { ProductListType } from './productlist.interface'

export const OrderInfo = {
  username: '@donFlo',
  name: 'Don Flowers',
  email: 'DonIFlowers@jourrapide.com',
  payment: currency + '2450 ',
  order_date: '31 Dec 2023',
  delivery_date: '05 Jan ' + currentYear,
  courier: 'FedEx Corporation',
  address: '718 Bingamon Branch Road',
  location: 'Central Valley',
  pincode: 'NY 10917',
}

export interface SimulationResult {
  id: string;
  nom: string;
  email: string;
  adresse: string;
  numero: string;
  total: number;
  data: {
    prod_photo: string;
    prod_name: string;
    prix: number;
    qt_cmd: number;
  }[];
};


export const RavitaillementProduct: ProductListType[] = [
  {
    id: "PR1",
    product: {
      image: 'assets/images/products/03ji.png',
      name: 'Produit A',
      description: 'Pure Leather 100%',
    },
    price: 3000.00,
    quantity: 24,
    total: 240,
  },
  // {
  //   id: 2,
  //   product: {
  //     image: 'assets/images/products/04.png',
  //     name: 'Apple Watch',
  //     description: 'Size-05 (Model 2021)',
  //   },
  //   price: 100,
  //   quantity: 1,
  //   total: 100,
  // }
]
export const RavitaillementProductAjoute: ProductListType[] = [
  {
    id: "PR1002",
    product: {
      image: 'assets/images/products/04ji.png',
      name: 'Coca-cola',
      description: 'Size-05 (Model 2021)',
    },
    price: 2600.00,
    quantity: 4,
    total: 100,
  },
  {
    id: "PR1003",
    product: {
      image: 'assets/images/products/06ji.png',
      name: 'Coca-cola4',
      description: 'size-04 (Model 2021)',
    },
    price: 2600.00,
    quantity: 2,
    total: 80,
  },
  {
    id: "PR1004",
    product: {
      image: 'assets/images/products/05ji.png',
      name: 'Coca-cola95',
      description: 'size-08 (Model 2021)',
    },
    price: 2600.00,
    quantity: 2,
    total: 500,
  }
]


export const AllRavitaillementProduct: ProductListType[] = [
  {
    id: "PR1",
    product: {
      image: 'assets/images/products/03ji.png',
      name: 'Produit A',
      description: 'Pure Leather 100%',
    },
    price: 3000.00,
    quantity: 24,
    total: 240,
  },
  {
    id: "PR1002",
    product: {
      image: 'assets/images/products/04ji.png',
      name: 'Coca-cola',
      description: 'Size-05 (Model 2021)',
    },
    price: 2600.00,
    quantity: 4,
    total: 100,
  },
  {
    id: "PR1003",
    product: {
      image: 'assets/images/products/06ji.png',
      name: 'Coca-cola4',
      description: 'size-04 (Model 2021)',
    },
    price: 2600.00,
    quantity: 2,
    total: 80,
  },
  {
    id: "PR1004",
    product: {
      image: 'assets/images/products/05ji.png',
      name: 'Coca-cola95',
      description: 'size-08 (Model 2021)',
    },
    price: 2600.00,
    quantity: 2,
    total: 500,
  }
]

export const ResultSimulation : SimulationResult [] = [
  {
    data : [
      {
        prod_photo : "123.jpg",
        prod_name : "Coca-cola",
        prix : 2300,
        qt_cmd : 4
      },
      {
        prod_photo : "123.jpg",
        prod_name : "Coca-cola4",
        prix : 2550,
        qt_cmd : 2
      },
      {
        prod_photo : "123.jpg",
        prod_name : "Coca-cola95",
        prix : 2750,
        qt_cmd : 2
      }
    ],
    id : "FRN002",
    nom : "Fournisseur Beta",
    adresse : "456 Avenue de Lyon, Lyon",
    email : "alpha@example.com",
    numero : "+33123456789",
    total : 19800
  },
  {
    data : [
      {
        prod_photo : "123.jpg",
        prod_name : "Coca-cola",
        prix : 2200,
        qt_cmd : 4
      },
      {
        prod_photo : "123.jpg",
        prod_name : "Coca-cola4",
        prix : 2550,
        qt_cmd : 2
      },
      {
        prod_photo : "123.jpg",
        prod_name : "Coca-cola95",
        prix : 2600,
        qt_cmd : 2
      }
    ],
    total : 19100,
    id : "FRN004",
    nom : "Fournisseur Delta",
    adresse : "321 Rue de Nice, Nice",
    email : "delta@example.com",
    numero : "+33987654321",
  },
  {
    data : [
      {
        prod_photo : "123.jpg",
        prod_name : "Coca-cola",
        prix : 2550,
        qt_cmd : 4
      },
      {
        prod_photo : "123.jpg",
        prod_name : "Coca-cola4",
        prix : 2700,
        qt_cmd : 2
      },
      {
        prod_photo : "123.jpg",
        prod_name : "Coca-cola95",
        prix : 2400,
        qt_cmd : 2
      }
    ] ,
    total :  20400,
    id : "FRN003",
    nom : "Fournisseur Gamma",
    adresse : "789 Boulevard de Marseille, Marseille",
    email : "gamma@example.com",
    numero : "+33412345678",
  }
 
]
