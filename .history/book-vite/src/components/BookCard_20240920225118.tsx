// components/BookCard.tsx
import React from 'react';
import { Card } from 'antd';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Card
      title={book.title}
      cover={<img alt={book.title} src={book.image} />}
      actions={[
        <span>Giá: {book.price}</span>,
        <span>{book.rating} ★</span>
      ]}
    >
      <p>{book.description}</p>
    </Card>
  );
};

export default BookCard;
