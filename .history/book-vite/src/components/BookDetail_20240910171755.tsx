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
    <Card
      title={book.title}
      cover={<img src={book.image} alt={book.title} style={{ height: '300px', objectFit: 'cover' }} />}
      className="book-detail"
      style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
    >
      <p><strong>Tác giả:</strong> {book.author}</p>
      <p><strong>Giá:</strong> {book.price} VND</p>
      <p>{book.description}</p>
      <Button type="primary" onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </Button>
    </Card>
  );
};

export default BookDetail;
