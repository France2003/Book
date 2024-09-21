import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Button, notification, Modal, Divider } from 'antd';
import { Book } from '../types';
import { addToCart } from '../redux/cartSlice';
import 'antd/dist/reset.css'; // Đảm bảo rằng bạn đã import CSS của Ant Design

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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Hình ảnh sản phẩm */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={book.image} alt={book.title} className="w-full max-w-md object-contain" />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-gray-700 mb-4">Tác giả: {book.author}</p>
          <p className="text-xl font-semibold text-red-600 mb-4">Giá: ${book.price}</p>
          <Divider />
          <p className="text-gray-800 mb-4">{book.description}</p>
          <Button type="primary" onClick={handleAddToCart} size="large" className="w-full">
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
