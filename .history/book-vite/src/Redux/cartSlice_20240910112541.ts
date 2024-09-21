import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

// Thêm thuộc tính quantity vào CartItem
interface CartItem extends Book {
  quantity: number;
  image:string;
}

// Định nghĩa kiểu trạng thái giỏ hàng
interface CartState {
  items: CartItem[];
}

// Khôi phục trạng thái giỏ hàng từ localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Lỗi khi khôi phục giỏ hàng từ localStorage:', error);
    return [];
  }
};

// Lưu trạng thái giỏ hàng vào localStorage
const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Lỗi khi lưu giỏ hàng vào localStorage:', error);
  }
};

// Khởi tạo trạng thái với dữ liệu từ localStorage
const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Book>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1, image:'' });
      }
      saveCartToLocalStorage(state.items); // Lưu lại vào localStorage
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items); // Lưu lại vào localStorage
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state.items); // Lưu lại vào localStorage
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage(state.items); // Lưu lại vào localStorage
      }
    },
    clearCart(state) {
      state.items = [];
      saveCartToLocalStorage(state.items); // Xóa khỏi localStorage
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
