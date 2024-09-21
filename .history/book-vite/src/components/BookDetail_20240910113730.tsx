import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Button, notification, Modal } from 'antd';
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

  const handleAddToCart = () => {
    Modal.confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn thêm sản phẩm "${book.title}" vào giỏ hàng không?`,
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        dispatch(addToCart(book));
        notification.success({
          message: 'Thêm vào giỏ hàng',
          description: `${book.title} đã được thêm vào giỏ hàng thành công!`,
          placement: 'bottomRight',
        });
      }
    });
  };

  return (
    <Card title={book.title} className="book-detail">
      <img src={book.image} alt="" />
      <p>Tác giả: {book.author}</p>
      <p>Giá: ${book.price}</p>
      <p>{book.description}</p>
      <Button type="primary" onClick={handleAddToCart} >
        Thêm vào giỏ hàng
      </Button>
    </Card>
  );
};

export default BookDetail;
