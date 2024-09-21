// components/BookDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Button, Card, Rate, Modal, notification, Select, Input, List } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, ShareAltOutlined, SearchOutlined } from '@ant-design/icons';
import { addToCart } from '../redux/cartSlice';
import BookCategory from './BookCategory'; // Import BookCategory
import { Option } from 'antd/es/mentions';

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

  const { grade } = useParams<{ grade: string }>(); // Lấy tham số grade từ URL
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(grade);

  useEffect(() => {
    if (grade) {
      const books = booksByGrade[grade] || [];
      setFilteredBooks(books);
    } else {
      const allBooks = Object.values(booksByGrade).flat();
      setFilteredBooks(allBooks);
    }
  }, [booksByGrade, grade]);

  const filterBooks = (grade?: string, term: string = '') => {
    let updatedBooks: Book[] = [];

    if (grade) {
      updatedBooks = booksByGrade[grade] || [];
    } else {
      updatedBooks = Object.values(booksByGrade).flat();
    }

    if (term) {
      updatedBooks = updatedBooks.filter(book =>
        book.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredBooks(updatedBooks);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterBooks(selectedGrade, term);
  };

  const handleGradeChange = (value: string | null) => {
    setSelectedGrade(value || undefined);
    filterBooks(value || undefined, searchTerm);
  };

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
      <div className="w-3/4 p-6">
        <div className="mb-6">
          <Select
            placeholder="Chọn thể loại sách"
            onChange={handleGradeChange}
            className="w-full"
            allowClear
            value={selectedGrade}
          >
            <Option value="">Tất cả lớp</Option>
            {[...Array(12).keys()].map(num => (
              <Option key={num + 1} value={(num + 1).toString()}>
                Lớp {num + 1}
              </Option>
            ))}
          </Select>
        </div>
        <div className="mb-6">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm sách..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
          />
        </div>
      </div>
      <div className='w-1/4 p-6 '>
        <BookCategory />
      </div>
      <div className="p-6 m-auto max-w-3xl flex-1">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/2">
            <img src={book.image} alt={book.title} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="md:ml-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p><b>Mã sản phẩm:</b> {book.productcode}</p>
            <Rate disabled defaultValue={4} className="mb-4 mt-3" />
            <p className="text-base mb-4"><strong>Tác giả:</strong> {book.author}</p>
            <p className="text-base w-[300px] mb-4">{book.description}</p>
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
