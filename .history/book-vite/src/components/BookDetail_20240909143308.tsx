import React from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../types';

interface BookDetailProps {
  books: Book[];
}

const BookDetail: React.FC<BookDetailProps> = ({ books }) => {
  const { id } = useParams();
  const book = books.find((book) => book.id.toString() === id);

  if (!book) return <div>Book not found</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price}</p>
      <p>{book.description}</p>
    </div>
  );
};

export default BookDetail;
