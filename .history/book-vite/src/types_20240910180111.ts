export interface Book {
    id: number;
    title: string;
    author: string;
    price:string;
    description: string;
    image:string;
    quantity?:number;
    grade?:string;
  }
  export interface Order {
    id: number;
    items: { bookId: number; quantity: number }[];
    totalPrice: number;
    date: string;
  }
  