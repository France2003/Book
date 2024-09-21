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
  export interface OrderItem {
    bookId: number;
    quantity: number;
    price: number; // Thêm giá sách vào đây nếu cần hiển thị
  }
  
  export interface PaymentInfo {
    method: string;
    cardNumber?: string;
    transactionId?: string;
  }
  export interface Order {
    id: number;
  date: string;
  totalPrice: number;
  items: OrderItem[];
  paymentInfo: PaymentInfo;
  }
  