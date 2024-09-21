import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

// Helper function to save state to localStorage
const saveCartToLocalStorage = (cartItems: Book[]) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

// Helper function to load state from localStorage
const loadCartFromLocalStorage = (): Book[] => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

interface CartState {
  items: Book[];
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(), // Load from localStorage when initializing
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If item exists, increase quantity
        existingItem.quantity! += 1;
      } else {
        // Add new item to the cart
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items); // Save to localStorage after update
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items); // Save to localStorage after update
    },
    // If you want to clear cart
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items); // Save to localStorage after clearing
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
