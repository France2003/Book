import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 10.99,
      coverImage: 'path_to_image',
      rating: 4
    },
    // Thêm dữ liệu sách khác
  ],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state:any, action:any) => {
      state.books = action.payload;
    },
  },
});

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;
