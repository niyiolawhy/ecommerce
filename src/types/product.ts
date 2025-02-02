export interface IProduct{
    description: string;
    image: string;
    title: string;
    price: number;
    id: number;
}

export interface CartItem extends IProduct {
    quantity: number;
}