import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [
    { id: 1, image:'https://ebdbook.vn/upload/sgk/lop11/tienganh11cd1.jpg?v=1.0.1', title: 'Tiếng Anh 11 - Explore New Worlds - Sách Học Sinh - Bộ Cánh Diều', author: 'NGUYỄN THANH BÌNH (Tổng Chủ biên) - ĐINH TRẦN HẠNH (Chủ biên) - PHẠM NGUYỄN HUY HOÀNG - LÊ NGUYỄN NHƯ ANH - ĐÀO XUÂN PHƯƠNG TRANG- NGUYỄN HỒ THANH TRÚC - HỒ THỊ XUÂN VƯƠNG', price: 10, description: ' Tiếng Anh 11 - Explore New Worlds - Sách Học Sinh - Bộ Cánh Diều' },
    { id: 2, image:'', title: 'Sách 2', author: 'Tác giả 2', price: 15, description: 'Mô tả sách 2' },
    { id: 3, image:'', title: 'Sách 3', author: 'Tác giả 3', price: 16, description: 'Mô tả sách 3' },
    { id: 4, image:'', title: 'Sách 4', author: 'Tác giả 4', price: 17, description: 'Mô tả sách 4' },
    { id: 5, image:'', title: 'Sách 5', author: 'Tác giả 5', price: 19, description: 'Mô tả sách 5' },
    { id: 6, image:'', title: 'Sách 6', author: 'Tác giả 6', price: 120, description: 'Mô tả sách 6' },
    // Thêm sách khác
  ]
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {}
});

export default bookSlice.reducer;
