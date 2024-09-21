import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

// Hàm lưu giỏ hàng vào localStorage (bao bọc trong try-catch để an toàn)
const saveCartToLocalStorage = (cartItems: Book[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error("Lỗi khi lưu giỏ hàng vào localStorage:", error);
  }
};

// Hàm khôi phục giỏ hàng từ localStorage (bao bọc trong try-catch để an toàn)
const loadCartFromLocalStorage = (): Book[] => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Lỗi khi khôi phục giỏ hàng từ localStorage:", error);
    return [];
  }
};

interface CartState {
  items: Book[];
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(), // Khôi phục giỏ hàng từ localStorage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity! += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items); // Lưu lại vào localStorage
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items); // Lưu lại vào localStorage
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items); // Lưu lại vào localStorage
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
