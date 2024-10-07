import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookCategory } from '../types';

interface BookState {
  bookCategories: BookCategory[];
  booksByGrade: Record<string, Book[]>;
  filteredBooks: Record<string, Book[]>;
  featuredBooks: Book[]; // Featured books state
  bestSellers: Book[];
}

// Function to load data from localStorage
const loadFromLocalStorage = (): BookState => {
  try {
    const serializedState = localStorage.getItem('bookState');
    if (serializedState === null) {
      return getDefaultBookState();
    }
    return JSON.parse(serializedState) as BookState;
  } catch (e) {
    console.warn("Could not load from localStorage", e);
    return getDefaultBookState();
  }
};

// Function to get the default book state
const getDefaultBookState = (): BookState => ({
  booksByGrade: {
    '1': [
      {
        id: 1,
        image: 'https://ebdbook.vn/upload/untitled-2.jpg?v=1.0.1',
        title: 'Bài học STEM - Lớp 1',
        author: 'Tưởng Duy Hải (Chủ biên) - Trần Ngọc Bích - Lê Thị Thu Huyền - Nguyễn Hà My - Trần Thúy Ngà - Đào Thị Sen - Phạm Văn Thuận - Nguyễn Huyền Trang',
        price: '30.000',
        description: 'Sách giáo khoa lớp 1',
        category: 'Bộ Cánh Diều'
      },
    ],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
    '9': [],
    '10': [],
    '11': [
      {
        id: 2,
        image: 'https://ebdbook.vn/upload/sgk/lop11/lichsu11cd1.jpg?v=1.0.1',
        title: 'Lịch Sử 11 - Bộ Cánh Diều',
        author: 'ĐỖ THANH BÌNH (Tổng Chủ biên) - NGUYỄN VĂN NINH (Chủ biên) - LÊ HIẾN CHƯƠNG - TỐNG THỊ QUỲNH HƯƠNG - NGUYỄN MẠNH HƯỞNG - VŨ ĐỨC LIÊM.',
        price: '56.000',
        description: 'Lịch Sử 11 - Bộ Cánh Diều',
        category: 'Bộ Cánh Diều'
      },
      // ... other books for grade 11
    ],
    '12': [],
    '13': [],
  },
  bookCategories: [
    { id: 1, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối', 'Bộ Bình Đẳng', 'Bộ Cùng Học'] },
    { id: 2, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối'] },
    // ... other categories
  ],
  filteredBooks: {},
  featuredBooks: [],
  bestSellers: [],
});

// Function to save data to localStorage
const saveToLocalStorage = (state: BookState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('bookState', serializedState);
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
};

const initialState: BookState = loadFromLocalStorage();

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<{ grade: string; book: Book }>) => {
      const { grade, book } = action.payload;
      state.booksByGrade[grade] = state.booksByGrade[grade]
        ? [...state.booksByGrade[grade], book]
        : [book];
      saveToLocalStorage(state);
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const updatedBook = action.payload;
      for (const grade in state.booksByGrade) {
        const books = state.booksByGrade[grade];
        const index = books.findIndex(book => book.id === updatedBook.id);
        if (index !== -1) {
          books[index] = updatedBook;
          break;
        }
      }
      saveToLocalStorage(state);
    },
    removeBook: (state, action: PayloadAction<number>) => {
      const bookId = action.payload;
      for (const grade in state.booksByGrade) {
        state.booksByGrade[grade] = state.booksByGrade[grade].filter(book => book.id !== bookId);
      }
      saveToLocalStorage(state);
    },
    filterBooksByCategory: (state, action: PayloadAction<{ grade: string; category: string }>) => {
      const { grade, category } = action.payload;
      const isCategoryValid = state.bookCategories.some(cat => cat.name.includes(category));
      state.filteredBooks[`${grade}-${category}`] = (state.booksByGrade[grade] && isCategoryValid)
        ? state.booksByGrade[grade].filter(book => book.category === category)
        : [];

      if (!isCategoryValid) {
        delete state.filteredBooks[`${grade}-${category}`];
      }
    },
    setFeaturedBooks: (state, action: PayloadAction<Book[]>) => {
      state.featuredBooks = action.payload;
      saveToLocalStorage(state);
    },
    setBestSellers: (state, action: PayloadAction<Book[]>) => {
      state.bestSellers = action.payload;
      saveToLocalStorage(state);
    },
  },
});

// Exporting actions and reducer
export const {
  addBook,
  updateBook,
  removeBook,
  filterBooksByCategory,
  setFeaturedBooks,
  setBestSellers,
} = bookSlice.actions;

export default bookSlice.reducer;
