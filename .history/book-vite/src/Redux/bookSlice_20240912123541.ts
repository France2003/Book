// redux/bookSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface BookState {
  booksByGrade: Record<string, Record<string, Book[]>>; // Phân loại theo lớp học và thể loại
}

const initialState: BookState = {
  booksByGrade: {
    '1': {},
    '2': {},
    '3': {},
    '4': {},
    '5': {},
    '6': {},
    '7': {},
    '8': {},
    '9': {},
    '10': {},
    '11': {},
    '12': {},
  }
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<{ grade: string; category: string; book: Book }>) => {
      const { grade, category, book } = action.payload;
      if (!state.booksByGrade[grade]) {
        state.booksByGrade[grade] = {};
      }
      if (!state.booksByGrade[grade][category]) {
        state.booksByGrade[grade][category] = [];
      }
      state.booksByGrade[grade][category].push(book);
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const updatedBook = action.payload;
      for (const grade in state.booksByGrade) {
        for (const category in state.booksByGrade[grade]) {
          const books = state.booksByGrade[grade][category];
          const index = books.findIndex(book => book.id === updatedBook.id);
          if (index !== -1) {
            books[index] = updatedBook;
          }
        }
      }
    },
    removeBook: (state, action: PayloadAction<number>) => {
      const bookId = action.payload;
      for (const grade in state.booksByGrade) {
        for (const category in state.booksByGrade[grade]) {
          state.booksByGrade[grade][category] = state.booksByGrade[grade][category].filter(book => book.id !== bookId);
        }
      }
    }
  },
});

export const { addBook, updateBook, removeBook } = bookSlice.actions;
export default bookSlice.reducer;
