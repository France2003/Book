// src/components/FeaturedAndPromotionalBooks.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { List, Card } from 'antd';
import { RootState } from '../redux/store'; 
import { Link } from 'react-router-dom';

const FeaturedAndPromotionalBooks: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  const featuredBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isFeatured);

  const promotionalBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isBestSeller);

  return (
    <div className="px-4 py-8">
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
                  style={{ height: '250px', objectFit: 'cover', width: '100%', padding:'3px' }}  // Responsive image
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

      {/* Promotional Products Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Sản Phẩm Khuyến Mãi</h2>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 6,
        }}
        dataSource={promotionalBooks}
        renderItem={(book) => (
          <List.Item>
            <Card
              hoverable
              title={book.title}
              className="shadow-md rounded-md"
            >
              <p>Tác giả: {book.author}</p>
              <p className="text-red-600 font-semibold">{book.price} VND</p>
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

export default FeaturedAndPromotionalBooks;
