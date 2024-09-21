import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';

const BookDetail: React.FC = () => {
  const { id } = useParams(); // Lấy id từ URL
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const allBooks = Object.values(booksByGrade).flat();
    const foundBook = allBooks.find(b => b.id.toString() === id);
    setBook(foundBook || null);
  }, [id, booksByGrade]);

  if (!book) return <p>Không tìm thấy sách</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <img src={book.image} alt={book.title} className="w-full h-auto" />
      <p className="text-lg font-semibold mt-4">{book.price} VND</p>
      <p className="mt-2">{book.description}</p>
      <p className="mt-2"><strong>Tác giả:</strong> {book.author}</p>
    </div>
  );
};

export default BookDetail;
