export interface ProductType {
    image: string
    name: string
    description: string
}

export interface ProductListType {
    id?: number
    product: ProductType
    price: number
    quantity: number
    quantityAdd?: number | null
    total: number
}