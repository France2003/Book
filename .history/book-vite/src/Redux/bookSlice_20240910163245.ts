import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface BookState {
  booksByGrade: Record<string, Book[]>;
}

// Hàm lấy dữ liệu từ localStorage (nếu có)
const loadFromLocalStorage = (): BookState => {
  try {
    const serializedState = localStorage.getItem('booksByGrade');
    if (serializedState === null) {
      // Dữ liệu mặc định nếu không có gì trong localStorage
      return {
        booksByGrade: {
          '1': [
            { id: 1, image: 'https://ebdbook.vn/upload/untitled-2.jpg?v=1.0.1', title: 'Bài học STEM - Lớp 1', author: 'Tưởng Duy Hải (Chủ biên) - Trần Ngọc Bích - Lê Thị Thu Huyền - Nguyễn Hà My - Trần Thúy Ngà - Đào Thị Sen - Phạm Văn Thuận - Nguyễn Huyền Trang', price: '30.000', description: 'Sách giáo khoa lớp 1' },
          ],
          '2': [
          ],
          '3': [
          ],
          '4': [],
          '5': [],
          '6': [],
          '7': [],
          '8': [],
          '9': [],
          '10': [],
          '11': [
            { id: 1, image: 'https://ebdbook.vn/upload/sgk/lop11/nguvan11cd3.jpg?v=1.0.1', title: 'Ngữ Văn 11 - Tập 2 - Bộ Cánh Diều', author: 'LÃ NHÂM THÌN - ĐỖ NGỌC THỐNG (đồng Tổng Chủ biên) - BÙI MINH ĐỨC (Chủ biên) - NGUYỄN THỊ TUYẾT MINH - TRẦN VĂN SÁNG - NGUYỄN VĂN THUẤN - TRẦN VĂN TOÀN.', price: '150.000', description: 'Bộ Cánh Diều' },
            { id: 2, image: 'https://ebdbook.vn/upload/sgk/lop11/lichsu11cd1.jpg?v=1.0.1', title: 'Lịch Sử 11 - Bộ Cánh Diều', author: 'ĐỖ THANH BÌNH (Tổng Chủ biên) - NGUYỄN VĂN NINH (Chủ biên) - LÊ HIẾN CHƯƠNG - TỐNG THỊ QUỲNH HƯƠNG - NGUYỄN MẠNH HƯỞNG - VŨ ĐỨC LIÊM.', price: '56.000', description: 'Lịch Sử 11 - Bộ Cánh Diều' },
            { id: 3, image: 'https://ebdbook.vn/upload/sgk/lop11/hdtn11cd1.jpg?v=1.0.1', title: 'Hoạt Động Trải Nghiệm, Hướng Nghiệp 11 - Bộ Cánh Diều', author: 'NGUYỄN DỤC QUANG (Tổng Chủ biên) - VŨ ĐÌNH BẢY (Chủ biên) - NGUYỄN NAM PHƯƠNG - TRẦN THỊ LỆ THU - BÙI THANH XUÂN.', price: '20.000', description: 'Hoạt Động Trải Nghiệm, Hướng Nghiệp 11 - Bộ Cánh Diều' },
            { id: 4, image: 'https://ebdbook.vn/upload/sgk/lop11/tinhoc11cd4.jpg?v=1.0.1', title: 'Chuyên Đề Học Tập Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều', author: 'HỒ SĨ ĐÀM (Tổng Chủ biên) - ĐỖ ĐỨC ĐÔNG (Chủ biên) - NGUYỄN KHÁNH PHƯƠNG ĐỖ PHAN THUẬN.', price: '30.000', description: 'Chuyên Đề Học Tập Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều' },
            { id: 5, image: 'https://ebdbook.vn/upload/sgk/lop11/tinhoc11cd2.jpg?v=1.0.1', title: 'Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều', author: 'HỒ SĨ ĐÀM (Tổng Chủ biên) - NGUYỄN ĐÌNH HÓA (Chủ biên) - HOÀNG VÂN ĐÔNG - HỒ CẨM HÀ - LÊ MINH HOÀNG - PHẠM THỊ ANH LÊ - NGUYỄN THANH TÙNG.', price: '70.000', description: 'Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều' },
          ],
          '12': [],
        }
      };
    }

    return JSON.parse(serializedState) as BookState;
  } catch (e) {
    console.warn("Could not load from localStorage", e);
    return { booksByGrade: {} }; // Trả về state mặc định nếu có lỗi
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
    addBook: (state, action: PayloadAction<{ grade: string; book: Book }>) => {
      const { grade, book } = action.payload;
      if (state.booksByGrade[grade]) {
        state.booksByGrade[grade].push(book);
      } else {
        state.booksByGrade[grade] = [book];
      }

      // Lưu dữ liệu vào localStorage sau khi thêm sách
      saveToLocalStorage(state);
    },
  },
});

// Xuất action để sử dụng trong các component
export const { addBook } = bookSlice.actions;
export default bookSlice.reducer;
