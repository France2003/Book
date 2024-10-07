// src/components/FeaturedAndPromotionalBooks.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { List, Card } from 'antd';
import { RootState } from '../redux/store'; // Đảm bảo import RootState của bạn

const FeaturedAndPromotionalBooks: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  const featuredBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isFeatured);

  const promotionalBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isBestSeller);

  return (
    <div>
      <h2>Sản Phẩm Nổi Bật</h2>
      <List
        dataSource={featuredBooks}
        renderItem={book => (
          <List.Item>
            <Card title={book.title}>
              <p>Author: {book.author}</p>
              <p>Price: {book.price}</p>
            </Card>
          </List.Item>
        )}
      />

      <h2>Sản Phẩm Khuyến Mãi</h2>
      <List
        dataSource={promotionalBooks}
        renderItem={book => (
          <List.Item>
            <Card title={book.title}>
              <p>Author: {book.author}</p>
              <p>Price: {book.price}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FeaturedAndPromotionalBooks;
