// redux/bookSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookState } from '../types';

// Hàm lấy dữ liệu từ localStorage (nếu có)
const loadFromLocalStorage = (): BookState => {
  try {
    const serializedState = localStorage.getItem('booksByGrade');
    if (serializedState === null) {
      return {
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
          '11': {
            'Math': [],
            'Literature': [],
            'Science': [],
            'History': [],
            'English': [],
          },
          '12': {
            'Math': [],
            'Literature': [],
            'Physics': [],
            'Chemistry': [],
            'Biology': [],
            'History': [],
            'Geography': [],
          }
        },
        loading: false,
        error: null,
      };
    }

    return JSON.parse(serializedState) as BookState;
  } catch (e) {
    console.warn("Could not load from localStorage", e);
    return { booksByGrade: {}, loading: false, error: null }; // Trả về state mặc định nếu có lỗi
  }
};

// Hàm lưu dữ liệu vào localStorage
const saveToLocalStorage = (state: BookState) => {
  try {
    const serializedState = JSON.stringify(state);
    console.log("Saving to localStorage:", serializedState);
    localStorage.setItem('booksByGrade', serializedState);
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
};

const initialState: BookState = loadFromLocalStorage();

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<{ grade: string; subject: string; book: Book }>) => {
      const { grade, subject, book } = action.payload;
      if (!state.booksByGrade[grade]) {
        state.booksByGrade[grade] = {};
      }
      if (!state.booksByGrade[grade][subject]) {
        state.booksByGrade[grade][subject] = [];
      }
      state.booksByGrade[grade][subject].push(book);

      // Lưu dữ liệu vào localStorage sau khi thêm sách
      saveToLocalStorage(state);
    },
    updateBook(state, action: PayloadAction<{ grade: string; subject: string; book: Book }>) {
      const { grade, subject, book } = action.payload;
      const books = state.booksByGrade[grade]?.[subject] || [];
      const index = books.findIndex(b => b.id === book.id);
      if (index !== -1) {
        books[index] = book;
      }

      // Lưu dữ liệu vào localStorage sau khi cập nhật sách
      saveToLocalStorage(state);
    },
    removeBook(state, action: PayloadAction<{ grade: string; subject: string; bookId: number }>) {
      const { grade, subject, bookId } = action.payload;
      const books = state.booksByGrade[grade]?.[subject] || [];
      state.booksByGrade[grade][subject] = books.filter(book => book.id !== bookId);

      // Lưu dữ liệu vào localStorage sau khi xóa sách
      saveToLocalStorage(state);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
});

// Xuất action để sử dụng trong các component
export const { addBook, updateBook, removeBook, setLoading, setError } = bookSlice.actions;
export default bookSlice.reducer;
