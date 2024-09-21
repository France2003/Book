import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';

const FilteredBooksPage: React.FC = () => {
  const { grade, subject } = useParams<{ grade?: string; subject?: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    filterBooksByCategory(grade, subject);
  }, [grade, subject, booksByGrade]);

  const filterBooksByCategory = (grade?: string, category?: string) => {
    let updatedBooks: Book[] = [];

    if (grade) {
      updatedBooks = booksByGrade[grade] || [];
    } else {
      updatedBooks = Object.values(booksByGrade).flat();
    }

    if (category) {
      updatedBooks = updatedBooks.filter(book =>
        (book.category ?? '').toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredBooks(updatedBooks);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold uppercase mb-6">Sách lớp {grade} - thể loại {subject}</h1>
      <div>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
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
