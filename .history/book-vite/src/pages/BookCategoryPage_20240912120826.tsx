// pages/BookCategoryPage.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookCategory from '../components/BookCategory';
import BookList from '../components/BookList';
import { Book } from '../types'; // Giả sử bạn có loại Book định nghĩa ở đây

const BookCategoryPage: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(undefined);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(undefined);

  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      const books = booksByGrade[selectedGrade] || [];
      const filtered = books.filter(book =>
        book.subject.toLowerCase() === selectedSubject
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  }, [selectedGrade, selectedSubject, booksByGrade]);

  const handleSubjectSelect = (grade: string, subject: string) => {
    setSelectedGrade(grade);
    setSelectedSubject(subject.toLowerCase());
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-6 border-r">
        <BookCategory onSubjectSelect={handleSubjectSelect} />
      </div>
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-6">Danh sách sách</h1>
        <BookList books={filteredBooks} />
      </div>
    </div>
  );
};

export default BookCategoryPage;
