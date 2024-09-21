import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookDetail from '../components/BookDetail';

const BookPage: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);

  return (
    <div className='mt-5'>
      <BookDetail books={books} />
    </div>
  );
};

export default BookPage;
