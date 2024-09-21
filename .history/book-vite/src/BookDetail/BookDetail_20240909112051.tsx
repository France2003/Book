import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Rate } from 'antd';
import { RootState } from '../Redux/store'; // Import kiểu trạng thái gốc của Redux
import { addToCart } from '../Redux/artSlice';
import './BookDetail.css';

const { Meta } = Card;

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  rating: number;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  
  const book = books.find((book) => book.id === parseInt(id!)); // Tìm sách theo ID

  if (!book) {
    return <p>Book not found</p>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  return (
    <div className="book-detail">
      <Card
        style={{ width: 300 }}
        cover={<img alt={book.title} src={book.coverImage} />}
      >
        <Meta title={book.title} description={`by ${book.author}`} />
        <p>Price: ${book.price}</p>
        <Rate disabled value={book.rating} />
        <Button type="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card>
    </div>
  );
};

export default BookDetail;
