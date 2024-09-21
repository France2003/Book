// components/BookDetail.tsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Button, Rate, Modal, notification } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { addToCart } from '../redux/cartSlice';
import BookCategory from './BookCategory'; // Import BookCategory

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const dispatch = useDispatch();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const allBooks = Object.values(booksByGrade).flat();
    const foundBook = allBooks.find(b => b.id.toString() === id);
    setBook(foundBook || null);
  }, [id, booksByGrade]);

  if (!book) return <p className="text-center text-lg font-medium">Không tìm thấy sách</p>;

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
    <div className="flex">
      <div className="w-1/4 p-6 border-r border-gray-200">
        <BookCategory />
      </div>
      <div className="flex-1 p-6">
        <div className="mb-4 text-lg flex items-center">
          <Link to="/" className="text-blue-600">Trang chủ</Link>
          <IoHome className="mx-2" />
          <span className="text-gray-400 mx-2">|</span>
          <p>Sách Giáo Khoa</p>
          <span className="text-gray-400 mx-2">|</span>
          <p>{book.category}</p>
          <span className="text-gray-400 mx-2">|</span>
          <p>{book.title}</p>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 mt-5 mb-6 md:mb-0 md:w-1/2">
            <img src={book.image} alt={book.title} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="md:ml-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p><strong>Mã sản phẩm:</strong> {book.productcode}</p>
            <Rate disabled defaultValue={4} className="mb-4 mt-3" />
            <p className="text-base mb-4"><strong>Tác giả:</strong> {book.author}</p>
            <p className="text-base mb-4">{book.description}</p>
            <p className="text-xl font-semibold text-red-600 mb-4">{book.price} VND</p>
            <div className="flex gap-4">
              <Button type="primary" icon={<ShoppingCartOutlined />} size="large" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </Button>
              <Button type="default" icon={<HeartOutlined />} size="large">
                Yêu thích
              </Button>
              <Button type="default" icon={<ShareAltOutlined />} size="large">
                Chia sẻ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
