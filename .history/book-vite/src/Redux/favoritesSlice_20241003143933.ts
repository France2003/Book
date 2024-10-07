import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface FavoritesState {
  books: Book[];
}

const initialState: FavoritesState = {
  books: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Book>) => {
      const exists = state.books.find(book => book.id === action.payload.id);
      if (!exists) {
        state.books.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
