import { currentYear } from '@/app/common/constants'

export type CarteUpdateType = {
  order_id: string
  rav_name: string
  product_details: string
  order_date: string
  fournisseur: string
  status: string
  amount: number
}

export const CarteUpdateData: CarteUpdateType[] = [
  {
    order_id: '546987',
    rav_name: 'Bata Shoes',
    product_details: 'size-08 (Model' + currentYear + ')',
    order_date: '15/08/2023',
    fournisseur: 'UPI',
    status: 'Completed',
    amount: 390,
  },
  {
    order_id: '362514',
    rav_name: 'Morden Chair',
    product_details: 'Size-Mediam (Model 2021)',
    order_date: '22/09/2023',
    fournisseur: 'Banking',
    status: 'Completed',
    amount: 630,
  },
  {
    order_id: '215487',
    rav_name: 'Reebok Shoes',
    product_details: 'size-08 (Model 2021)',
    order_date: '31/12/2023',
    fournisseur: 'Paypal',
    status: 'Cancel',
    amount: 450,
  },
  {
    order_id: '326598',
    rav_name: 'Cosco Vollyboll',
    product_details: 'size-04 (Model 2021)',
    order_date: '05/01/' + currentYear,
    fournisseur: 'UPI',
    status: 'Completed',
    amount: 880,
  },
  {
    order_id: '369852',
    rav_name: 'Royal Purse',
    product_details: 'Pure Lether 100%',
    order_date: '20/02/' + currentYear,
    fournisseur: 'BTC',
    status: 'Pending',
    amount: 520,
  },
  {
    order_id: '987456',
    rav_name: 'Bata Shoes',
    product_details: 'size-08 (Model' + currentYear + ')',
    order_date: '15/08/2023',
    fournisseur: 'UPI',
    status: 'Completed',
    amount: 390,
  },
  {
    order_id: '159753',
    rav_name: 'Morden Chair',
    product_details: 'Size-Mediam (Model 2021)',
    order_date: '22/09/2023',
    fournisseur: 'Banking',
    status: 'Completed',
    amount: 630,
  },
  {
    order_id: '852456',
    rav_name: 'Reebok Shoes',
    product_details: 'size-08 (Model 2021)',
    order_date: '31/12/2023',
    fournisseur: 'Paypal',
    status: 'Cancel',
    amount: 450,
  },
  {
    order_id: '154863',
    rav_name: 'Cosco Vollyboll',
    product_details: 'size-04 (Model 2021)',
    order_date: '05/01/' + currentYear,
    fournisseur: 'UPI',
    status: 'Completed',
    amount: 880,
  },
  {
    order_id: '625877',
    rav_name: 'Royal Purse',
    product_details: 'Pure Lether 100%',
    order_date: '20/02/' + currentYear,
    fournisseur: 'BTC',
    status: 'Pending',
    amount: 520,
  },
]
