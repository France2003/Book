import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, List } from 'antd';
import { Link } from 'react-router-dom';

const FeaturedProducts: React.FC = () => {
  const featuredBooks = useSelector((state: RootState) => state.books.featuredBooks);

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-4">Sản phẩm nổi bật</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={featuredBooks}
        renderItem={book => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={book.title} src={book.image} style={{ height: '250px', objectFit: 'cover' }} />}
            >
              <p className="font-semibold truncate">{book.title}</p>
              <p className="text-red-600 mt-2">{book.price} VND</p>
              <Link to={`/books/${book.id}`}>Xem chi tiết</Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

const BestSellers: React.FC = () => {
  const bestSellers = useSelector((state: RootState) => state.books.bestSellers);

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-4">Sản phẩm bán chạy</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={bestSellers}
        renderItem={book => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={book.title} src={book.image} style={{ height: '250px', objectFit: 'cover' }} />}
            >
              <p className="font-semibold truncate">{book.title}</p>
              <p className="text-red-600 mt-2">{book.price} VND</p>
              <Link to={`/books/${book.id}`}>Xem chi tiết</Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export { FeaturedProducts, BestSellers };
