import React from 'react';
import BookList from '../components/BookList';
import { Book } from '../types';

const books: Book[] = [
  { id: 1, title: 'Sách 1', author: 'Tác giả 1', price: 10, description: 'Mô tả sách 1' },
  { id: 2, title: 'Sách 2', author: 'Tác giả 2', price: 15, description: 'Mô tả sách 2' },
  // Thêm sách khác
];

const Home: React.FC = () => {
  return (
    <div>
      <BookList books={books} />
    </div>
  );
};

export default Home;
