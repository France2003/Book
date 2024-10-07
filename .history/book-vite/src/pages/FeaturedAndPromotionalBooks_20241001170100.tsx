import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, Card, Pagination } from 'antd';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import BookCategory from '../components/BookCategory';
import SwiperGallery from '../components/SwiperGallery';
import { Helmet } from 'react-helmet';

const FeaturedBooks: React.FC = () => {
    const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

    const featuredBooks = Object.values(booksByGrade)
        .flat()
        .filter(book => book.isFeatured);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 12; // Number of books per page

    const currentBooks = featuredBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col md:flex-row mt-11">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sản phẩm nổi bật</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="md:w-1/4 p-4 md:p-6 border-r border-gray-300">
                <BookCategory />
            </div>
            <div className='md:w-3/4 p-4 md:p-6'>
                <SwiperGallery />
                <h2 className="text-3xl font-bold mb-4 text-center text-blue-600 hover:text-blue-800 transition duration-300 transform ">
                    Sản Phẩm Nổi Bật
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
                        total={featuredBooks.length}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeaturedBooks;
