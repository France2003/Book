import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Card, List, Pagination, Select, Input } from 'antd';
import { Link } from 'react-router-dom';
import BookCategory from '../components/BookCategory';
import SwiperGallery from '../components/SwiperGallery';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const BestSellersBooks: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  // Filter the best-selling books
  const promotionalBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isBestSeller);

  const [filteredBooks, setFilteredBooks] = useState<Book[]>(promotionalBooks);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12; // Number of books per page

  // Update filtered books when search term or selected grade changes
  useEffect(() => {
    let updatedBooks = promotionalBooks;

    if (selectedGrade) {
      updatedBooks = updatedBooks.filter(book => book.grade === selectedGrade);
    }

    if (searchTerm) {
      updatedBooks = updatedBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(updatedBooks);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, selectedGrade]);

  const currentBooks = filteredBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGradeChange = (value: string | null) => {
    setSelectedGrade(value || undefined);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 p-4 border-r border-gray-300">
        <BookCategory />
      </div>
      <div className='md:w-3/4 p-4'>
        <SwiperGallery />
        
        {/* Filters for book category and search */}
        <div className="mb-6">
          <Select
            placeholder="Chọn thể loại sách"
            onChange={handleGradeChange}
            className="w-full mb-4"
            allowClear
            value={selectedGrade}
          >
            <Option value="">Tất cả thể loại</Option>
            {[...Array(12).keys()].map(num => (
              <Option key={num + 1} value={(num + 1).toString()}>
                Lớp {num + 1}
              </Option>
            ))}
          </Select>
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
            xs: 2,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
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

export default BestSellersBooks;
