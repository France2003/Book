// src/components/FeaturedAndPromotionalBooks.tsx
import React from 'react';
import { useSelector } from 'react-redux';
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
      <section className="mb-12">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Sản Phẩm Nổi Bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map(book => (
            <div key={book.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-[250px] h-[50px] object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 truncate">{book.title}</h3>
                <p className="text-red-600 font-semibold mt-2">{book.price} VND</p>
                <Link
                  to={`/Book/books/${book.id}`}
                  className="text-blue-500 hover:underline mt-4 inline-block"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Products Section */}
      <section>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Sản Phẩm Khuyến Mãi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotionalBooks.map(book => (
            <div key={book.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 truncate">{book.title}</h3>
                <p className="text-red-600 font-semibold mt-2">{book.price} VND</p>
                <p className="text-gray-600">Tác giả: {book.author}</p>
                <Link
                  to={`/Book/books/${book.id}`}
                  className="text-blue-500 hover:underline mt-4 inline-block"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedAndPromotionalBooks;
