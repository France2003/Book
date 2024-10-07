import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; 
import { setBooks } from '../redux/bookSlice';
import { Card, List, Pagination } from 'antd';
import { Book } from '../types'; 
import BookCategory from '../components/BookCategory';

const SearchResults: React.FC = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search).get('query') || '';
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);
  const allBooks = useSelector((state: RootState) => state.books.allBooks);
  
  useEffect(() => {
    const allBooks = Object.values(booksByGrade).flat();
    dispatch(setBooks(allBooks));
    window.scroll(0,0);
  }, [booksByGrade, dispatch]);
  
  const filteredBooks = allBooks?.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pageSize = 12;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentBooks = filteredBooks?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 p-4 md:p-6 border-r border-gray-300">
        <BookCategory />
      </div>
      <div className="md:w-3/4 p-4 md:p-6">
        <h1 className="text-2xl text-center font-bold mb-4">Kết quả tìm kiếm: <b>{query}</b></h1>
        {filteredBooks?.length > 0 ? (
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
        ) : (
          <p>Không có kết quả nào.</p>
        )}
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredBooks?.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
