import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, List, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import BookCategory from '../components/BookCategory';
import SwiperGallery from '../components/SwiperGallery';
import { Helmet } from 'react-helmet';

const BestSellersBooks: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  // Lọc sách khuyến mãi
  const promotionalBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isBestSeller);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12; // Số sách trên mỗi trang

  const currentBooks = promotionalBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Hàm tính giá sau giảm
  const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
    return price - (price * discountPercentage) / 100;
  };
  console.log(calculateDiscountedPrice);
 
  

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
          renderItem={(book) => {
            console.log('Book data:', book); // Kiểm tra dữ liệu book
            return (
              <List.Item key={book.id}>
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
                  <p className="text-red-600 font-semibold mt-2">
                    Giá: {book.price} VND
                  </p>
                  {/* Kiểm tra và hiển thị giá đã giảm */}
                  {book.discountPercentage != null && book.discountPercentage > 0 ? (
                    <div>
                      <p className="text-green-600 font-semibold">
                        Giảm giá: {book.discountPercentage}% 
                      </p>
                      <p className="text-green-600 font-semibold">
                        Giá sau giảm: 
                        {calculateDiscountedPrice(
                          typeof book.price === 'string' ? parseFloat(book.price) : book.price, // Chuyển đổi nếu cần
                          typeof book.discountPercentage === 'string' ? parseFloat(book.discountPercentage) : book.discountPercentage // Chuyển đổi nếu cần
                        ).toFixed(2)} VND
                      </p>
                    </div>
                  ) : null}
                  <Link to={`/Book/books/${book.id}`} className="text-blue-500 hover:underline">
                    Xem chi tiết
                  </Link>
                </Card>
              </List.Item>
            );
          }}
        />
        {/* Thành phần phân trang */}
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
