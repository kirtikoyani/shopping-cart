export interface product {
    size: Array<string>;
    _id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    brand: string;
    category: string;
    images: string;
    quantity: number;
  }
export interface cartProduct {
    cartQuantity: number;
    size: Array<string>;
    _id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    brand: string;
    category: string;
    images: string;
    quantity: number;
    color:string;
  }
  export interface errorMsg {
    error: string;
  }