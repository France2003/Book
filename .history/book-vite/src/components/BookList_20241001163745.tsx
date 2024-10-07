import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Card, List, Select, Input, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import BookCategory from './BookCategory'; // Import component BookCategory
import SwiperGallery from './SwiperGallery';

const { Option } = Select;

const BookList: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const featuredBooks = useSelector((state: RootState) => state.books.featuredBooks); // Get featured books from the store
  const { grade } = useParams<{ grade: string }>();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(grade);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentBooks = filteredBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 p-4 md:p-6 border-r border-gray-300">
        <BookCategory />
      </div>
      <div className="md:w-3/4 p-4 md:p-6">
        <SwiperGallery />
        {/* // */}
        <h2 className="text-xl font-bold mb-4">Sản Phẩm Nổi Bật</h2>
        {featuredBooks.length > 0 && (
          <Card
            hoverable
            cover={
              <img
                alt={featuredBooks[0].title}
                src={featuredBooks[0].image}
                className="h-64 object-cover"
              />
            }
            className="mb-4 shadow-md rounded-md"
          >
            <h3 className="font-semibold truncate">{featuredBooks[0].title}</h3>
            <p className="text-red-600 font-semibold mt-2">{featuredBooks[0].price} VND</p>
            <Link to="/featured" className="text-blue-500 hover:underline">
              Xem thêm
            </Link>
          </Card>
        )}
        {/* Filter and Search */}
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
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
          }}
          dataSource={currentBooks}
          renderItem={(book) => (
            <List.Item>
              <Card
                hoverable
                style={{ width: '100%' }}
                cover={
                  <img
                    alt={book.title}
                    src={book.image}
                    style={{ height: '250px', objectFit: 'cover', paddingTop: 10 }}
                  />
                }
                className="shadow-lg rounded-md"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <p className="font-semibold truncate max-w-200">{book.title}</p>
                    <p className="text-base font-semibold text-red-600 mt-2">{book.price} VND</p>
                  </div>
                  <div className="mt-4">
                    <Link to={`/Book/books/${book.id}`} className="text-blue-500 hover:underline">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredBooks.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default BookList;
