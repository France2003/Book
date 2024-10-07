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
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Sản Phẩm Nổi Bật</h2>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
          }}
          dataSource={featuredBooks}
          renderItem={(book) => (
            <List.Item className="p-2">
              <Card
                hoverable
                cover={
                  <img
                    alt={book.title}
                    src={book.image}
                    className="h-64 object-cover rounded-t-lg"
                  />
                }
                className="shadow-lg rounded-lg"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <p className="font-semibold truncate">{book.title}</p>
                    <p className="text-lg font-semibold text-red-600 mt-2">{book.price} VND</p>
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
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Sản Phẩm Khuyến Mãi</h2>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
          }}
          dataSource={promotionalBooks}
          renderItem={(book) => (
            <List.Item className="p-2">
              <Card className="shadow-lg rounded-lg">
                <h3 className="font-semibold">{book.title}</h3>
                <p>Tác giả: {book.author}</p>
                <p className="text-lg font-semibold text-red-600">{book.price} VND</p>
              </Card>
            </List.Item>
          )}
        />
      </section>
    </div>
  );
};

export default FeaturedAndPromotionalBooks;
