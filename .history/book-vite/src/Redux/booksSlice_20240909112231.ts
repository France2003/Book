import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  rating: number;
}

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state:any, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
  },
});

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;
