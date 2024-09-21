import React from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../types';
import { Card } from 'antd';

interface BookDetailProps {
  books: Book[];
}

const BookDetail: React.FC<BookDetailProps> = ({ books }) => {
  const { id } = useParams();
  const book = books.find(book => book.id.toString() === id);

  if (!book) return <div>Không tìm thấy sách</div>;

  return (
    <Card title={book.title}>
      <p>Tác giả: {book.author}</p>
      <p>Giá: ${book.price}</p>
      <p>{book.description}</p>
    </Card>
  );
};

export default BookDetail;
