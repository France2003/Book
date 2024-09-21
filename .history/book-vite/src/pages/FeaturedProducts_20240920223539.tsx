// BestSellers.tsx
import React from 'react';
import { Card } from 'antd';
import { Book } from '../types'; // Import dữ liệu mẫu

const BestSellers: React.FC = () => {
  // Lọc sản phẩm bán chạy dựa trên salesCount
  const bestSellers = Book.sort((a, b) => b.salesCount - a.salesCount).slice(0, 3);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {bestSellers.map((book) => (
        <Card
          key={book.id}
          title={book.title}
          style={{ width: 300 }}
          cover={
            <img
              alt={book.title}
              src={`https://via.placeholder.com/300x400?text=${book.title}`}
            />
          }
        >
          <p>Giá: {book.price.toLocaleString('vi-VN')}₫</p>
          <p>Đã bán: {book.salesCount}</p>
          <p>Lượt xem: {book.viewCount}</p>
          <p>Đánh giá: {book.rating}⭐</p>
        </Card>
      ))}
    </div>
  );
};

export default BestSellers;
