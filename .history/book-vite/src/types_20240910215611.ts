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
  export interface PaymentInfo {
    method: string;
    cardNumber?: string;
    transactionId?: string;
  }
  export interface Order {
    id: number;
    items: { bookId: number; quantity: number }[];
    totalPrice: string;
    date: string;
  }
  