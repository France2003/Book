import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'antd';
import { Book } from '../types';
import { addToCart } from '../redux/cartSlice';

interface BookDetailProps {
  books: Book[];
}

const BookDetail: React.FC<BookDetailProps> = ({ books }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book = books.find(book => book.id.toString() === id);

  if (!book) return <div>Không tìm thấy sách</div>;

  return (
    <Card title={book.title} className="book-detail">
      <p>Tác giả: {book.author}</p>
      <p>Giá: ${book.price}</p>
      <p>{book.description}</p>
      <Button type="primary" onClick={() => dispatch(addToCart(book))}>
        Thêm vào giỏ hàng
      </Button>
    </Card>
  );
};

export default BookDetail;
