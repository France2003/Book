import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, List, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import BookCategory from '../components/BookCategory';
import SwiperGallery from '../components/SwiperGallery';
import { Helmet } from 'react-helmet';

const BestSellersBooks: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  // Filter the best-selling books
  const promotionalBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isBestSeller);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12; // Number of books per page

  const currentBooks = promotionalBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 150);
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  return (
    <div className="flex flex-col md:flex-row mt-11">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sản phẩm khuyến mãi</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="md:w-1/4 p-4 md:p-6 border-r border-gray-300">
        <BookCategory />
      </div>
      <div className='md:w-3/4 p-4 md:p-6'>
        <SwiperGallery />
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600 hover:text-blue-800 transition duration-300 transform">
          Sản Phẩm Khuyến Mãi
        </h2>
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
            <List.Item key={book.id}>
              <Card
                hoverable
                className="shadow-md rounded-md w-full relative"
                cover={
                  <img
                    alt={book.title}
                    src={book.image}
                    className="h-64 object-cover pt-[10px]"
                  />
                }
              >
                <h3 className="font-semibold truncate">{book.title}</h3>
                <p className="text-red-600 font-semibold mt-2">{book.price} VND</p>

                {/* Hiển thị chữ "Đã giảm giá: 0.2%" ở góc trên bên phải */}
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-bl-md">
                  Đã giảm giá: 0.2%
                </div>

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
            total={promotionalBooks.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default BestSellersBooks;
