// src/pages/BestSellers.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { List, Card } from 'antd';
import { RootState } from '../redux/store'; // Import RootState
import { Link } from 'react-router-dom';

const BestSellers: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  const bestSellerBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isBestSeller);

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Sản Phẩm Bán Chạy</h2>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 6,
        }}
        dataSource={bestSellerBooks}
        renderItem={(book) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img
                  alt={book.title}
                  src={book.image}
                  style={{ height: '250px', objectFit: 'cover', width: '100%' }}
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

export default BestSellers;
