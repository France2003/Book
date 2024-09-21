import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';

const FeaturedProducts: React.FC = () => {
  const featuredBooks = useSelector((state: RootState) => state.books.featuredBooks);

  return (
    <div>
      <h2>Sản phẩm nổi bật</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={featuredBooks}
        renderItem={(book) => (
          <List.Item>
            <Card title={book.title}>
              <img src={book.image} alt={book.title} />
              <p>Giá: {book.price} VND</p>
              <Link to={`/books/${book.id}`}>Xem chi tiết</Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FeaturedProducts;
