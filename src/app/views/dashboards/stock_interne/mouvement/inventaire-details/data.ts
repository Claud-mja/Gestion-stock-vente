import { ProductListType } from './productlist.interface'

export type IventaireUpdateType = {
  id: number | string
  titre: string
  remarque: string
  responsable: string
  etat: string
}

export const InventaireProduct: ProductListType[] = [
  // {
  //   id: 1,
  //   product: {
  //     image: 'assets/images/products/03.png',
  //     name: 'Royal Purse',
  //     description: 'Pure Leather 100%',
  //   },
  //   price: 80,
  //   quantity: 3,
  //   total: 240,
  // },
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
export const InventaireProductAjoute: ProductListType[] = [
  {
    id: 1,
    product: {
      image: 'assets/images/products/03.png',
      name: 'Royal Purse',
      description: 'Pure Leather 100%',
    },
    price: 80,
    quantity: 3,
    total: 240,
  },
  {
    id: 2,
    product: {
      image: 'assets/images/products/04.png',
      name: 'Apple Watch',
      description: 'Size-05 (Model 2021)',
    },
    price: 100,
    quantity: 1,
    total: 100,
  }
]


export const AllInventaireProduct: ProductListType[] = [
  {
    id: 1,
    product: {
      image: 'assets/images/products/03.png',
      name: 'Royal Purse',
      description: 'Pure Leather 100%',
    },
    price: 80,
    quantity: 3,
    total: 240,
  },
  {
    id: 2,
    product: {
      image: 'assets/images/products/04.png',
      name: 'Apple Watch',
      description: 'Size-05 (Model 2021)',
    },
    price: 100,
    quantity: 1,
    total: 100,
  },
  {
    id: 3,
    product: {
      image: 'assets/images/products/06.png',
      name: 'Cosco Volleyball',
      description: 'size-04 (Model 2021)',
    },
    price: 20,
    quantity: 4,
    total: 80,
  },
  {
    id: 4,
    product: {
      image: 'assets/images/products/05.png',
      name: 'Reebok Shoes',
      description: 'size-08 (Model 2021)',
    },
    price: 50,
    quantity: 10,
    total: 500,
  },
  {
    id: 5,
    product: {
      image: 'assets/images/products/01.png',
      name: 'Modern Chair',
      description: 'Size-Medium (Model 2021)',
    },
    price: 70,
    quantity: 2,
    total: 140,
  },
]
