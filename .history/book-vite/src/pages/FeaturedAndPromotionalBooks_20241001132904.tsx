// src/components/FeaturedAndPromotionalBooks.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { List, Card } from 'antd';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import BookCategory from '../components/BookCategory';

const FeaturedBooks: React.FC = () => {
    const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

    const featuredBooks = Object.values(booksByGrade)
        .flat()
        .filter(book => book.isFeatured);
    return (
        <div className="px-4 py-8">
            <div className="md:w-1/4 p-4 md:p-6 border-r border-gray-300">
                <BookCategory />
            </div>
            {/* Featured Products Section */}
            <h2 className="text-2xl font-bold mb-4">Sản Phẩm Nổi Bật</h2>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 6,
                }}
                dataSource={featuredBooks}
                renderItem={(book) => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt={book.title}
                                    src={book.image}
                                    style={{ height: '250px', objectFit: 'cover', width: '100%', paddingTop: '5px' }}  // Responsive image
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
        </div>
    );
};

export default FeaturedBooks;
