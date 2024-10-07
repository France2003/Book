import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// import { Book } from '../types';
import { Card, List, Pagination } from 'antd';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.books);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  if (favorites.length === 0) {
    return <p className="text-center text-lg font-medium">Chưa có sản phẩm nào trong danh sách yêu thích!</p>;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentFavorites = favorites.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4">Danh sách yêu thích</h2>
      <List
        grid={{
          gutter: 16,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
        }}
        dataSource={currentFavorites}
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
                  {/* Display discount information if applicable */}
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
          total={favorites.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default FavoritesPage;
