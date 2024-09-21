import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  rating: number;
}

interface CartState {
  items: Book[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state:any, action: PayloadAction<Book>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state:any, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
