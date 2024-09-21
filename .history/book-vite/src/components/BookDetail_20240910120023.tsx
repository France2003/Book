import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Button, notification, Modal } from 'antd';
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
    <div className="p-4 max-w-4xl mx-auto">
      <Card
        cover={<img alt={book.title} src={book.image} className="object-cover w-full h-96" />}
        bordered={false}
        className="shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg text-gray-700 mb-4">Tác giả: {book.author}</p>
            <p className="text-xl font-semibold mb-4">Giá: ${book.price}</p>
            <p className="text-gray-600 mb-4">{book.description}</p>
            <Button type="primary" onClick={handleAddToCart} className="w-full md:w-auto">
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookDetail;
