// src/components/FeaturedAndPromotionalBooks.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { List, Card } from 'antd';
import { RootState } from '../redux/store'; // Đảm bảo import RootState của bạn
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
    <div>
      <section>
        <h2 className="text-lg font-semibold mb-4">Sản Phẩm Nổi Bật</h2>
        <List
          grid={{
            gutter: 8,
            xs: 2,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 6,
          }}
          dataSource={featuredBooks}
          renderItem={(book) => (
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Sản Phẩm Khuyến Mãi</h2>
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
          }}
          dataSource={promotionalBooks}
          renderItem={book => (
            <List.Item>
              <Card
                hoverable
                title={book.title}
                style={{ width: '100%' }}
                className="shadow-md"
              >
                <p className="font-medium">Tác giả: {book.author}</p>
                <p className="text-base font-semibold text-red-600">{book.price} VND</p>
              </Card>
            </List.Item>
          )}
        />
      </section>
    </div>
  );
};

export default FeaturedAndPromotionalBooks;
