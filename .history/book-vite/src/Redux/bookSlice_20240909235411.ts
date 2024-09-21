import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [
    { id: 1, image:'https://ebdbook.vn/upload/sgk/lop11/tienganh11cd1.jpg?v=1.0.1', title: 'Tiếng Anh 11 - Explore New Worlds - Sách Học Sinh - Bộ Cánh Diều', author: 'NGUYỄN THANH BÌNH (Tổng Chủ biên) - ĐINH TRẦN HẠNH (Chủ biên) - PHẠM NGUYỄN HUY HOÀNG - LÊ NGUYỄN NHƯ ANH - ĐÀO XUÂN PHƯƠNG TRANG- NGUYỄN HỒ THANH TRÚC - HỒ THỊ XUÂN VƯƠNG', price: 10, description: ' Tiếng Anh 11 - Explore New Worlds - Sách Học Sinh - Bộ Cánh Diều' },
    { id: 2, image:'https://ebdbook.vn/upload/sgk/lop11/nguvan11cd3.jpg?v=1.0.1', title: 'Ngữ Văn 11 - Tập 2 - Bộ Cánh Diều', author: 'LÃ NHÂM THÌN - ĐỖ NGỌC THỐNG (đồng Tổng Chủ biên) - BÙI MINH ĐỨC (Chủ biên) - NGUYỄN THỊ TUYẾT MINH - TRẦN VĂN SÁNG - NGUYỄN VĂN THUẤN - TRẦN VĂN TOÀN.', price: 15, description: 'Bộ Cánh Diều' },
    { id: 3, image:'https://ebdbook.vn/upload/sgk/lop11/lichsu11cd1.jpg?v=1.0.1', title: 'Lịch Sử 11 - Bộ Cánh Diều', author: 'ĐỖ THANH BÌNH (Tổng Chủ biên) - NGUYỄN VĂN NINH (Chủ biên) - LÊ HIẾN CHƯƠNG - TỐNG THỊ QUỲNH HƯƠNG - NGUYỄN MẠNH HƯỞNG - VŨ ĐỨC LIÊM.', price: 16, description: 'Lịch Sử 11 - Bộ Cánh Diều' },
    { id: 4, image:'https://ebdbook.vn/upload/sgk/lop11/hdtn11cd1.jpg?v=1.0.1', title: 'Hoạt Động Trải Nghiệm, Hướng Nghiệp 11 - Bộ Cánh Diều', author: 'NGUYỄN DỤC QUANG (Tổng Chủ biên) - VŨ ĐÌNH BẢY (Chủ biên) - NGUYỄN NAM PHƯƠNG - TRẦN THỊ LỆ THU - BÙI THANH XUÂN.', price: 17, description: 'Hoạt Động Trải Nghiệm, Hướng Nghiệp 11 - Bộ Cánh Diều' },
    { id: 5, image:'https://ebdbook.vn/upload/sgk/lop11/tinhoc11cd4.jpg?v=1.0.1', title: 'Chuyên Đề Học Tập Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều', author: 'HỒ SĨ ĐÀM (Tổng Chủ biên) - ĐỖ ĐỨC ĐÔNG (Chủ biên) - NGUYỄN KHÁNH PHƯƠNG ĐỖ PHAN THUẬN.', price: 19, description: 'Chuyên Đề Học Tập Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều' },
    { id: 6, image:'', title: 'Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều', author: 'HỒ SĨ ĐÀM (Tổng Chủ biên) - NGUYỄN ĐÌNH HÓA (Chủ biên) - HOÀNG VÂN ĐÔNG - HỒ CẨM HÀ - LÊ MINH HOÀNG - PHẠM THỊ ANH LÊ - NGUYỄN THANH TÙNG.', price: 120, description: 'Tin Học 11 - Khoa Học Máy Tính - Bộ Cánh Diều' },
    // Thêm sách khác
  ]
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {}
});

export default bookSlice.reducer;
