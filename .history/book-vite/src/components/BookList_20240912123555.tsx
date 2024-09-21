// components/BookList.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';

const BookList: React.FC = () => {
  const { grade, category } = useParams<{ grade: string; category: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  
  // Lọc sách theo lớp học và thể loại
  const books: Book[] = booksByGrade[grade]?.[decodeURIComponent(category)] || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sách lớp {grade} - {decodeURIComponent(category)}</h1>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} className="mb-4">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <img src={book.image} alt={book.title} className="w-32 h-32 object-cover"/>
              <p>Author: {book.author}</p>
              <p>Price: {book.price}</p>
              <p>{book.description}</p>
            </li>
          ))
        ) : (
          <p>Không có sách nào cho thể loại này.</p>
        )}
      </ul>
    </div>
  );
};

export default BookList;
