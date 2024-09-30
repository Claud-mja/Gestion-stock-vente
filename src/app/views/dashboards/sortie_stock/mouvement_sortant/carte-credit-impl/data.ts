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

export const CarteProduct: ProductListType[] = [
  // {
  //   id: 1,
  //   product: {
  //     image: 'assets/images/products/03.png',
  //     name: 'Royal Purse',
  //     description: 'Pure Leather 100%',
  //   },
  //   price: 3000.00,
  //   quantity: 24,
  //   total: 240,
  // },
  // {
  //   id: 2,
  //   product: {
  //     image: 'assets/images/products/04.png',
  //     name: 'Apple Watch',
  //     description: 'Size-05 (Model 2021)',
  //   },
  //   price: 2600.00,
  //   quantity: 1,
  //   total: 100,
  // }
]
export const CarteProductAjoute: ProductListType[] = [
  {
    id: 'PR1',
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
    id: 'PR1002',
    product: {
      image: 'assets/images/products/04ji.png',
      name: 'Coca-cola',
      description: 'Size-05 (Model 2021)',
    },
    price: 2600.00,
    quantity: 4,
    total: 100,
  }
]


export const AllCarteProduct: ProductListType[] = [
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
