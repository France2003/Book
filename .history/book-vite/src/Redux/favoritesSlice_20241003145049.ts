import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface FavoritesState {
  favorites: Book[]; // Ensure this matches your usage in the FavoritesPage
}

const initialState: FavoritesState = {
  favorites: [], // Initialize as an empty array
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Book>) => {
      const book = action.payload;
      if (!state.favorites.some(favBook => favBook.id === book.id)) {
        state.favorites.push(book);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(book => book.id !== action.payload);
    },
  },
});

// Export actions and reducer
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
