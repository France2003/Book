// components/BookList.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const BookList: React.FC = () => {
  const { grade, subject } = useParams<{ grade: string; subject: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const books = booksByGrade[grade]?.[subject] || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sách lớp {grade} - {subject}</h1>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id}>
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <img src={book.image} alt={book.title} className="w-32 h-32 object-cover"/>
              <p>Author: {book.author}</p>
              <p>Price: {book.price}</p>
              <p>{book.description}</p>
            </li>
          ))
        ) : (
          <p>Không có sách nào cho môn học này.</p>
        )}
      </ul>
    </div>
  );
};

export default BookList;
