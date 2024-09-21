import { createSlice} from '@reduxjs/toolkit';
import { Book } from '../types';

interface BookState {
  booksByGrade: Record<string, Book[]>;
}

const initialState: BookState = {
  booksByGrade: {
    '1': [
      // Danh sách sách cho lớp 1
      { id: 1, image: 'https://example.com/image1.jpg', title: 'Sách Lớp 1 - Tập 1', author: 'Tác giả A', price: '50.000', description: 'Sách giáo khoa lớp 1' },
      // Thêm sách khác cho lớp 1
    ],
    '2': [
      // Danh sách sách cho lớp 2
      { id: 2, image: 'https://example.com/image2.jpg', title: 'Sách Lớp 2 - Tập 2', author: 'Tác giả B', price: '55.000', description: 'Sách giáo khoa lớp 2' },
      // Thêm sách khác cho lớp 2
    ],
    '3': [
      // Danh sách sách cho lớp 3
      { id: 3, image: 'https://example.com/image3.jpg', title: 'Sách Lớp 3 - Tập 3', author: 'Tác giả C', price: '60.000', description: 'Sách giáo khoa lớp 3' },
      // Thêm sách khác cho lớp 3
    ],
    // Thêm sách cho các lớp khác từ 4 đến 12 theo cách tương tự
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

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {}
});

export default bookSlice.reducer;
