import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, Card, Pagination } from 'antd';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import BookCategory from '../components/BookCategory';
import SwiperGallery from '../components/SwiperGallery';

const BestSellersBooks: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  // Filter the best-selling books
  const promotionalBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isBestSeller);

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12; // Number of books per page

  // Calculate the books to display for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentBooks = promotionalBooks.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 p-4 md:p-6 border-r border-gray-300">
        <BookCategory />
      </div>
      <div className='md:w-3/4 md:p-6'>
        <SwiperGallery />
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
                style={{ width: '100%' }}
                cover={
                  <img
                    alt={book.title}
                    src={book.image}
                    style={{ height: '250px', objectFit: 'cover', paddingTop:10}}
                  />
                }
                className="shadow-md rounded-md"
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
