import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { List, Card, Pagination, Select, Input } from 'antd';
import { RootState } from '../redux/store';
import { Link, useParams } from 'react-router-dom';
import BookCategory from '../components/BookCategory';
import SwiperGallery from '../components/SwiperGallery';
import { Option } from 'antd/es/mentions';
import { SearchOutlined } from '@ant-design/icons';
import { Book } from '../types';

const BestSellersBooks: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const { grade } = useParams<{ grade: string }>();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  // Filter the best-selling books
  const promotionalBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isBestSeller);
    useEffect(() => {
      if (grade) {
        const books = booksByGrade[grade] || [];
        setFilteredBooks(books);
      } else {
        const allBooks = Object.values(booksByGrade).flat();
        setFilteredBooks(allBooks);
      }
    }, [booksByGrade, grade]);
  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12; // Number of books per page
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(grade);

  // Calculate the books to display for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentBooks = promotionalBooks.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleGradeChange = (value: string | null) => {
    setSelectedGrade(value || undefined);
    filterBooks(value || undefined, searchTerm);
  };

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
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterBooks(selectedGrade, term);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 p-4 border-r border-gray-300">
        <BookCategory />
      </div>
      <div className='md:w-3/4 p-4'>
        <SwiperGallery />
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
        <h2 className="text-2xl font-bold mb-4">Sản Phẩm Bán Chạy</h2>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 6,
          }}
          dataSource={currentBooks}
          renderItem={(book) => (
            <List.Item>
              <Card
                hoverable
                className="shadow-md rounded-md w-full"
                cover={
                  <img
                    alt={book.title}
                    src={book.image}
                    className="h-64 object-cover"
                  />
                }
              >
                <h3 className="font-semibold truncate">{book.title}</h3>
                <p className="text-red-600 font-semibold mt-2">{book.price} VND</p>
                <Link to={`/Book/books/${book.id}`} className="text-blue-500 hover:underline">
                  Xem chi tiết
                </Link>
              </Card>
            </List.Item>
          )}
        />
        {/* Pagination component */}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={promotionalBooks.length}
          onChange={handlePageChange}
          className="mt-6 flex justify-center"
        />
      </div>
    </div>
  );
};

export default BestSellersBooks;
