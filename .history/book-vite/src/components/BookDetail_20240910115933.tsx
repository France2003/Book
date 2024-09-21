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

  if (!book) return <div className="text-center mt-4">Không tìm thấy sách</div>;

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
      className="max-w-md mx-auto my-4 p-4 shadow-lg"
    >
      <div className="flex flex-col items-center">
        <img 
          src={book.image} 
          alt={book.title} 
          className="w-full h-auto mb-4"
        />
        <p className="text-lg font-semibold">Tác giả: {book.author}</p>
        <p className="text-lg font-semibold">Giá: ${book.price}</p>
        <p className="text-gray-700 mt-2">{book.description}</p>
        <Button 
          type="primary" 
          className="mt-4" 
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </Button>
      </div>
    </Card>
  );
};

export default BookDetail;
