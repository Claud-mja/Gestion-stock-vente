export interface Product {
    id: string;
    name: string;
    ref: string;
    threshold: number;
    purchasePrice: number;
    salePrice: number;
    unit: string;
    stockQuantity: number;
}

export const mockProductData: Product[] = [
    {
        id: 'iPR1',
        name: 'Sucre',
        ref: 'PR01',
        threshold: 10,
        purchasePrice: 5000,
        salePrice: 6000,
        unit: 'Sac',
        stockQuantity: 0
    },
    {
        id: 'iPR2',
        name: 'Farina',
        ref: 'PR02',
        threshold: 5,
        purchasePrice: 7000,
        salePrice: 8000,
        unit: 'Sac',
        stockQuantity: 0
    },
    {
        id: 'iPR3',
        name: 'Oeuf',
        ref: 'PR03',
        threshold: 20,
        purchasePrice: 2000,
        salePrice: 3000,
        unit: 'Article',
        stockQuantity: 0
    },
    {
        id: 'iPR4',
        name: 'Huile',
        ref: 'PR04',
        threshold: 15,
        purchasePrice: 4000,
        salePrice: 5000,
        unit: 'Article',
        stockQuantity: 0
    }
];
