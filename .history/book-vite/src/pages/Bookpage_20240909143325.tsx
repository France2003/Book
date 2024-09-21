import React from 'react';
import BookDetail from '../components/BookDetail';
import { Book } from '../types';

const books: Book[] = [
  { id: 1, title: 'Sách 1', author: 'Tác giả 1', price: 10, description: 'Mô tả sách 1' },
  { id: 2, title: 'Sách 2', author: 'Tác giả 2', price: 15, description: 'Mô tả sách 2' },
  // Thêm sách khác
];

const BookPage: React.FC = () => {
  return (
    <div>
      <BookDetail books={books} />
    </div>
  );
};

export default BookPage;
