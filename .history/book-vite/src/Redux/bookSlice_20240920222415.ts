import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookCategory } from '../types';

interface BookState {
  bookCategories: BookCategory[];
  booksByGrade: Record<string, Book[]>;
  filteredBooks: Record<string, Book[]>; // Đảm bảo filteredBooks luôn có kiểu phù hợp
  featuredBooks: Book[];
  bestSellers: Book[];
}

// Hàm lấy dữ liệu từ localStorage (nếu có)
const loadFromLocalStorage = (): BookState => {
  try {
    const serializedState = localStorage.getItem('bookState');
    if (serializedState === null) {
      return {
        booksByGrade: {
          '1': [
            { id: 1, image: 'https://ebdbook.vn/upload/untitled-2.jpg?v=1.0.1', title: 'Bài học STEM - Lớp 1', author: 'Tưởng Duy Hải (Chủ biên) - Trần Ngọc Bích - Lê Thị Thu Huyền - Nguyễn Hà My - Trần Thúy Ngà - Đào Thị Sen - Phạm Văn Thuận - Nguyễn Huyền Trang', price: '30.000', description: 'Sách giáo khoa lớp 1', category:'Bộ Cánh Diều' },
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
            { id: 2, image: 'https://ebdbook.vn/upload/sgk/lop11/lichsu11cd1.jpg?v=1.0.1', title: 'Lịch Sử 11 - Bộ Cánh Diều', author: 'ĐỖ THANH BÌNH (Tổng Chủ biên) - NGUYỄN VĂN NINH (Chủ biên) - LÊ HIẾN CHƯƠNG - TỐNG THỊ QUỲNH HƯƠNG - NGUYỄN MẠNH HƯỞNG - VŨ ĐỨC LIÊM.', price: '56.000', description: 'Lịch Sử 11 - Bộ Cánh Diều',category:'Bộ Cánh Diều' },
            { id: 3, image: 'https://ebdbook.vn/upload/sgk/lop11/hdtn11cd1.jpg?v=1.0.1', title: 'Hoạt Động Trải Nghiệm, Hướng Nghiệp 11 - Bộ Cánh Diều', author: 'NGUYỄN DỤC QUANG (Tổng Chủ biên) - VŨ ĐÌNH BẢY (Chủ biên) - NGUYỄN NAM PHƯƠNG - TRẦN THỊ LỆ THU - BÙI THANH XUÂN.', price: '20.000', description: 'Hoạt Động Trải Nghiệm, Hướng Nghiệp 11 - Bộ Cánh Diều',category:'Bộ Cánh Diều' },
            { id: 4, image: 'https://ebdbook.vn/upload/sgk/lop11/tinhoc11cd4.jpg?v=1.0.1', title: 'Chuyên Đề Học Tập Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều', author: 'HỒ SĨ ĐÀM (Tổng Chủ biên) - ĐỖ ĐỨC ĐÔNG (Chủ biên) - NGUYỄN KHÁNH PHƯƠNG ĐỖ PHAN THUẬN.', price: '30.000', description: 'Chuyên Đề Học Tập Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều',category:'Bộ Cánh Diều' },
            { id: 5, image: 'https://ebdbook.vn/upload/sgk/lop11/tinhoc11cd2.jpg?v=1.0.1', title: 'Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều', author: 'HỒ SĨ ĐÀM (Tổng Chủ biên) - NGUYỄN ĐÌNH HÓA (Chủ biên) - HOÀNG VÂN ĐÔNG - HỒ CẨM HÀ - LÊ MINH HOÀNG - PHẠM THỊ ANH LÊ - NGUYỄN THANH TÙNG.', price: '70.000', description: 'Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều',category:'Bộ Cánh Diều' },
          ],
          '12': [],
          '13': [],
        },
        bookCategories: [
          { id: 1, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối', 'Bộ Bình Đẳng', 'Bộ Cùng Học'] },
          { id: 2, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối'] },
          { id: 3, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối'] },
          { id: 4, name: ['Bộ Cánh Diều', 'Bộ Kết Nối'] },
          { id: 5, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối'] },
          { id: 6, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối'] },
          { id: 7, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối'] },
          { id: 8, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối'] },
          { id: 9, name: ['Bộ Kết Nối'] },
          { id: 10, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối'] },
          { id: 11, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối'] },
          { id: 12, name: ['Bộ Cánh Diều', 'Bộ Chân Trời', 'Bộ Kết Nối'] },
        ],
        filteredBooks: {},
        featuredBooks: [], // Initialize featuredBooks and bestSellers
        bestSellers: [], // Khởi tạo filteredBooks là đối tượng rỗng
      };
    }

    return JSON.parse(serializedState) as BookState;
  } catch (e) {
    console.warn("Could not load from localStorage", e);
    return {
      booksByGrade: {},
      bookCategories: [],
      filteredBooks: {},
      featuredBooks: [], 
        bestSellers: [], 
    };
  }
};

// Hàm lưu dữ liệu vào localStorage
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
      if (state.booksByGrade[grade]) {
        state.booksByGrade[grade].push(book);
      } else {
        state.booksByGrade[grade] = [book];
      }
      saveToLocalStorage(state);
    },
    updateBook(state, action: PayloadAction<Book>) {
      const updatedBook = action.payload;
      for (const grade in state.booksByGrade) {
        const books = state.booksByGrade[grade];
        const index = books.findIndex(book => book.id === updatedBook.id);
        if (index !== -1) {
          books[index] = updatedBook;
        }
      }
      saveToLocalStorage(state);
    },
    removeBook(state, action: PayloadAction<number>) {
      const bookId = action.payload;
      for (const grade in state.booksByGrade) {
        state.booksByGrade[grade] = state.booksByGrade[grade].filter(book => book.id !== bookId);
      }
      saveToLocalStorage(state);
    },
    filterBooksByCategory(state, action: PayloadAction<{ grade: string; category: string }>) {
      const { grade, category } = action.payload;
      
      // Check if category exists in the bookCategories array
      const isCategoryValid = state.bookCategories.some(cat => cat.name.includes(category));
    
      if (state.booksByGrade[grade] && isCategoryValid) {
        // Filter books by category assuming each book object has a 'category' property.
        state.filteredBooks[`${grade}-${category}`] = state.booksByGrade[grade].filter(book => book.category === category);
      } else {
        state.filteredBooks[`${grade}-${category}`] = [];
      }
    },
    addFeaturedBook: (state, action: PayloadAction<Book>) => {
      state.featuredBooks.push(action.payload);
      saveToLocalStorage(state);
    },
    addBestSeller: (state, action: PayloadAction<Book>) => {
      state.bestSellers.push(action.payload);
      saveToLocalStorage(state);
    },
    
  },
});

export const { addBook, updateBook, removeBook, filterBooksByCategory } = bookSlice.actions;
export default bookSlice.reducer;
