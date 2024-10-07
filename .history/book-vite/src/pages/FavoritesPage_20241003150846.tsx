import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, List, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import BookCategory from '../components/BookCategory';
import { Helmet } from 'react-helmet';
import { Book } from '../types';

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.books);

  if (favorites.length === 0) {
    return (
      <div className="text-center text-lg font-medium">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Danh sách yêu thích</title>
        </Helmet>
        Chưa có sản phẩm nào trong danh sách yêu thích!
      </div>
    );
  }

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pageSize = 12;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentFavorites = favorites.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col md:flex-row">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Danh sách yêu thích</title>
      </Helmet>
      <div className="md:w-1/4 p-4 md:p-6 border-r border-gray-200">
        <BookCategory />
      </div>
      <div className="md:w-3/4 p-4 md:p-6">
        <h1 className="text-2xl text-center mb-4">Danh sách yêu thích</h1>
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
          }}
          dataSource={currentFavorites}
          renderItem={(book: Book) => (
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
            total={favorites.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
