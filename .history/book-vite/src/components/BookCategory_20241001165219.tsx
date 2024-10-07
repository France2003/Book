// components/BookCategory.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Collapse, Card } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { textbookCategories } from '../data/categories';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const { Panel } = Collapse;

const BookCategory: React.FC = () => {
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade);

  // Get the first featured and best-selling book
  const featuredBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isFeatured);
  const bestSellersBooks = Object.values(booksByGrade)
    .flat()
    .filter(book => book.isBestSeller);

  return (
    <div className="p-6 max-w-xs border-r border-gray-200">
      <h1 className="text-2xl font-bold mb-6">Danh mục sách giáo khoa</h1>
      <Collapse accordion>
        {textbookCategories.map((category) => (
          <Panel
            header={`Lớp ${category.id}`}
            key={category.id}
            extra={<BookOutlined />}
          >
            <Menu
              mode="inline"
              className="space-y-2"
            >
              {category.name.map((subject) => (
                <Menu.Item
                  key={subject}
                  className="hover:bg-gray-100"
                >
                  <Link
                    to={`/Book/books/grade/${category.id}/subject/${encodeURIComponent(subject.toLowerCase())}`}
                    className="text-blue-600 hover:underline"
                  >
                    Sách {subject}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Panel>
        ))}
      </Collapse>

      {/* Demo Product for Featured Books */}
      <div>
        <h2 className="text-xl font-bold mt-6 mb-2">Sản Phẩm Nổi Bật</h2>
        {featuredBooks.length > 0 && (
          <Card
            hoverable

            cover={
              <img
                alt={featuredBooks[0].title}
                src={featuredBooks[0].image}
                // className="h-32 object-cover"
                style={{ height: '200px', objectFit: 'cover', paddingTop: 10, width: 150, margin: 'auto' }}
              />
            }
            className="mb-4 w-[200px]  shadow-md rounded-md"
          >
            <h3 className="font-semibold truncate">{featuredBooks[0].title}</h3>
            <p className="text-red-600 font-semibold mt-2">{featuredBooks[0].price} VND</p>
            <div className="mt-4">
              <Link to={`/Book/books/${featuredBooks[0].id}`} className="text-blue-500 hover:underline">
                Xem chi tiết
              </Link>
              <Link to="/Book/featured" className="text-blue-500 hover:underline  ">
                Xem thêm
              </Link>
            </div>
          </Card>

        )}
      </div>

      {/* Demo Product for Best Sellers */}
      <h2 className="text-xl font-bold mt-6 mb-2">Sản Phẩm Bán Chạy</h2>
      {bestSellersBooks.length > 0 && (
        <Card
          hoverable
          cover={
            <img
              alt={bestSellersBooks[0].title}
              src={bestSellersBooks[0].image}
              // className="h-32 object-cover"
              style={{ height: '200px', objectFit: 'cover', paddingTop: 10, width: 150, margin: 'auto' }}
            />
          }
          className="mb-4 w-[200px] shadow-md rounded-md"
        >
          <h3 className="font-semibold truncate">{bestSellersBooks[0].title}</h3>
          <p className="text-red-600 font-semibold mt-2">{bestSellersBooks[0].price} VND</p>
          <Link to="/Book/bestseller" className="text-blue-500 hover:underline">
            Xem thêm
          </Link>
        </Card>
      )}
    </div>
  );
};

export default BookCategory;
