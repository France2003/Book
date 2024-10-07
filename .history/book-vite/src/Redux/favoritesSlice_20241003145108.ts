import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface FavoritesState {
  books: Book[];
}

const initialState: FavoritesState = {
  books: JSON.parse(localStorage.getItem('favorites') || '[]') || [], // Load favorites from localStorage
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Book>) => {
      const exists = state.books.find(book => book.id === action.payload.id);
      if (!exists) {
        state.books.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.books)); // Update localStorage
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.books)); // Update localStorage
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
