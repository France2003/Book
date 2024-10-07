import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { Card, List, Input, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const SearchResults: React.FC = () => {
  const searchedBooks = useSelector((state: RootState) => state.books.searchedBooks);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  useEffect(() => {
    window.scrollTo(0, 150);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Lọc sách dựa trên searchTerm
  const filteredBooks = searchedBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lấy sách hiện tại cho trang
  const currentBooks = filteredBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-4">
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
                  {/* Hiển thị thông tin giảm giá nếu có */}
                  {book.isBestSeller && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-md">
                      Đã giảm giá: 0.2%
                    </div>
                  )}
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
  );
};

export default SearchResults;
