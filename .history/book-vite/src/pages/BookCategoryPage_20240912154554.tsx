// components/FilteredBooksPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const FilteredBooksPage: React.FC = () => {
  const { grade, subject } = useParams<{ grade?: string; subject?: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  // Debugging: Console log params and state
  console.log('Grade:', grade);
  console.log('Subject:', subject);
  console.log('Books By Grade:', booksByGrade);

  // Lọc sách dựa trên grade và subject
  const filteredBooks = grade && subject
    ? booksByGrade[grade]?.filter(book => book.subject === subject) || []
    : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold uppercase mb-6">Sách lớp {grade} -  thể loại {subject}</h1>
      <div>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book: any) => (
            <div key={book.id} className="mb-4">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p>{book.author}</p>
              <p>Giá: {book.price}</p>
              <img src={book.image} alt={book.title} className="w-32 h-40 object-cover" />
            </div>
          ))
        ) : (
          <p>Không có sách nào cho thể loại và lớp học này.</p>
        )}
      </div>
    </div>
  );
};

export default FilteredBooksPage;
