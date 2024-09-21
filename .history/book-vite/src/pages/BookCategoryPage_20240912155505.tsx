import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const FilteredBooksPage: React.FC = () => {
  const { grade, subject } = useParams<{ grade?: string; subject?: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Update filteredBooks when grade or booksByGrade changes
    if (grade) {
      const books = booksByGrade[grade] || [];
      setFilteredBooks(books);
    } else {
      const allBooks = Object.values(booksByGrade).flat();
      setFilteredBooks(allBooks);
    }
  }, [booksByGrade, grade]);

  // Function to filter books based on grade and term
  const filterBooks = (grade?: string, term: string = '') => {
    let updatedBooks: Book[] = [];

    if (grade) {
      updatedBooks = booksByGrade[grade] || [];
    } else {
      updatedBooks = Object.values(booksByGrade).flat();
    }

    if (term) {
      updatedBooks = updatedBooks.filter(book =>
        book.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredBooks(updatedBooks);
  };

  // Apply additional filtering based on subject
  const filteredBooksWithSubject = grade && subject
    ? filteredBooks.filter(book => book.subject === subject)
    : filteredBooks;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold uppercase mb-6">Sách lớp {grade} - thể loại {subject}</h1>
      <div>
        {filteredBooksWithSubject.length > 0 ? (
          filteredBooksWithSubject.map((book: any) => (
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
