import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [
    { id: 1, title: 'Sách 1', author: 'Tác giả 1', price: 10, description: 'Mô tả sách 1' },
    { id: 2, title: 'Sách 2', author: 'Tác giả 2', price: 15, description: 'Mô tả sách 2' },
    // Thêm sách khác
  ]
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {}
});

export default bookSlice.reducer;
